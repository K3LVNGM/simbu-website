# Alphonce Felix Simbu — Official Site

Static site for Alphonce Felix Simbu, 2025 World Marathon Champion. Rebuilt as
hand-written HTML/CSS/JS with no framework, no build step, and no runtime
dependencies — the pages you edit are the pages that ship.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, career stat strip, foundation and campaign teasers |
| `career.html` | Career timeline and personal bests |
| `foundation.html` | The Alphonce Simbu Foundation and its programs |
| `kimbia-na-simbu.html` | "Run with Simbu" campaign |
| `gallery.html` | Photo gallery with lightbox |
| `contact.html` | Contact and enquiries |

Shared assets live in `assets/`: `css/styles.css`, `js/main.js`, and `img/`.
Every page links the same stylesheet and script; there is no templating layer,
so changes to the header or footer must be applied to each page.

## Local development

No build step. Serve the directory over HTTP (opening the files directly with
`file://` breaks the relative asset paths):

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Verification

```sh
npm install   # first time only, pulls Playwright
npm test
```

`verify.mjs` serves the site on an ephemeral port and drives headless Chromium
over all six pages, asserting: HTTP 200, exactly one `<h1>`, no console or page
errors, no failed requests, no broken or empty-`src` images, and no internal
links that 404. It then checks at a 390px viewport that the mobile nav drawer is
genuinely hidden when closed — not merely pushed off-screen, which would leave
its links in the keyboard tab order — and that it opens and sets
`aria-expanded` correctly.

## Deployment

Served by GitHub Pages from the default branch root. `.nojekyll` is present so
Pages publishes the files as-is instead of running them through Jekyll.

## Known gaps

- `career.html` lists `TBC` for the venue and date of the half marathon, 25km,
  and 10km personal bests.
- The media kit download on `career.html` is a placeholder; no PDF is wired up.
