# 07 — Block donor map

This document maps the reviewed references onto the **existing ACE prototype structure**. The prototype supplies content order and required elements only. It does **not** supply the visual design.

## Core design formula

**Institutional shell / product core.**

- WFE + CME Group + Gafta define the grid, authority, governance, restraint and international scale.
- Stripe + Ramp + Paystand define the typography, product hierarchy, platform logic, proof treatment and system visuals.
- Betterment + Acorns contribute only clarity and pacing where complex content needs to be simplified.

The design should not look like a collage of references. Each reference has a specific job.

---

# 0. Prototype notice

Prototype element:

- yellow development / prototype strip.

Decision:

- **remove completely** from the design concept.

Reason:

- it is workflow metadata, not public content;
- it instantly lowers the perceived institutional level.

---

# 1. Global header

Prototype content:

- ACE logo;
- Об ассоциации;
- Медиа;
- Органы управления;
- Члены ассоциации;
- Документы;
- Новости;
- Вступление;
- Контакты;
- RU / EN;
- Trade Requests.

## Primary donors

- **WFE** — institutional navigation hierarchy;
- **CME Group** — utility / platform navigation and scalable information architecture;
- **Stripe / Ramp** — clean product CTA hierarchy.

## Direction

The current two-row loose navigation should become a **single controlled institutional header system**.

Recommended desktop logic:

- logo zone on the left;
- primary institutional navigation in the middle;
- utilities on the right;
- `Trade Requests` is visually distinct because it is an operating platform entry point;
- RU / EN is a low-weight utility control, not a segmented-pill focal point.

### Visual rules

- height around 84–96 px;
- white / near-white surface;
- bottom 1 px structural rule;
- no large rounded nav container;
- no shadow by default;
- navigation 14–15 px with generous horizontal spacing;
- minimal hover states using underline / rule / text weight rather than filled pills;
- `Trade Requests` can use brand blue as the only strong action in the header.

### Important

Do not make the header look like a fintech SaaS nav. The product CTA is modern, but the navigation itself should remain institutional.

---

# 2. Hero / first screen

Prototype content:

- organisation name;
- short infrastructure description;
- Trade Requests CTA;
- 8 exchanges;
- ~15 countries considering membership.

Additional approved fact available:

- 7 participating countries.

## Primary donors

- **Stripe** — one dominant infrastructure proposition + large type;
- **WFE** — scale facts as immediate proof;
- **CME Group** — market-system tone;
- **Paystand** — connected-network logic.

## Direction

The current large dark-grey rounded rectangle must be discarded.

The hero should behave as a **full-width institutional composition**, not a card.

Recommended 12-column desktop composition:

- left 7 columns: identity + headline + explanation + CTA;
- right 5 columns: restrained system / network visual;
- bottom across the grid: scale proof `08 / 07 / ~15` separated by structural rules.

### Hero hierarchy

1. small institutional identifier / organisation name;
2. H1 that explains the infrastructure ambition;
3. 2–3 line supporting text;
4. primary CTA to Trade Requests;
5. metrics;
6. visual network / system object.

### Suggested typographic behaviour

- H1: approximately 72–88 px desktop depending on final Echoes Sans metrics;
- line-height around 0.98–1.05;
- body: 18–20 px;
- metrics: 48–64 px;
- strong left alignment;
- avoid centred fintech hero composition.

### System visual

The hero visual should not be a stock photo, globe render or glowing world map.

Preferred system:

- structured node / route field;
- seven participant-country nodes using real supplied country names;
- route lines / interfaces that imply cross-border links;
- small metadata labels such as network / connectivity / framework;
- no invented exchange names or market KPIs;
- no claim that the diagram is a literal legal or geographic map.

The feeling should be **market infrastructure diagram**, not sci-fi network art.

---

# 3. Scale proof / numbers

Prototype elements:

- `8` exchanges;
- `~15` countries considering membership;
- `7` participating countries elsewhere in the section.

## Primary donors

- **WFE** — association scale through hard data;
- **Stripe** — large operational metrics as brand proof;
- **Ramp** — outcome / scale numbers with strong typography.

