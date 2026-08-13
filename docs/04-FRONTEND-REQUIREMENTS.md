# 04 — Frontend implementation requirements

> Status: mandatory. These requirements apply to the approved Figma layouts and future implementation unless the client explicitly changes them.

## 1. Source of truth

- The approved **Figma design** is the visual source of truth.
- `docs/02-CONTENT.md` is the source of approved visible copy until the client supplies an update.
- Do not redesign, restyle or add interface copy during frontend implementation without approval.

## 2. Markup and CSS

- Semantic HTML5 markup.
- Clean, maintainable CSS.
- BEM or an equivalent explicit naming methodology.
- No hard coupling to a specific CMS.
- Markup must remain portable for later integration by the client's development team.
- JavaScript should be added only where interaction actually requires it.

## 3. Project structure

- Separate files/folders for each page template.
- Shared assets and shared styles must live in clearly named directories.
- Prefer SVG for vector graphics and WebP for raster images where appropriate.
- Do not mix unrelated templates into one monolithic file.

## 4. Responsive implementation

The site must be deliberately designed and tested across three layout ranges:

1. desktop;
2. tablet;
3. mobile.

Responsive behavior must follow the approved Figma layouts. It must not be implemented as simple proportional shrinking of the desktop design.

## 5. Cross-browser support

Correct display and interaction are required in current versions of:

- Chrome;
- Firefox;
- Safari;
- Edge.

## 6. Integration comments

Add concise code comments where they materially help the client's developers understand:

- template boundaries;
- reusable blocks;
- non-obvious layout logic;
- future CMS integration points;
- responsive behavior that is not self-evident.

Do not add redundant comments that merely repeat obvious markup.

## 7. Trade Requests form and announcement table

The following must be isolated as independent reusable template blocks:

- application/submission form;
- announcement table.

Requirements:

- one structural implementation must support both RU and EN versions;
- language differences must come from content/data, not duplicated markup;
- the form and table must not be coupled to the homepage;
- fields, columns and labels must not be invented before they are supplied/approved.

## 8. Code-quality standard

The code must read like work produced by an experienced frontend specialist.

Required qualities:

- predictable file structure;
- meaningful class and variable names;
- consistent formatting;
- sensible component/block boundaries;
- restrained abstraction;
- no generated-looking class soup;
- no unexplained repeated magic values;
- no unnecessary wrappers;
- no pseudo-technical comments;
- no decorative code complexity;
- shared variables/tokens where they genuinely improve maintainability;
- straightforward code another developer can safely continue.

The goal is professional, human-readable production code, not code that merely renders the screenshot.

## 9. Assets and fidelity

- Preserve official ACE logo geometry and brand rules.
- Optimize exported assets without visibly degrading them.
- Use explicit image dimensions where appropriate to prevent layout shift.
- Implementation should reproduce the approved Figma layout accurately while remaining robust to real content and responsive widths.

## 10. Delivery QA

Before handover, verify:

- all three responsive ranges;
- current Chrome, Firefox, Safari and Edge;
- no accidental horizontal overflow;
- text does not clip or collide;
- controls remain usable by keyboard where applicable;
- image and SVG assets load correctly;
- RU/EN content does not break shared layout structures;
- the Trade Requests form and announcement table behave consistently in both languages.
