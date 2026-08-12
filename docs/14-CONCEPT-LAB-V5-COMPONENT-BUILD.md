# 14 — Concept Lab v5: component-based rebuild

## Status

This iteration replaces the previous v4 visual layer. v4 must not be used as a visual baseline.

The key architectural change is that the five concepts are no longer collections of one-off page CSS. They are assembled from the native component layer in `design-system/runtime/`.

## Runtime component stack

### Foundations

- `design-system/foundation/ace.tokens.css`
- `design-system/runtime/core.css`
- `design-system/runtime/layout.css`

### Primitives

- `ace-logo`
- `ace-nav` / `ace-nav__link`
- `ace-language`
- `ace-button`
- `ace-section-label`
- `ace-metric`
- `ace-document`
- `ace-capability`
- `ace-register`
- `ace-signal-line`

### Compositions

- `ace-header`
- `ace-hero`
- `ace-proof`
- `ace-about`
- `ace-capabilities`
- `ace-country-section`

The concept-specific differences are component variants/modifiers rather than five unrelated implementations.

## Donor usage in code

### Primer Brand

Directly informs:

- 1280px contained layout;
- 12-column desktop grid;
- explicit hero composition variants;
- gridline hero treatment;
- content/media separation;
- structured river/row capability sections.

### Reshaped

Directly informs:

- 4px spacing rhythm;
- compact 4/6/10px radius model;
- semantic surface/text/border hierarchy;
- restrained elevation;
- 100–300ms transition scale.

### Coss

Only MIT-path design decisions are used:

- compact 40–44px controls;
- restrained borders;
- small radii;
- neutral hover/focus states;
- controls remain subordinate to page hierarchy.

### Base UI

Used for focus/accessibility/interaction reasoning. It is not imported because the public concept must remain native static HTML/CSS.

### ReUI

Not used decoratively on the homepage. It remains the primary donor for the real Trade Requests form/table implementation once actual field and column content is supplied.

## Five variants

### 01

Market-rails hero. One dominant visual idea: directional blue infrastructure rails. The proof layer is integrated into the visual field; capabilities use structured rows.

### 02

Institutional grid. Strong 12-column/gridline hero, bordered proof cells and ledger-like capability rows.

### 03

Product platform. Public copy and real metrics live inside a restrained product frame; the three capabilities become a single strong system surface rather than separate cards.

### 04

Editorial institution. No decorative hero object. Hierarchy is built from typography, rule structure, spacing and proof placement.

### 05

Strong exchange surface. Near-black institutional hero with white controls and a restrained ACE colour signal; capabilities and participant/document section continue the same high-density infrastructure language.

## Content lock

Visible website copy remains limited to content already present in the supplied prototype/current approved source. No new product labels, English microcopy, fake data, charts, dashboards or network nodes were introduced.

The `01–05` selector is preview tooling and not part of the client-facing site template.
