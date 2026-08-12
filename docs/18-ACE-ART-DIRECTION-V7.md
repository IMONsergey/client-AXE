# 18 — ACE homepage art direction v7

> Status: selected and implemented.

## Why v6 was rejected

The previous page had real structural defects and a weak visual premise:

- navigation wrapped and lost hierarchy;
- hero text could be cropped by the decorative field;
- the largest visual object was a generic multicolour diagonal treatment unrelated to exchange infrastructure;
- metrics were used as a familiar fintech motif;
- the three strategic directions became oversized boxes with empty decorative space;
- the result read as generated finance/SaaS design rather than an international market institution.

v7 does not inherit that visual world.

## Subject grounding

ACE is an international association of commodity and futures exchanges. The useful visual material already present in the approved content is:

- market access and cross-border participation;
- EAEU+, BRICS+ and SCO scope;
- 8 exchanges / 7 participating countries / approximately 15 considering membership;
- three concrete infrastructure directions;
- a founding declaration/document;
- an institutional member/country register.

The design must express these materials rather than decorate them with fictional finance UI.

## Explored direction A — Regional market register

Hero signature: three stacked territorial/institutional fields containing `ЕАЭС+`, `БРИКС+`, `ШОС`.

Strengths:
- directly sourced from approved content;
- distinctive without invented data;
- works in pure HTML/CSS;
- scales from desktop to mobile;
- lets ACE Blue dominate while Red/Green remain disciplined downstream accents;
- can coexist with a very sober institutional body.

Selected.

## Explored direction B — Document-first institution

Hero based on oversized declaration / rules / formal register language.

Strengths: authority and governance.
Weakness: under-represents the digital infrastructure ambition and makes the organisation feel legalistic/static. Rejected as primary direction; its restraint informs the document block.

## Explored direction C — Exchange protocol grid

Hero based on rigorous grids/rules and market-access topology.

Strengths: technical and systematic.
Weakness: easy to slip back into fake terminal/network graphics because no real topology data is supplied. Rejected to preserve content integrity.

## Selected thesis

**ACE connects real regional market institutions; the scope itself is the hero visual.**

The first viewport is therefore split into two clearly owned systems:

- left: the approved institutional claim and CTA;
- right: a regional register made from approved terms only;
- bottom: quiet factual proof.

Nothing may overlap the headline. No decorative field can own the full viewport.

## Palette roles

- White: primary public/institutional field.
- Ink `#10171F`: copy and authority.
- ACE Blue `#005EB8`: primary digital/infrastructure accent.
- Deep Blue `#003C74`: regional depth.
- Light Blue `#E8F2FB`: third regional field / low-emphasis blue surface.
- ACE Red `#AF272F`: document / one infrastructure direction marker only.
- ACE Green `#00A73D`: one infrastructure direction marker only.
- Neutral line `#DFE4E8`: structural rules.

There is no gradient in v7.

## Typography

Corporate licensed fonts are still pending, so v7 uses a neutral system sans. The design does not rely on a trendy substitute font to create personality; the hierarchy comes from proportions and line composition.

Hero desktop target: 52–76px; mobile 45–58px.
Body target: 16–19px.
Statistics use tabular numerals.
Letterspacing is restrained; no decorative all-caps except existing prototype labels.

## Grid and rhythm

- 1320px max shell.
- 12-column conceptual desktop grid.
- Hero left 7 columns / region register right 5.
- Header is a compact one-row system.
- At <=1180px desktop nav is replaced by disclosure navigation, not wrapped.
- About uses a 2 / 4 / 6-column rhythm.
- Infrastructure directions use full-width editorial rows, deliberately different from the light sections.
- Countries use a register, not chips/cards.
- Document uses a formal horizontal record.

## Signature and restraint

Signature: the regional market register appears once in the hero. The rest of the page gets quieter.

Explicitly not used:
- bento;
- glow;
- glass;
- fake charts;
- icons for the strategic directions;
- flags;
- card cloud;
- node network;
- decorative gradients;
- parallax or ambient motion.

## Component decisions

### Header
The complete desktop navigation is allowed only while it fits in one row. Responsive behaviour changes the navigation structure before wrap occurs. The official logo is always used unchanged.

### Hero
The region register is an independent grid cell. Its labels are source content. It cannot cover the text region.

### Metrics
No rounded KPI cards. Metrics are integrated as a ruled proof strip.

### Directions
One dark infrastructure field with three rows. The only decoration is a 3px colour marker tied to ACE brand colours. Earlier draft bars were removed after QA because they resembled invented mini charts.

### Countries
A grid/register with rules. No flags and no pills.

### Document
Formal declaration record with PDF badge and strong typographic hierarchy.

## Content compliance

No new visible marketing copy has been introduced. All page-visible words are present in the approved prototype/current content. Internal `aria-label` values and document metadata are accessibility/technical metadata rather than public copy.

## Release decision

v7 is the first direction after the process reset that passes both requirements:

1. a signature that can be traced to ACE subject matter;
2. a restrained system that does not depend on AI/SaaS visual defaults.
