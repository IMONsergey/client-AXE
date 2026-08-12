# 11 — Stripe-led concept v3

## Purpose

Build one strong homepage direction instead of another set of shallow variants.

The supplied gray prototype remains the source of information architecture and visible copy only. Its visual treatment is not reused.

## Primary visual reference

Stripe is the dominant reference for this pass.

The concept translates the following transferable qualities into ACE:

- very large first-screen typography;
- light, high-contrast base;
- controlled multi-layer colour field rather than a flat corporate hero block;
- strong primary CTA;
- proof figures presented as a major composition layer;
- floating / layered product surfaces used as visual evidence of a digital platform;
- asymmetric product-module composition instead of three equal SaaS cards;
- high whitespace discipline;
- subtle shadows and depth;
- restrained rounded geometry;
- clear hierarchy between institutional copy and product-like surfaces.

## ACE-specific translation

The hero visual is deliberately abstract. It uses lines, nodes, grid surfaces and ACE colours but contains no fabricated product data and does not pretend to be a real Trade Requests interface.

The current homepage concept contains only copy from the supplied prototype:

- header navigation and utilities;
- official association title;
- supplied hero paragraph;
- `Войти в Trade Requests`;
- `8 / бирж - 7 стран-участниц`;
- `~15 / стран рассматривают вступление`;
- About copy;
- the three supplied association directions and descriptions;
- the seven supplied country names;
- the supplied declaration record.

No additional public-facing copy is permitted in this stage.

## Implementation structure

```text
site/
  assets/
    css/
      home.css
  home/
    index.html
```

The official logo currently reuses the existing repository asset at `concepts/assets/ace-logo.svg`; its geometry is not modified.

## Responsive targets

The stylesheet has three deliberate layout ranges:

- desktop: `1200px+`;
- tablet: `768–1199px`;
- mobile: `<768px`.

## Next implementation work

After the homepage direction is approved:

1. integrate licensed Echoes Sans / Pragmatica files when supplied;
2. refine exact typography metrics with the real fonts;
3. isolate remaining page templates;
4. build the Trade Requests application-form template once the client supplies its actual fields and copy;
5. build the Trade Requests announcement-table template once the client supplies its actual columns and copy;
6. verify current Chrome, Firefox, Safari and Edge.
