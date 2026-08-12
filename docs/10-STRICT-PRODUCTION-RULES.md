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

Stripe is the primary quality/art-direction benchmark, not a kit to imitate mechanically.

Use transferable design principles from the reference:

- confident hierarchy;
- clean light surfaces;
- authored composition;
- strong spatial relationships;
- product-grade finish;
- proof placed with intent;
- carefully designed modular surfaces;
- disciplined use of colour/depth;
- generous but controlled spacing;
- precise navigation and CTA treatment.

Do **not** copy Stripe's proprietary copy, brand assets, illustrations, data, case studies or product screenshots. Do not reduce “Stripe-like” to gradients, floating UI, large numbers or fintech tropes.

## 3. Brand integrity

- Use the official ACE logo without redrawing, recolouring, distorting or recomposing it.
- Preserve logo clear space.
- Corporate colours remain:
  - ACE Blue `#005EB8`;
  - ACE Red `#AF272F`;
  - ACE Green `#00B140`;
  - Cool Gray `#5B5B5B`.
- Colour may be used in lighter tints and transparent layers for web composition, but the base brand colours must remain recognisable.
- Corporate colours are signals, not a requirement to show all three simultaneously.
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

Templates must be deliberately designed and visually checked at minimum at:

1. 1440px desktop;
2. 1024px tablet/desktop transition;
3. 390px mobile.

The implementation must display correctly in current versions of:

- Chrome;
- Firefox;
- Safari;
- Edge.

Responsive changes must be deliberate layout decisions, not simple proportional shrinking.

Automatic rejection conditions include:

- clipped/off-canvas content;
- accidental horizontal scroll;
- navigation wrapping that changes hierarchy;
- utility controls pushed outside the viewport;
- decorative elements obscuring content.

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

The goal is professional, maintainable frontend code with no obvious AI-generated patterns.

## 10. Mandatory design reading order

Before changing any public-site visual/frontend implementation, read and follow:

1. `design-system/skills/ACE-DESIGN-GATES.md`;
2. `design-system/skills/README.md`;
3. `docs/16-DESIGN-SKILLS-AND-TASTE-AUDIT.md`;
4. `design-system/DESIGN-INTELLIGENCE.md`;
5. `design-system/patterns/public-site.md`;
6. `design-system/patterns/components.md`;
7. `design-system/patterns/anti-patterns.md`;
8. relevant donor notes under `design-system/donors/`.

Trade Requests work additionally requires `design-system/patterns/trade-requests.md`.

## 11. Art-direction-first rule

The former “component-first” interpretation is explicitly superseded.

**Components do not determine the visual concept.**

Required order:

1. ground the direction in ACE's subject, audience and page job;
2. define palette roles, typography roles, grid, section rhythm and exactly one justified signature mechanism;
3. critique the written direction against generic AI/frontend defaults;
4. implement only the header + hero + immediate proof;
5. capture and review real screenshots at 1440 / 1024 / 390;
6. only after the first viewport passes, select existing primitives/components that support the approved direction;
7. extend the approved language to the rest of the page;
8. run independent visual and technical audits before publication.

A donor component name is never an art direction. `Primer Hero`, `Bento`, `River`, `Reshaped Button`, etc. are implementation options only.

## 12. Component-use rule

Once art direction is approved, prefer existing tested primitives where they fit the intended design and interaction.

However:

- never distort the composition to accommodate a donor component;
- never choose Bento/cards simply because a Bento/card component exists;
- never reuse a component's default skin if it conflicts with the approved ACE direction;
- never mix unrelated primitive systems inside one interaction surface;
- accessible behavior may be borrowed from Base UI/React Aria/Radix where relevant;
- ReUI remains reserved primarily for real Trade Requests form/table workflows.

Create a new ACE-native composition when the approved design cannot be represented cleanly by existing primitives.

## 13. Anti-template rules

Reject a direction before code if its identity is mainly any of these:

- diagonal/aurora/multicolour gradient;
- large KPI numbers over decorative colour;
- Bento as the core visual idea;
- generic feature cards with coloured rules/icons;
- fake product dashboard;
- random network topology;
- glow/beam/node theatre;
- dark fintech + one neon accent;
- editorial hairlines used without subject-specific meaning;
- oversized typography used as the entire concept.

All structural devices must encode real content or a justified ACE-specific concept.

## 14. Mandatory external skill gates

Apply the substance of these vetted sources during the workflow:

### Before code
- Anthropic `frontend-design`: subject grounding, hero thesis, typography, single signature, written plan and self-critique.
- Impeccable `shape` / `critique` principles.

### During visual correction
- Impeccable `layout`, `typeset`, `distill`, `bolder`/`quieter` as appropriate.
- ibelick `baseline-ui` rules adapted to the project's pure HTML/CSS requirements.

### Before publish
- Vercel Web Interface Guidelines.
- Impeccable `audit` / `polish` / `adapt` principles.
- project anti-pattern and browser/responsive rules.

## 15. Screenshot gate

A concept may not be presented as finished or published as the active direction unless screenshots have actually been reviewed.

Minimum evidence:

- hero/header at 1440px;
- hero/header at 1024px;
- hero/header at 390px;
- full page desktop;
- full page mobile.

Publishing is not a substitute for visual QA.

## 16. Current redesign direction

For the next redesign pass:

- do not inherit the visual layer of v3/v4/v5/v6;
- do not start with five coded concepts;
- first produce three written art directions and critique them;
- build one first-screen prototype only after selecting a direction;
- use only prototype content;
- use the official ACE logo;
- keep institutional seriousness without falling into generic corporate/banking templates;
- use Stripe and strong production products as a quality benchmark, not a bag of stylistic motifs;
- treat the supplied prototype only as information architecture and content source.