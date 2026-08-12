# Anti-patterns — hard blacklist

These patterns are banned by default because they repeatedly produce generic AI/Framer/shadcn-looking work instead of authored ACE design.

An exception requires a concrete content/interaction reason, not “it looks modern”.

## Visual decoration

- glassmorphism as a general surface language;
- blurred gradient blobs behind hero copy;
- three ACE colours mixed into one decorative gradient merely because they exist in the logo;
- glowing borders;
- neon network lines;
- floating translucent dashboard cards;
- soft 30px-radius rectangles everywhere;
- giant shadows on normal content blocks;
- decorative grids that do not structure content;
- fake terminal / market-screen visuals.

## Layout

- bento for the sake of bento;
- identical 3-card feature rows for unrelated reasons;
- cards nested inside cards;
- every section in its own rounded container;
- content centred simply because there is no composition idea;
- alternating left/right sections mechanically repeated without narrative need;
- giant empty hero with small text and decorative object;
- desktop composition merely scaled down for mobile.

## Typography

- huge text as a substitute for hierarchy;
- extreme negative tracking on Cyrillic;
- tiny uppercase English eyebrow labels added to make the layout feel expensive;
- monospace labels without a functional reason;
- all-caps metadata invented from designer language rather than prototype content;
- grey-on-grey body copy with insufficient contrast.

## Components

- default shadcn skin;
- black pill CTA + rounded-xl cards as an automatic modern aesthetic;
- colourful circular icons above feature-card headings;
- hover-lift on every card;
- tags/chips used for ordinary text lists;
- excessive badges;
- icon buttons where a text action is clearer.

## Product theatre

- fake dashboards;
- fake transaction/volume/latency numbers;
- fake charts;
- fake activity feeds;
- fake product screenshots;
- random nodes connected by lines to mean “network”;
- status dots marked active/live without real system meaning.

## Motion

- animated beams;
- continuous floating/orbiting surfaces;
- pulsing nodes;
- text shimmer;
- endless marquee;
- scroll-triggered motion added to make a static layout interesting;
- parallax with no information purpose.

## Content

Project-wide `docs/10-STRICT-PRODUCTION-RULES.md` remains authoritative:

- no invented copy;
- no invented English labels;
- no rewritten prototype wording;
- no invented KPI/data;
- no content introduced to make a donor component fit.

## Quick smell test

If a screenshot would immediately be described as:

- “AI SaaS landing”;
- “shadcn dashboard”;
- “Framer fintech template”;
- “Dribbble banking concept”;

then the design should not be shown to the client yet.

ACE should be identifiable by composition, institutional restraint and content handling — not by a collection of current UI trends.