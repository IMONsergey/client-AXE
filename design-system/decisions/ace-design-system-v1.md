# Decision — ACE Design System v1

Status: **baseline for the next homepage rebuild**.

This decision does not approve the current homepage concept. It defines the system that the replacement concept must use.

## DSV1-001 — No single donor system

ACE will not adopt Primer, Reshaped, Coss, Base UI, ReUI, shadcn or any other donor wholesale.

Each donor has a bounded role and must disappear into a custom ACE result.

## DSV1-002 — Public composition

Primary sources:

1. Stripe art direction reference;
2. Primer Brand composition system;
3. institutional restraint from WFE/CME/Gafta.

The homepage is designed as a branded page composition, not assembled from a component library.

## DSV1-003 — Component visual language

Primary sources:

1. Reshaped token/proportion discipline;
2. Coss MIT visual/control patterns.

Baseline:

- 4px spacing rhythm;
- compact normal radii 4/6/10px;
- borders before shadows;
- neutral surfaces;
- brand colour used as signal;
- no default glass/card language.

## DSV1-004 — Interaction

Base UI is the primary behaviour/accessibility reference.

The public static concept remains semantic HTML/CSS. A JS/React primitive library is introduced only when real interaction requires it.

## DSV1-005 — Trade Requests

ReUI is the primary table/form donor. Its application UI is kept structurally separate from the public homepage.

One component structure must support RU and EN.

## DSV1-006 — Figma ↔ code

Figma SDS supplies the organisational model:

- tokens;
- primitives;
- layouts;
- compositions;
- templates;
- mirrored design/code documentation.

SEED supplies the layered token/recipe model and the conceptual separation between headless behaviour and styled implementation.

## DSV1-007 — Content cannot follow components

Components are selected/adapted to ACE content. ACE content is never rewritten or expanded to make a donor pattern fit.

`docs/10-STRICT-PRODUCTION-RULES.md` has higher priority than donor notes.

## DSV1-008 — Current v3 visual system is not a base

The current `site/home/` v3 concept may be used only as a technical/content reference. Its visual decisions — large rounded proof shell, glass hero planes, blurred multi-colour field, generic service cards/pills — are not inherited into the next design.

The next homepage concept is a fresh visual build on the new foundation.

## DSV1-009 — Typography remains provisional

Do not lock final typography until licensed Echoes Sans and Pragmatica files arrive.

The system font is a layout placeholder only.

## DSV1-010 — Static quality before motion

No motion pass begins until the static desktop composition is strong enough to approve as a still image.

## Required sequence for the redesign

1. Re-read exact prototype content.
2. Create hierarchy map without styling.
3. Establish 12-column desktop composition.
4. Solve header and hero statically.
5. Place proof metrics without a generic card shell.
6. Solve About + three directions + countries + declaration as a coherent page rhythm.
7. Audit against `patterns/anti-patterns.md`.
8. Create tablet composition.
9. Create mobile composition.
10. Only after that evaluate interaction/motion.

## Approval standard

A design is not ready because it is cleaner than the wireframe.

It is ready when:

- it feels institutionally credible;
- it has technology-company precision;
- content hierarchy is obvious without invented microcopy;
- the page remains recognisably ACE without trendy effects;
- component boundaries are content-driven;
- responsive states are deliberate;
- the static page can stand next to the quality level of the references without looking like a template.