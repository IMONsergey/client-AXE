# ACE Design Intelligence

> Read this before changing visual design. This document defines how donor systems are interpreted for ACE.

## 1. The objective

ACE must look like a serious international market-infrastructure institution presented with the precision and finish of a modern technology platform.

The target is **not** “a fintech template”. It is also not “an association site made more modern”.

The design should feel authored: intentional grid, decisive typography, strong negative space, controlled density, few but meaningful surfaces, and visual objects whose form is tied to the content.

## 2. Order of decisions

Every design decision must follow this order:

1. **Content** — what exact prototype content must be shown?
2. **Hierarchy** — what is primary, proof, secondary, or utility?
3. **Composition** — what spatial relationship best expresses that hierarchy?
4. **Grid** — how does the composition sit on the page system?
5. **Typography** — what scale and line length make the hierarchy obvious?
6. **Surface** — only now decide border, background, radius and elevation.
7. **Interaction** — only if the element actually has interactive behaviour.
8. **Motion** — only after the static composition already works.

Starting from “which card component should I use?” is a design failure.

## 3. Donor priority

### Page-level decisions

1. Stripe reference
2. Primer Brand
3. WFE / CME institutional references

### Component-level decisions

1. Reshaped
2. Coss MIT surfaces
3. Base UI behaviour

### Trade Requests

1. ReUI
2. Base UI behaviour
3. selected Cloudscape / EUI patterns if required

### System architecture

1. Figma SDS
2. SEED Design

## 4. Visual laws

### 4.1 Grid before cards

Use a 12-column page grid and visible alignment relationships. Elements should feel connected by shared edges and baselines.

A card is allowed only when the content is genuinely an object: document, interactive module, form, record, data surface. A card is not a default section wrapper.

### 4.2 Small radii by default

The donor review strongly supports compact radii. Baseline ACE radii are 4 / 6 / 10px. Larger radii require a reason such as large media framing. Do not use 24–32px radii as a generic “premium” effect.

### 4.3 Borders before shadows

Use subtle structural rules to create hierarchy. Shadows are reserved for real elevation: popover, overlay, floating action or a deliberate product object. Page sections and normal content blocks should not float.

### 4.4 One dominant visual idea per section

Do not combine gradient, glass, grid, glow, floating cards and animated nodes in one scene. Pick the single visual mechanism that explains the content.

### 4.5 Brand colours are signals

ACE blue is the primary action and identity signal. Red and green are secondary semantic signals. Showing all three colours in every section cheapens the brand.

Large colour fields may use one dominant ACE colour or a controlled tint. Do not make a three-colour gradient simply because the logo contains three colours.

### 4.6 Typography is structural

Large type is not automatically premium. Scale depends on Russian line length, viewport and composition. Headings must retain readable rhythm and not become an oversized wall of text.

Until Echoes Sans / Pragmatica files arrive, use the system stack only as a layout proxy. Re-check all typography after the real fonts are supplied.

### 4.7 Product feeling comes from behaviour and detail

Do not fake a dashboard to make the site feel technological. Product quality comes from exact controls, coherent states, precise spacing, reliable responsive behaviour and meaningful system visuals.

## 5. Density model

ACE has two density modes.

### Public / institutional

- generous section spacing;
- large editorial hierarchy;
- visible grid/rules;
- limited controls;
- strong proof metrics;
- quiet surfaces.

### Trade Requests / application UI

- compact control rhythm;
- stronger information density;
- tables, filters, pagination, states;
- less decorative whitespace;
- accessibility and task completion take priority over brand spectacle.

Do not mix these two density modes indiscriminately on the homepage.

## 6. Responsive logic

The three required ranges are treated as composition modes, not scaled copies:

- **mobile `< 660px`** — single-column reading order, compact navigation, no side-by-side dependency;
- **tablet `660–899px`** — selective two-column composition, reduced gutters, preserved hierarchy;
- **desktop `>= 900px`** — full composition;
- **wide `>= 1280px`** — enhancement only, not a separate required breakpoint.

If an art-directed desktop element cannot collapse naturally, redesign it rather than hiding most of it on mobile.

## 7. Component selection rule

Before introducing a component, answer:

- Is this an actual reusable interaction or just visual grouping?
- Does it need a boundary?
- Is the radius semantically useful?
- Is elevation real or decorative?
- Could a rule, whitespace, or grid alignment communicate the same thing more cleanly?

If whitespace can solve it, use whitespace.

## 8. Motion rule

Allowed motion:

- state transitions;
- menu/dialog/popover entry and exit;
- subtle content reveal where it improves orientation;
- data change transitions later in Trade Requests.

Not allowed:

- animated beams between random points;
- shimmer text;
- floating glass cards;
- continuous decorative orbit/pulse loops;
- scroll effects added to compensate for weak composition.

## 9. Pre-review checklist

Reject a design before showing it if any answer below is “yes”:

- Does it resemble a default shadcn/Framer template?
- Are there more rounded cards than the information requires?
- Is there glassmorphism without functional meaning?
- Are there gradients or glowing blobs whose only purpose is “tech feeling”?
- Is there fake product data or fake dashboard UI?
- Was any visible copy invented?
- Could three different client logos be swapped in without changing the page character?
- Does the design depend on English micro-labels to look sophisticated?
- Are brand blue/red/green all displayed simultaneously without semantic reason?
- Does the mobile layout merely shrink the desktop composition?

If so, redesign before review.

## 10. Quality bar

The final test is not “does this look modern?”.

The final test is:

> Could this plausibly be the public digital surface of a new international market-infrastructure institution, while still feeling as polished and deliberate as a leading technology company?

If the answer is not clearly yes, the work is not ready.