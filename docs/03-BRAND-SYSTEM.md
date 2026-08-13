# 03 — Supplied brand system

Source: 12-page ACE corporate identity guide + logo archive supplied at project kickoff.

## Logo

Public brand mark: **ACE — International Association of Commodity & Futures Exchanges**.

Supplied logo archive contains 42 files:

- 12 CMYK EPS variants;
- 6 Pantone EPS variants;
- 12 RGB PNG variants;
- 12 RGB SVG variants.

Compositions include:

- Horizontal 1;
- Horizontal 2;
- Vertical;
- color / inverted color / black / white variants where applicable.

The guide explicitly prohibits unauthorized distortion, recoloring, recomposition, effects and unsafe placement.

The repository keeps one web-ready derivative of the supplied official horizontal color logo at `assets/brand/ace-logo.svg`. The underlying logo geometry is not intentionally modified.

## Corporate colors

| Role | HEX | RGB | Pantone | CMYK |
|---|---:|---:|---:|---:|
| ACE Blue | `#005EB8` | 0 / 94 / 184 | 300 C | 100 / 50 / 0 / 0 |
| ACE Red | `#AF272F` | 175 / 39 / 47 | 1805 C | 5 / 96 / 80 / 22 |
| ACE Green | `#00B140` | 0 / 177 / 64 | 354 C | 81 / 0 / 92 / 0 |
| Cool Gray | `#5B5B5B` | 91 / 91 / 91 | Cool Gray 10 C | 0 / 0 / 0 / 80 |

## Typography

### Primary

- **Echoes Sans Regular**
- **Echoes Sans Bold**

Guide role: headings and accent communication.

### Supporting

- **Pragmatica Book**
- **Pragmatica Bold**

Guide role: body copy and supporting text.

The guide permits Arial in limited office/software contexts.

## Font availability

The supplied logo and brand-guide archives did not include the licensed font binaries. Do not commit or distribute font files unless the client supplies them with appropriate usage rights.

Frontend implementation must use the typefaces specified in the approved Figma design once licensed webfont files are available. Any temporary fallback used during development is temporary and must not be treated as a design decision.

## Logo integrity

The supplied guide includes clear-space and integrity rules. Production layouts must preserve the logo proportions and clear zone and must not place navigation, borders, masks or decorative graphics inside that protected area.
