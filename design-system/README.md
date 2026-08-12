# ACE Design System — donor library

> Internal design intelligence. This directory is not a ready-made UI kit and is not imported into production by default.

## Purpose

This library exists to stop ACE design work from falling back to generic AI / template aesthetics. It captures the useful parts of mature open design systems and converts them into explicit ACE rules.

The public site still follows `docs/10-STRICT-PRODUCTION-RULES.md`:

- the prototype remains the only source of visible website copy;
- the official ACE logo and brand colours remain authoritative;
- the public implementation remains semantic HTML5 + clean CSS;
- no donor library is allowed to replace ACE with its own visual identity.

## Design stack

The system is intentionally layered. Different donors solve different problems.

### Public website composition

**Stripe reference + Primer Brand**

Use for grid, hero structure, page rhythm, section anatomy, typography hierarchy, editorial whitespace and responsive composition.

### Visual component quality

**Reshaped + Coss**

Use for compact radii, spacing, neutral surfaces, borders, restrained elevations, control proportions and state hierarchy.

### Interaction behaviour

**Base UI**

Use as the reference for accessible behaviour of menus, dialogs, popovers, selects and other interactive primitives. ACE visual styling remains custom.

### Trade Requests

**ReUI**

Use for data-table, filtering, sorting, pagination, empty/loading states, form anatomy and RU/EN application UI behaviour.

### Design ↔ code architecture

**Figma SDS + SEED Design**

Use for token architecture, primitives/compositions separation, Figma Variables, Code Connect, recipes and the distinction between headless behaviour and styled UI.

## Directory map

```text
design-system/
├── README.md
├── SOURCES.md
├── DESIGN-INTELLIGENCE.md
├── foundation/
│   ├── ace.tokens.css
│   └── foundation.md
├── donors/
│   ├── primer-brand.md
│   ├── reshaped.md
│   ├── coss.md
│   ├── base-ui.md
│   ├── reui.md
│   ├── figma-sds.md
│   └── seed-design.md
├── patterns/
│   ├── public-site.md
│   ├── components.md
│   ├── trade-requests.md
│   └── anti-patterns.md
└── decisions/
    └── ace-design-system-v1.md
```

## How to use this library

Before designing a page:

1. Read `DESIGN-INTELLIGENCE.md`.
2. Read the relevant pattern document.
3. Use donor notes for anatomy and proportions, not for foreign branding.
4. Start from ACE content and information architecture, never from a component catalogue.
5. Build the static composition first. Only then add UI components.
6. If the page looks like a component-library demo, the design has failed.

## Runtime rule

Nothing under `design-system/` is automatically production code. `foundation/ace.tokens.css` is a proposed ACE foundation and may be imported only after the visual direction is approved. Donor notes are reference material.

Direct third-party source reuse requires checking `SOURCES.md` and preserving the relevant licence notice.