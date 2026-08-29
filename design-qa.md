# Design QA — final AXE preview

Date: 2026-08-27

## Visual source

- Current Figma file: `Ya1g999mQznIQYmhI3rU1l`.
- Main desktop frame: `1:2`, 1440 × 11 552 CSS px.
- World-map frame: `1:949`, 1880 × 972.
- Trade Requests source states: login `1:3509`, desktop dashboard `1:3623`, desktop new request `1:4199`, mobile dashboard `1:3836`, mobile new request `1:4040`.
- Explicit client override retained over the latest compact timeline mock: desktop timeline displays two large cards inside the slider viewport.

## Final implementation checks

- Header remains fixed and uses the 1390 px desktop rail; primary content uses the 1281 px rail.
- Hero keeps the existing working globe implementation: real land-point silhouette, automatic rotation, pointer drag, inertia and automatic resume.
- Metrics, goal/tasks gradient, directions grid, governance, contacts and footer recovery rules remain active.
- Timeline shows exactly two large desktop cards with no fade masks and no neighboring-card bleed after navigation.
- The country map no longer uses the raster map as its runtime base. It is assembled from the four original Figma SVG exports at their measured Figma bounds:
  - `neutral-land-silhouette.svg`
  - `digital-dot-field.svg`
  - `digital-network-lines.svg`
  - `digital-network-nodes.svg`
- Seven country markers are interactive and keyboard reachable: RUS, BLR, KAZ, UZB, CHN, IRN, EGY. Marker interaction is limited to flag locations; no political-border hit geometry was introduced.
- Duplicate native SVG title tooltips were removed; the custom tooltip remains available on hover/focus/click.
- Lower-page sections are forced visible so fast navigation, reloads and full-page captures cannot leave content hidden by an unreached reveal observer.
- Trade Requests remains a front-end prototype only. Login/register switching, mocked login transition, dashboard filtering, desktop/mobile dashboard and new-request form were exercised without adding a backend or authentication service.

## Automated QA

Passing workflow: `QA final AXE preview`, run `33041605105`.

Validated at 1440 px desktop and 390 px mobile:

- no horizontal document overflow;
- required fonts and fixed header;
- hero/globe geometry and globe drag interaction;
- two-card desktop timeline and next navigation;
- four SVG map layers, seven flag markers, no raster map inside the final interactive SVG, keyboard marker navigation and tooltip state;
- lower-section visibility and footer brand;
- mobile menu open/Escape behavior;
- Trade Requests register/login states, dashboard filters, app/new routes and mobile overflow.

Current evidence is stored in `qa/current/`:

- `main-1440.png`
- `main-390.png`
- `timeline-1440.png`
- `map-1440.png`
- `trade-dashboard-1440.png`
- `trade-dashboard-390.png`
- `trade-new-390.png`

The same evidence is attached to workflow run `33041605105` as artifact `axe-final-preview-qa`.

## Release state

- Working branch: `feat/structure-dark-map-v3`.
- PR #15 remains unmerged; publication of this preview does not modify `main`.
- Preview target: `https://imonsergey.github.io/client-AXE/structure-dark/`.