## Direction

The numbers must stop behaving like small supporting captions.

Use one horizontal proof rail directly in or immediately after the hero:

- `08` — бирж;
- `07` — стран-участниц;
- `~15` — стран рассматривают вступление.

### Visual rules

- three equal or intentionally asymmetric grid cells;
- 1 px vertical / horizontal separators;
- no separate rounded cards;
- no icon above every number;
- large numeric typography;
- compact institutional descriptions;
- corporate blue can mark the active / primary metric, but the whole rail should remain mostly monochrome.

---

# 4. “Об ассоциации”

Prototype content:

- label `Кто мы`;
- heading `Об ассоциации`;
- founding paragraph;
- `Читать полностью`;
- three infrastructure directions beside / below it;
- right-side number and document cards.

## Primary donors

- **WFE** — mission / global-role authority;
- **Gafta** — formal institutional legitimacy;
- **Stripe** — strong editorial spacing;
- **Betterment** — calm progressive explanation only.

## Direction

This block should act as a **bridge from the first-screen promise to institutional proof**.

Recommended composition:

- wide left narrative column;
- narrow right metadata column;
- no card around the main text;
- strong section number / label and rule;
- declaration / founding metadata on the right;
- the three product directions move into their own following block rather than being presented as generic service cards inside `About`.

### Content tone

The first paragraph should explain:

- why the Association exists;
- where it comes from;
- which international market context it serves.

It should not be overloaded with product details; those belong to the infrastructure block.

---

# 5. Three infrastructure directions

Prototype content:

1. Межбиржевые линки;
2. Ценовое агентство;
3. Торговая платформа.

Prototype visual problem:

- three standard equal cards with coloured circular icons.

## Primary donors

- **Stripe** — several capabilities inside one infrastructure system;
- **Ramp** — one platform decomposed into workflows;
- **Paystand** — network / rails relationship between modules;
- **CME Group** — technical category discipline.

## Direction

This is the main **product-language block** of the homepage concept.

The three directions should be presented as one infrastructure stack:

### 01 — Connectivity

**Межбиржевые линки**

Cross-border technological links and mutual broker access.

Visual cue:

- routes / nodes / connection state.

### 02 — Price discovery

**Ценовое агентство**

Independent price indicators for key commodity groups.

Visual cue:

- structured data series / quote / index surface;
- no fake price values unless supplied.

### 03 — Execution

**Торговая платформа**

A digital environment for transactions and counterparty records.

Visual cue:

- system / workflow / transaction object;
- no fake trading interface data unless supplied.

## Preferred layout options

### Option A — connected horizontal stack

Three large columns linked by one system line / shared grid.

Best when the goal is to show that all three layers are equal parts of one architecture.

### Option B — vertical infrastructure layers

Three full-width rows, each with large number, title, explanation and a right-side system visual.

Best for stronger Stripe / Ramp-style storytelling and more room for later animation.

### Current recommendation

**Option B** is stronger for ACE.

Reason:

- more institutional than a three-card SaaS grid;
- can scale as content grows;
- lets each capability have a distinct technical visual;
- creates a premium editorial rhythm.

---

# 6. Countries / international network

Prototype content:

- Россия;
- Беларусь;
- Казахстан;
- Узбекистан;
- Китай;
- Иран;
- Египет.

Prototype visual problem:

- rounded pill tags make the international structure look like filter chips.

## Primary donors

- **WFE** — global association / market-infrastructure scale;
- **Paystand** — network participation model;
- **CME Group** — regional / market organisation.

## Direction

Countries should become a **structured member-network rail or matrix**.

Possible treatment:

- label `NETWORK / PARTICIPATING COUNTRIES`;
- seven country names aligned to a grid;
- subtle node identifier / number;
- one connected route line or shared baseline;
- optionally a restrained abstract geographic reference if it can remain accurate.

Do not use flags by default. They introduce unnecessary political / decorative weight and can quickly make the design look like a government portal.

Do not use chips unless they are interactive filters on a later member directory.

---

# 7. Founding declaration / document

