## Visual truth and implementation evidence

- Source visual truth: Figma `Ya1g999mQznIQYmhI3rU1l`, main frame `1:2`; local capture `qa/figma-v4/source-desktop.png`.
- Source desktop dimensions: 1440 × 11 552 CSS px; stored capture 499 × 4000 px, normalized proportionally for full-view comparison.
- Trade Requests source states: login `1:3509` (1440 × 870), desktop dashboard `1:3623`, desktop new request `1:4199`, mobile dashboard `1:3836` (390 × 2054), mobile new request `1:4040` (390 × 1246).
- Browser-rendered implementation screenshot: `qa/figma-v4/implementation-browser-final.jpg` (1348 × 926 px, device density 1).
- Earlier full-page implementation capture: `qa/figma-v4/implementation-desktop.jpg`; normalized comparison artifact: `qa/figma-v4/comparison-desktop.jpg`.
- Final implementation: cloud-browser local preview, 1363 × 936 CSS viewport; main document measured 11 551 px high (1 px below the 11 552 px Figma frame).
- Responsive evidence: real 390 × 844 iframe viewport in `qa/mobile-main.html`, `qa/mobile-trade.html`, and `qa/mobile-trade-new.html`; device density 1.

## State

- Main page at initial state with interactive globe initialized.
- Timeline and quote sliders tested after one forward transition.
- Fixed header tested after scrolling to a slider and returning to `#top` through the logo link.
- Trade Requests login, registration tab, successful login, dashboard, product filtering, new-request form, and successful form submit tested.
- Desktop and 390 px mobile Trade Requests dashboard and new-request form compared against their corresponding Figma frames.

## Full-view comparison evidence

- The main Figma capture and the browser-rendered full page were compared in the same visual pass.
- Final desktop section anchors match the Figma metadata: countries title 4637 px, event title 5532/5533 px, quote track 6450/6451 px, governance 7008/7009 px, members title 7577/7578 px, documents grid 8688 px, news grid 9201/9202 px, join placeholder 10 002 px, contact grid 10 664/10 665 px, footer 11 467/11 468 px.
- The source frame height is 11 552 px and the final browser document height is 11 551 px.

## Focused region comparison evidence

- Hero/globe: real geodesic point mesh, smaller globe, stable real-continent distribution, lower placement, and orbit split into rear/front arcs.
- Association/task/directions/timeline: exact 5-column metrics grid, two-row task grid, three-column directions grid, and four visible compact timeline cards.
- Dark lower half: map, event, quotes, governance, members, documents, news, join, contacts, and footer use the continuous dark/teal treatment from the source.
- Trade Requests login: 540 px rounded card, filled segmented tabs, source field treatment, teal CTA, and filled Back button.
- Trade Requests dashboard: source title density, 106 px filter panel, dark 48 px table header, compact 71 px rows, colored request types/statuses, and source search icons.
- Mobile dashboard: exact primary anchors from Figma metadata—title 94 px, CTA 143 px, filter panel 228–623 px, first card 643 px; cards use 322/342 px source heights.
- Mobile new request: title 94 px, card 151 px, 20 px card padding, compact 48/96 px controls, real calendar icon, and stacked actions.

## Findings

- No actionable P0, P1, or P2 findings remain.
- Fonts and typography: Oswald/Inter hierarchy, condensed display titles, compact UI copy, wrapping, and optical weights match the source at the tested widths.
- Spacing and layout rhythm: desktop section anchors and mobile Trade Requests anchors are within 0–1 px of the Figma metadata at the primary comparison points.
- Colors and tokens: dark navy, teal, cyan gradient, light paper, and semantic request statuses match the source intent and remain legible.
- Image quality and asset fidelity: all visible photos, map, portraits, member logos, and non-standard search/calendar icons are source assets from Figma; no section is rasterized into a screenshot.
- Copy and content: all main-page and Trade Requests copy shown in the current Figma is present; member cards include country, city, founding year, specialization, and source URL.
- Accessibility: semantic forms and labels, alt text, keyboard-reachable controls, focus borders, reduced-motion handling, practical mobile tap targets, and no horizontal overflow at tested desktop/mobile states.

## Comparison history

1. Round 1 — blocked.
   - Findings: main document was 13 293 px high; lower sections incorrectly returned to a light background; directions used four columns; timeline used two oversized split cards; members lacked detailed content.
   - Fixes: rebuilt desktop grid proportions from Figma metadata, restored the continuous dark lower half, changed directions to three columns, changed timeline to four compact cards, and added the complete member details.
   - Post-fix evidence: main document became 11 551 px high and all recorded section anchors aligned within 0–1 px.
2. Round 2 — blocked.
   - Findings: Trade Requests auth card used underline tabs and wrong density; dashboard used a light table header, tall rows, missing state styling, and weak gradient.
   - Fixes: rebuilt auth card proportions and segmented tabs; matched dashboard filter/table dimensions, colors, type/status styles, source icons, and header actions.
   - Post-fix evidence: paired Figma/implementation comparisons show matching desktop login and dashboard composition.
3. Round 3 — blocked.
   - Findings: mobile dashboard filters and cards were too tall and structurally different; mobile new-request form controls and headings were oversized.
   - Fixes: matched the 390 px Figma anchors and exact panel/card heights, rebuilt the mobile request-card information hierarchy, and compacted the mobile form to the Figma section/control sizes.
   - Post-fix evidence: paired Figma/implementation comparisons at 390 px show the same hierarchy, order, and primary y-coordinates.
4. Round 4 — passed.
   - No actionable P0/P1/P2 differences remained after the final desktop, mobile, interaction, and console passes.

## Primary interactions tested

- Main navigation anchor return and fixed-header state.
- Timeline next and quote next controls.
- Interactive globe initialization.
- Login/register switching and valid login navigation.
- Dashboard product filter (4 rows → 1 row → reset).
- New-request valid submission and return to dashboard.

## Console errors checked

- No application-origin console errors were found.
- The cloud browser reported only its own `chrome-extension://.../content-script.bundle.js` metadata error; it is unrelated to the project.

## Implementation checklist

- [x] Main desktop composition and exact vertical anchors.
- [x] Source media and icons.
- [x] Stable interactive globe and split orbit.
- [x] Fixed header and sliders.
- [x] Trade Requests auth/dashboard/new request flows.
- [x] Desktop and 390 px responsive comparisons.
- [x] JavaScript syntax and `git diff --check`.
- [x] Browser interaction and console verification.

final result: passed
