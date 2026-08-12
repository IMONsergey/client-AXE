# 04 — Design concept v1

## Working idea

**Institutional network, not institutional brochure.**

The site should behave visually like the public interface of a market system: a calm editorial shell wrapped around data, network relationships, documents and platform access.

The concept deliberately avoids the usual association-site pattern of “large gray hero + small facts + generic feature cards”.

## What is wrong with the supplied draft as a final design direction

The supplied screenshot is useful as a content wireframe, but visually it undersells the brief:

1. **The dark-gray hero is too generic.** It reads as a corporate placeholder rather than global financial infrastructure.
2. **The strongest proof is visually weak.** `8` and `~15` are tiny secondary facts when they should anchor credibility.
3. **The hierarchy is brochure-like.** Heading → paragraph → button → cards is correct structurally but lacks an infrastructure narrative.
4. **The cards feel like standard UI tiles.** The three strategic directions should feel like layers of one market system, not three unrelated services.
5. **Brand colors are token decoration rather than a system.** Colored circles do not create financial-product sophistication.
6. **Trade Requests is visually disconnected.** It should read as an operating interface of the Association, not merely an external button.
7. **International scale is asserted in copy but not experienced visually.** There is no network, market, geography or cross-border system behavior in the first screen.
8. **The yellow prototype notice should disappear completely from production.** It lowers institutional credibility.

## Concept v1 visual system

### 1. Light institutional canvas

Use a white / cold light-gray base with thin structural rules and a subtle large grid. This keeps the site serious while avoiding the heaviness of a large gray block.

### 2. High-weight editorial typography

The hero becomes the primary brand statement. Large type communicates scope before the user reads details.

Concept framing:

> Инфраструктура международной межбиржевой торговли

This does not replace the official organization name; it reframes the value proposition for the hero while the logo and supporting copy preserve identity.

### 3. Market network as the first-screen visual

Instead of a stock-photo hero or decorative illustration, concept v1 uses an abstract network module:

- seven country nodes;
- inter-market routes;
- live-system styling;
- founding-framework metadata;
- member-market metadata.

It is intentionally abstract and must not be presented as a literal geographic or legally complete map.

### 4. Evidence before marketing

The hero exposes the supplied facts immediately:

- 08 exchanges;
- 07 participating countries;
- ~15 countries considering membership.

No invented financial KPIs are used.

### 5. Infrastructure modules, not “feature cards”

The three directions become numbered layers:

- Connectivity — Межбиржевые линки;
- Price Discovery — Ценовое агентство;
- Execution — Торговая платформа.

The English micro-labels are interface metadata, not a replacement for Russian content.

### 6. Founding document as proof object

The declaration receives its own high-contrast institutional tile. Documents should be treated as evidence / governance artifacts, not buried in a “downloads” section.

### 7. Corporate colors as signals

- Blue: primary CTA, routes, active infrastructure signal.
- Green: active / connected state.
- Red: document / secondary market signal.
- No large rainbow gradients.
- No decorative color blocks without semantic value.

## Motion direction for later implementation

Motion should be nearly invisible until interaction:

- route lines can draw in once on hero load;
- active nodes can pulse very subtly;
- cards can lift 1–2px on hover;
- section labels / rules can reveal with short opacity/translate transitions;
- no parallax spectacle, floating blobs, glassmorphism or finance-dashboard gimmicks.

## Concept scope represented in code

`concept/` contains:

- global header;
- hero;
- proof metrics;
- abstract ACE network module;
- country strip;
- About intro;
- three infrastructure layers;
- founding-document tile.

This is intentionally enough to approve the overall system without prematurely designing the entire site.