Prototype content:

- `Декларация о создании ассоциации` — PDF.

## Primary donors

- **Gafta** — formal rules / documents;
- **WFE** — reports / institutional publications;
- **CME Group** — structured metadata.

## Direction

Treat the declaration as a **proof object**.

Preferred desktop module:

- document type / eyebrow;
- title;
- context: founding declaration;
- date / file size / language only if source data is available;
- restrained PDF / document glyph;
- download / open action;
- thin rules, not a generic rounded card.

The visual message is: **this organisation has a formal foundation**, not “here is a file to download”.

---

# 8. Trade Requests

Prototype appearance:

- button in header;
- button in hero.

## Primary donors

- **Stripe** — infrastructure platform as an operational product;
- **Paystand** — network portal as an entry into the system;
- **Ramp** — product clarity and workflow language;
- **CME Group** — operational-market interface tone.

## Direction

Trade Requests should become a recurring **operating-layer motif** throughout the site.

At concept stage:

- strong header CTA;
- primary hero CTA;
- later dedicated dark / technical platform block if truthful interface material becomes available.

It must not feel like an external microsite link accidentally attached to the Association.

If real Trade Requests screenshots / flows are supplied later, use them as direct product proof. Until then, do not fabricate realistic transaction data or UI screenshots.

---

# 9. Section rhythm

## Primary donors

- WFE / Gafta for institutional sections;
- Stripe / Ramp for narrative pacing;
- CME for dense technical interruptions.

## Recommended page rhythm

1. light — header / hero;
2. light — scale proof;
3. light — About / founding context;
4. **dark technical surface** — infrastructure system / network;
5. light — countries / membership network;
6. light — declaration / governance proof;
7. later: news / media / documents using WFE-style editorial system.

This creates contrast without turning the whole website dark.

---

# 10. Grid and surface rules

## Desktop grid

Recommended baseline:

- viewport concept: 1440 px;
- max content: approximately 1240–1280 px;
- 12 columns;
- 20–24 px gutters;
- section spacing: 120–160 px depending on content density.

## Radius

Institutional surfaces should be much squarer than the prototype.

- default: `0–4 px`;
- product / interface fragments: up to `8–12 px` where needed;
- avoid `16–32 px` rounded SaaS card language.

## Rules

Use thin borders and grid rules as a major visual device:

- `1 px` neutral line;
- repeated horizontal section dividers;
- vertical grid lines selectively exposed in key areas;
- no heavy shadows.

## Colour

Primary brand values from the guide:

- Blue `#005EB8`;
- Red `#AF272F`;
- Green `#00B140`;
- Cool Gray `#5B5B5B`.

Recommended behaviour:

- background: white / cold off-white;
- text: near-black;
- blue: primary operating / navigation signal;
- green: connected / active state;
- red: formal / alert / document accent where semantically appropriate;
- corporate grey: secondary typography / structural use.

No equal red-blue-green decorative cards.

---

# 11. Typography direction

Brand guide:

- **Echoes Sans Regular / Bold** — headings / accents;
- **Pragmatica Book / Bold** — body text.

Reference behaviour to import:

- Stripe / Ramp scale in major headings;
- WFE / CME confidence in labels and data;
- Gafta formality in institutional copy.

The typography should carry most of the visual sophistication.

Avoid:

- too many font sizes;
- tiny secondary copy everywhere;
- centre-aligned marketing sections;
- uppercase for long Russian headlines;
- ultra-tight fintech microcopy density.

---

# 12. What the next design concept must prove

A successful first 2–3 screens must answer these questions without explanation from the designer:

1. Is this clearly an international organisation?
2. Does it feel connected to real market infrastructure rather than advocacy / networking only?
3. Is there a credible digital platform behind the Association?
4. Are the scale facts visible immediately?
5. Do the three directions feel like one system?
6. Does Trade Requests feel native to the Association?
7. Is the visual system serious enough for exchanges, regulators and institutional partners?
8. Does it still feel current in 2026 rather than like a legacy trade-association site?

If any answer is no, the concept is not ready for client presentation.
