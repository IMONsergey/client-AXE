---
version: alpha
name: ACE Web
summary: Institutional digital infrastructure website for the International Association of Commodity & Futures Exchanges.
---

# ACE Web Design Language

## Overview

The public site presents ACE as an international market-infrastructure institution, not as a generic SaaS startup and not as a trading terminal. The visual language is authoritative, precise and contemporary. The information itself carries the design: market-access regions, membership scale, formal documents and three infrastructure directions are used as the primary visual material.

## Color

The interface is predominantly neutral. ACE Blue is the only broad-area accent. ACE Red and Green are local identifiers and must not compete with Blue in the same viewport.

- ACE Blue: `#005EB8`
- Deep Blue: `#003C74`
- Light Blue surface: `#E8F2FB`
- ACE Red: `#AF272F`
- ACE Green: `#00A73D`
- Ink: `#10171F`
- Muted Ink: `#39434D`
- Soft Surface: `#F4F7F9`
- Rule: `#DFE4E8`

Do not introduce multicolour gradients, glow, glass or decorative aurora effects.

## Typography

Until the licensed ACE fonts are supplied, use the professional system sans stack already defined in `site/assets/css/home-v7.css`. Typography should feel typeset rather than enlarged: strong line lengths, deliberate wrapping, restrained weights and tabular numerals for data.

- Hero: high-impact sans, tight but readable line-height, balanced wrap.
- Section titles: quieter than hero, high contrast to body.
- Body: 16–19px depending on viewport, generous leading.
- Data: tabular figures, compact explanatory label.
- Utility/navigation: small and neutral; never louder than the page thesis.

## Layout

- Maximum content shell: 1320px.
- Desktop structure: 12-column conceptual grid.
- Desktop header remains one line; below 1180px the full navigation becomes a compact disclosure menu rather than wrapping.
- Major sections use distinct structural rhythms; they must not all collapse into the same card/container pattern.
- Mobile is recomposed, not proportionally shrunk.

## Signature

The homepage signature is the **regional market-access register** in the hero: three stacked blue fields carrying only the source terms `ЕАЭС+`, `БРИКС+`, `ШОС`. It is intentionally not a network diagram, chart, map or decorative gradient. It turns actual ACE scope into a memorable visual mechanism.

## Surfaces

- White and near-white are default.
- One dark infrastructure section is permitted for the three strategic directions.
- Borders/rules and whitespace carry hierarchy before shadows or cards.
- Radius is compact: 6–10px where a component actually needs a shape.

## Components

### Header
Official ACE logo, single-line desktop navigation, compact RU/EN control, Trade Requests action. At narrower widths use the same content in a disclosure menu. Never allow navigation wrapping.

### Hero
Text and subject-derived regional register have separate grid ownership. Decorative media may never overlap or crop text.

### Proof
Use the supplied `8`, `7`, `~15` facts as quiet evidence. Do not turn them into decorative KPI cards.

### Infrastructure directions
Use three editorial rows in a common dark field. Small ACE-colour markers may identify rows; do not add fake charts, icons, dashboards or oversized empty illustration areas.

### Countries
Use a register/table-like rhythm. No flags and no pill cloud.

### Document
Treat the declaration as a formal institutional record, not a sidebar card.

## Do / Don't

Do:
- derive visual devices from ACE subject matter;
- keep one memorable mechanism per viewport;
- use whitespace, rules and typography as primary hierarchy tools;
- inspect 1440px, 1024px and 390px renders before release;
- preserve the supplied copy exactly.

Don't:
- use bento as a concept;
- use purple/multicolour gradients;
- add fake dashboards, market charts, nodes, beams or invented interface labels;
- put every item into a rounded card;
- wrap desktop navigation;
- publish a design that has not been inspected as rendered screenshots.
