# Donor — SEED Design

Repository: `daangn/seed-design`

Role: **token / recipe / headless-vs-styled architecture donor**.

The repository currently separates concerns into packages including:

- `design-token/`;
- `css/`;
- `react-headless/`;
- `react/`;
- `figma/`;
- CLI and migration tooling;
- MCP/documentation tooling.

## Why it matters for ACE

The valuable idea is that a design system is not a folder of finished buttons. It is a pipeline from raw design decisions to semantic tokens, recipes and platform implementations.

ACE should adopt this logic at a smaller scale.

## ACE token layers

### Layer 1 — primitives

Raw facts:

- brand blue/red/green/gray;
- neutral scale;
- spacing values;
- radii;
- durations.

Primitive values should rarely be referenced directly by components.

### Layer 2 — semantic tokens

Meaning:

- text-primary / text-muted;
- surface-page / surface-raised;
- border-subtle / border-strong;
- action-primary;
- signal-critical / signal-positive.

### Layer 3 — recipes

Reusable visual rules:

- button sizes and states;
- field anatomy;
- document record;
- table row;
- nav action;
- proof metric.

### Layer 4 — compositions

Real content structures:

- header;
- hero;
- proof rail;
- Trade Requests filter bar;
- application form group;
- announcement table.

### Layer 5 — templates

Actual pages.

## Headless vs styled distinction

SEED's separation between headless React and styled React is a useful conceptual model even if ACE starts with pure HTML/CSS.

The same rule applies:

- behaviour/semantics should not be fused with decorative styling;
- visual changes should not require rebuilding accessibility logic;
- public-site compositions should remain portable to the client's future stack.

## What not to import

- donor tokens or brand values;
- package/runtime complexity not required by ACE;
- cross-platform tooling before the project needs it;
- component styling that conflicts with ACE's institutional/public direction.

## Licence note

Use SEED as an architectural reference until the licence of any specific package/file is verified before direct copying. The donor library does not currently vendor SEED implementation source.