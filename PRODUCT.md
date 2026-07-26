# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three confirmed audiences, deliberately not ranked against each other yet:

- **Sponsors and brands** evaluating Alphonce Felix Simbu for endorsement or
  partnership. They come for the competitive record and proof of reach.
- **Press and media** needing verified facts, usable imagery, and a booking
  route quickly, usually against a deadline.
- **Donors and supporters** of the Kimbia na Simbu campaign and the Alphonce
  Simbu Foundation.

Fans and the general Tanzanian public were explicitly **not** selected as a
primary audience. The site may serve them, but their needs do not win
trade-offs.

**Open decision:** the relative priority of the three confirmed audiences.

## Product Purpose

A single public web presence for Alphonce Felix Simbu — 2025 World Marathon
Champion — covering his competitive record, the Foundation, and the Kimbia na
Simbu fundraising campaign.

**Status: this is a pitch/proposal build, not an authorized official site.** The
owner confirmed it exists to win or demonstrate the work, not as a commissioned
deliverable in production use.

Success for a pitch is that a sponsor, journalist, or donor finds it credible
and complete enough to act on. Success is *not* currently measured by
submissions, because no submission path is connected (see Capabilities).

## Positioning

One factual claim no neighboring athlete site can copy: the Tokyo 2025 world
title won by **0.03 seconds** — the closest finish in World Championship
marathon history — and **Tanzania's first-ever global athletics gold medal**.

That margin, and its national-first status, is the asset. Everything else on the
site is supporting evidence.

## Operating Context

- Static site: hand-written HTML/CSS/JS, no framework, no build step, no
  backend, no database.
- Published publicly via GitHub Pages at
  `https://k3lvngm.github.io/simbu-website/`, served from `main` at repo root.
- Rebuilt from a Base44 prototype (`alphonce-simbu-run.base44.app`); that
  prototype is the source of the current content and visual system.
- A meaningful share of the intended audience is on mobile devices and
  Tanzanian mobile connections, where payload size is a real cost.

## Capabilities and Constraints

Working today:

- Six pages: home, career, foundation, kimbia-na-simbu, gallery, contact.
- Gallery lightbox, mobile nav drawer, scroll reveals — all client-side.
- `npm test` drives headless Chromium over every page checking status, headings,
  console errors, image loads, internal links, and mobile-nav accessibility.

**Known gaps the owner has chosen to leave in place for now:**

- **The contact form and newsletter form discard every submission.** Both carry
  `data-local` and display a success message ("your message has been received",
  "you're on the list") without sending anything anywhere. The contact form
  offers Media, Sponsorship, and Appearance inquiry types, so this silently
  drops exactly the audiences named above. Owner decision: leave as-is for now.
- **The M-Pesa donation path is non-functional.** The QR block on
  `kimbia-na-simbu.html` is a labelled placeholder ("coming soon"). No donation
  can currently be completed.
- **The media kit PDF does not exist.** The career page's download control is a
  placeholder.
- **Three personal bests have unverified venues and dates** — half marathon,
  25km, and 10km all read `TBC`.

**Unresolved conflict:** every page's metadata describes the site as the
"Official website" of Alphonce Felix Simbu, and it is publicly indexable, while
the owner has confirmed it is a pitch rather than an authorized site. These two
facts cannot both stand. Not resolved here.

## Brand Commitments

- Name and mark: **Simbu** (wordmark), full name Alphonce Felix Simbu. Medal
  glyph as the logo mark.
- Campaign name **Kimbia na Simbu** — Swahili for "Run with Simbu" — is fixed,
  and the site presents its pronunciation.
- The Alphonce Simbu Foundation is a distinct entity with its own site at
  `alphoncesimbufoundation.org`; this site links out rather than absorbing it.
- Palette inherited from the source prototype: gold `#D4AF37`, deep green
  `#004731`, cream `#F8F6F1`, sage `#7C9F91`.
- Typefaces Fraunces (headings), Inter (body), JetBrains Mono. The owner
  confirmed these stay, overriding the detector's overused-font warning;
  recorded as exceptions in `.impeccable/config.json`.
- The footer credits management to **Ntua Communications**. Not independently
  verified.

## Evidence on Hand

Present in the repo:

- Career results and timeline (2017 World Championships bronze, 2021 Olympic
  7th, 2022 Commonwealth silver, 2025 Tokyo world title, 2025/2026 Boston
  runner-up, 2:02:47 PB), carried over from the source prototype.
- Nine images at `assets/img/`, ~1.9 MB total.
- An "As seen in" strip naming World Athletics, ESPN, BBC Sport, France24, The
  Athletic, Reuters, Associated Press, and NHK.

**Absences that future work must not paper over:**

- **There is no verified photography.** The images originate from the Base44
  prototype under `generated_*` filenames and appear to be AI-generated
  depictions of a real person. They must not be presented to press or sponsors
  as documentary photographs of Alphonce Simbu.
- The career results, the personal bests, and the press logos have **not been
  verified against any external source** in this project.
- No testimonials, sponsor relationships, audience figures, or licensing terms
  exist. None may be invented.

## Product Principles

1. **Never claim more than the evidence supports.** For a real athlete being
   shown to sponsors and press, a fabricated photo, statistic, or press mention
   is worse than a visible gap.
2. **A dead end is worse than an honest absence.** A form that swallows a
   sponsor's message, or a donate button that cannot take money, costs more
   trust than saying "coming soon".
3. **The 0.03 seconds is the story.** Lead with the margin and the
   national-first, not with generic athlete-site convention.
4. **Weight is a real cost.** The audience is substantially on Tanzanian mobile
   connections; payload is a user-facing quality, not an engineering detail.
5. **The Foundation is a partner, not a subsection.** It has its own identity
   and destination; link to it with respect for that boundary.

## Accessibility & Inclusion

- No formal standard has been mandated by the owner. The existing build already
  ships skip links, ARIA labelling, a keyboard-accessible nav drawer and
  lightbox, and single-`h1` structure per page; treat that as the floor.
- The site is English-only while its campaign name, primary market, and a core
  audience are Swahili-speaking. Localisation has **not** been decided.
- Performance is an inclusion issue here: ~1.9 MB of unoptimised PNGs is a
  material barrier on the connections much of this audience uses.
