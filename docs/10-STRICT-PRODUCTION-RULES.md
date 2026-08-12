# 10 — Strict production rules

> **Status: NON-NEGOTIABLE.**
>
> This document overrides any earlier project note where the rules conflict. These constraints apply to every subsequent ACE concept, template and implementation unless the client explicitly changes them.

## 1. Content lock

The supplied prototype is the **only source of visible website copy** at the design-concept stage.

### Allowed

Visible text may be used only when it already exists in the supplied prototype, including:

- navigation labels;
- section headings;
- body copy;
- figures and captions;
- country names;
- `RU` / `EN`;
- `Trade Requests` and `Войти в Trade Requests`;
- `PDF`;
- `КТО МЫ`, `ЦИФРЫ`, `ДОКУМЕНТ`;
- `Читать полностью`;
- the supplied declaration title.

### Forbidden

Do not add or rewrite visible copy without explicit client approval.

This means **no**:

- invented headlines;
- invented subheadlines;
- invented explanations;
- invented statistics or market data;
- English microcopy that is not present in the prototype;
- interface labels such as `Network`, `Infrastructure`, `Framework`, `Connectivity`, `Price discovery`, `Execution`, etc.;
- marketing slogans;
- fabricated product UI labels;
- copy added only to make a composition easier to design.

The content may be **recomposed visually**, but its wording must remain unchanged.

## 2. Reference rule

Stripe is the primary visual benchmark for the current concept pass.

Use transferable design principles from the reference:

- large, confident typography;
- clean light surfaces;
- layered composition;
- strong spatial hierarchy;
- product-grade presentation;
- proof placed near the main claim;
- carefully designed modular surfaces;
- controlled gradients and depth;
- generous spacing;
- precise navigation and CTA treatment.

Do **not** copy Stripe's proprietary copy, brand assets, illustrations, data, case studies or product screenshots. The result must be an ACE design using ACE content and ACE brand constraints.

## 3. Brand integrity

- Use the official ACE logo without redrawing, recolouring, distorting or recomposing it.
- Preserve logo clear space.
- Corporate colours remain:
  - ACE Blue `#005EB8`;
  - ACE Red `#AF272F`;
  - ACE Green `#00B140`;
  - Cool Gray `#5B5B5B`.
- Colour may be used in lighter tints and transparent layers for web composition, but the base brand colours must remain recognisable.
- Until licensed corporate font files are supplied, use a neutral professional system sans-serif stack. Do not add remote font dependencies for the concept.

## 4. HTML and CSS

Every production-facing template must use:

- semantic HTML5;
- clean CSS;
- BEM or an equivalent explicit naming methodology;
- no framework dependency unless separately approved;
- no CMS-specific markup assumptions;
- no build step for the static design concept;
- no unnecessary JavaScript.

The markup must remain portable into the client's future CMS / backend implementation.

## 5. File structure

- Keep each page template in its own folder/file structure.
- Keep shared styles and assets in clearly named directories.
- Prefer SVG for vector graphics and WebP for raster imagery where suitable.
- Do not embed large raster images directly into HTML when a normal asset file is possible.
- Do not mix unrelated page-template code into one monolithic file in production structure.

## 6. Responsive behaviour

Templates must be designed and checked at three layout ranges:

1. desktop;
2. tablet;
3. mobile.

The implementation must display correctly in current versions of:

- Chrome;
- Firefox;
- Safari;
- Edge.

Responsive changes must be deliberate layout decisions, not simple proportional shrinking.

## 7. Integration comments

Add concise comments where they genuinely help the client's development team understand:

- template boundaries;
- non-obvious layout logic;
- reusable components;
- future CMS integration points;
- responsive behaviour where the implementation is not self-evident.

Do not litter obvious markup with redundant comments.

## 8. Trade Requests templates

The application form and the announcement table must be isolated as independent reusable template blocks.

Requirements:

- one structural implementation must work for both RU and EN;
- language differences must come from content, not duplicated markup;
- form and table markup must not be coupled to the homepage;
- field / column copy must **not** be invented before the client supplies it.

## 9. Code quality / human authorship standard

The code must read like work produced by an experienced frontend specialist.

Required qualities:

- predictable file structure;
- meaningful class names;
- consistent formatting;
- sensible component boundaries;
- restrained abstraction;
- no generated-looking class soup;
- no unexplained magic values repeated throughout the stylesheet;
- no unnecessary wrappers;
- no pseudo-technical comments;
- no decorative code complexity;
- variables/tokens used where they improve maintainability;
- straightforward CSS that another developer can safely continue.

The goal is not to imitate a person's mistakes. The goal is professional, maintainable frontend code with no obvious AI-generated patterns.

## 10. Current concept direction

For the next concept:

- make **one** primary direction rather than another set of five shallow variants;
- use Stripe as the dominant visual benchmark;
- retain ACE institutional seriousness;
- retain the prototype's content only;
- use the official ACE logo;
- do not reuse the visual design of the supplied gray wireframe;
- treat that wireframe only as information architecture and content source.

## 11. Design-system intelligence — mandatory reading

Before any new visual design or frontend redesign, read and follow:

1. `design-system/DESIGN-INTELLIGENCE.md`;
2. `design-system/decisions/ace-design-system-v1.md`;
3. the relevant file under `design-system/patterns/`;
4. donor notes under `design-system/donors/` only for the problem being solved.

The donor stack is intentionally layered:

- Stripe + Primer Brand — public composition;
- Reshaped + Coss — visual component discipline;
- Base UI — interaction/accessibility behaviour;
- ReUI — Trade Requests forms/tables;
- Figma SDS + SEED — design-system architecture.

Do not adopt any donor as a complete ACE skin. Do not pull a component into the design simply because it exists in a donor library.

`design-system/patterns/anti-patterns.md` is a hard visual blacklist for the current project. A future design must pass that audit before it is shown for review.