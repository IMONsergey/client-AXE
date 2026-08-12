# 08 — Five pure HTML design concepts

## Purpose

Five independent visual directions were created against the same ACE prototype structure and factual content. The prototype is treated only as information architecture / content order, not as a visual reference.

All five concepts intentionally combine:

- **WFE / CME Group / Gafta** — institutional authority, grid discipline, governance, structural clarity and international scale;
- **Stripe / Ramp / Paystand** — product hierarchy, large typography, proof-first storytelling, connected-platform logic and infrastructure language.

## Technical constraint

Every concept is a standalone static HTML file with inline CSS.

- no React / Vue / framework;
- no build step;
- no JavaScript;
- no third-party UI kit;
- no external CDN dependency;
- only the official ACE logo is referenced as a local repository asset;
- no invented trading KPIs or market data.

Entry point: `concepts/index.html`.

## Concept 01 — Institutional Grid

File: `concepts/01-institutional-grid.html`

Primary donors: WFE × CME × Stripe.

Direction:

- strict editorial grid;
- white institutional canvas;
- proof metrics integrated into the hero as a right-side register;
- minimal card language;
- infrastructure directions as horizontal system rows;
- countries represented as a structured network register.

Best if the client prioritizes authority, permanence and an international-organization feel.

## Concept 02 — Market Network

File: `concepts/02-market-network.html`

Primary donors: CME × Paystand × WFE.

Direction:

- dark market-system hero;
- abstract network map based only on the seven supplied country names;
- strong separation between operating infrastructure and institutional content;
- product stack presented as one connected environment.

Best if ACE should feel most like active market infrastructure.

## Concept 03 — Editorial Protocol

File: `concepts/03-editorial-protocol.html`

Primary donors: WFE × Stripe × Gafta.

Direction:

- largest typography and most editorial white space;
- very thin structural rules;
- minimal UI decoration;
- institutional proof and governance objects treated as part of the brand;
- formal, premium, highly controlled rhythm.

Best if the target is a calm, premium international institution with contemporary typography.

## Concept 04 — Infrastructure OS

File: `concepts/04-infrastructure-os.html`

Primary donors: Stripe × Ramp × CME.

Direction:

- most product-oriented option;
- system overview object in the hero;
- infrastructure layers behave like one platform architecture;
- slightly softer panels and product UI framing;
- only supplied facts (`08 / 07 / ~15`) are used in the interface object.

Best if ACE wants the strongest perception of a modern digital platform.

## Concept 05 — Global Ledger

File: `concepts/05-global-ledger.html`

Primary donors: Gafta × WFE × Ramp.

Direction:

- registry / protocol / governance visual language;
- scale values and founding declaration are treated as an institutional ledger;
- dark infrastructure stack provides product contrast;
- country participation is shown as a formal register.

Best if governance, legitimacy and formal international structure should have the greatest visual weight.

## Brand system used

Brand guide values used directly:

- ACE Blue — `#005EB8`;
- ACE Red — `#AF272F`;
- ACE Green — `#00B140`;
- Cool Gray — `#5B5B5B`.

Official logo is used from the supplied logo package.

## Fonts

The brand guide specifies:

- **Echoes Sans B Regular** — display / headings;
- **Echoes Sans B Bold** — display / headings / emphasis;
- **Pragmatica Book** — body copy;
- **Pragmatica Bold** — body emphasis / UI.

The actual licensed font files were not supplied yet. The HTML currently declares the brand family names first and falls back to Arial.

For a typography-faithful review, add licensed files. Preferred format: WOFF2. OTF / TTF can also be accepted for project integration if licensing permits conversion / web embedding.
