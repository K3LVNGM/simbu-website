import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { extname, join, normalize } from 'path';

const ROOT = process.cwd();
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml' };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = join(ROOT, normalize(p));
  try {
    await stat(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise(r => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const PAGES = ['index.html', 'career.html', 'foundation.html', 'kimbia-na-simbu.html', 'gallery.html', 'contact.html'];
const browser = await chromium.launch();
let failures = 0;

for (const page of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const tab = await ctx.newPage();
  const errors = [];
  tab.on('console', m => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  tab.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  tab.on('requestfailed', r => errors.push(`requestfailed: ${r.url()}`));
  const resp = await tab.goto(`${base}/${page}`, { waitUntil: 'networkidle' });

  // Three distinct image defects. An <img> with no src at all is a
  // JS-populated template (e.g. the lightbox figure) and is only legitimate
  // inside a hidden container, so it is judged by that rather than by load state.
  const brokenImgs = await tab.$$eval('img', els => els.flatMap(i => {
    const src = i.getAttribute('src');
    if (src === null) {
      return i.closest('[aria-hidden="true"]') ? [] : ['<img> with no src outside a hidden container'];
    }
    if (src.trim() === '') return ['<img src=""> (re-requests the page URL)'];
    if (!i.complete || i.naturalWidth === 0) return [`failed to load: ${src}`];
    return [];
  }));
  // internal links that 404
  const links = await tab.$$eval('a[href]', els =>
    els.map(a => a.getAttribute('href')).filter(h => h && !/^(https?:|mailto:|#)/.test(h)));
  const dead = [];
  for (const href of [...new Set(links)]) {
    const r = await fetch(`${base}/${href.replace(/^\//, '')}`);
    if (!r.ok) dead.push(href);
  }
  const h1 = await tab.$$eval('h1', e => e.length);
  const title = await tab.title();

  const bad = resp.status() !== 200 || errors.length || brokenImgs.length || dead.length || h1 !== 1;
  if (bad) failures++;
  console.log(`${bad ? 'FAIL' : 'ok  '}  ${page}  [${resp.status()}] h1=${h1} title="${title.trim().slice(0, 40)}"`);
  if (errors.length) console.log('        errors:', errors.slice(0, 5));
  if (brokenImgs.length) console.log('        broken images:', brokenImgs);
  if (dead.length) console.log('        dead links:', dead);
  await ctx.close();
}

// mobile nav toggle smoke test
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const tab = await ctx.newPage();
await tab.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
const before = await tab.locator('#site-nav').isVisible();
// a closed drawer must also be out of the tab order, not merely off-screen
// definitive test: visibility:hidden / display:none elements refuse focus,
// whereas merely transform-offscreen ones accept it and become a keyboard trap
const focusableWhenClosed = await tab.$$eval('#site-nav a', els =>
  els.filter(a => { a.focus(); return document.activeElement === a; }).length);
await tab.locator('.nav-toggle').tap();
await tab.waitForTimeout(400);
const after = await tab.locator('#site-nav').isVisible();
const expanded = await tab.locator('.nav-toggle').getAttribute('aria-expanded');
const navOk = before === false && after === true && focusableWhenClosed === 0 && expanded === 'true';
if (!navOk) failures++;
console.log(`${navOk ? 'ok  ' : 'FAIL'}  mobile nav (closed-hidden=${!before} focusable-when-closed=${focusableWhenClosed} opens=${after} aria-expanded=${expanded})`);
await ctx.close();

await browser.close();
server.close();
console.log(failures ? `\n${failures} FAILURE(S)` : '\nALL CHECKS PASSED');
process.exit(failures ? 1 : 0);
