# 17 — World-class design audit and source stack

> Status: final research basis for ACE homepage v7. This supersedes the assumption that a component library can supply art direction.

## Objective

The audit separates four jobs that were incorrectly conflated in earlier iterations:

1. **taste / art direction** — decide what the page should feel like and what it should be remembered for;
2. **design evidence / critique** — reject generic or unsupported choices before they become code;
3. **implementation systems** — provide stable primitives, tokens and interaction behaviour;
4. **production QA** — prevent responsive, accessibility and browser defects from reaching publication.

A source is not promoted because it is popular. It is included only when it has a clear responsibility in this chain.

## S-tier: design direction and anti-slop

### Anthropic — Frontend Design

Repository: `anthropics/claude-plugins-official`
Relevant source: `plugins/frontend-design/skills/frontend-design/SKILL.md`
Licence: Apache-2.0.

Use:
- ground the visual direction in the client's actual subject;
- treat the hero as the page thesis;
- establish palette, typography, layout and one signature idea before code;
- reject designs that could be generated for any unrelated SaaS brief;
- critique rendered screenshots, not only CSS.

Important ACE consequence: the familiar formula `large KPI + caption + supporting statistics + gradient accent` is explicitly a template answer, so it is banned as the homepage identity.

### Impeccable

Repository: `pbakaus/impeccable`
Pinned revision used by this project: `ae388ac58fb33aade50fc47e2be07c3192dcaabd`
Licence: Apache-2.0.

Use:
- `shape` / new-work logic before implementation;
- `critique` for hierarchy and clarity;
- `layout`, `typeset`, `distill` for targeted correction;
- `audit`, `adapt`, `harden`, `polish` before release;
- deterministic anti-pattern detectors and screenshot iteration.

Impeccable is treated as the main operational design-quality system, not as a source of visual skin.

### ibelick/ui-skills

Repository: `ibelick/ui-skills`
Pinned revision: `146fcd0b34fca2d80333b120d67f5009ccf58b28`
Licence: MIT.

Relevant skills:
- `baseline-ui` — deslop spacing, hierarchy and typography;
- `improve-ui` — evidence-based correction rather than aesthetic guessing;
- `create-design-md` — preserve a stable design language from real evidence;
- accessibility and motion-performance skills.

ACE adaptations:
- no gratuitous gradients;
- no glow as an affordance;
- one broad accent per view;
- existing primitives before new primitives;
- text balance/pretty wrapping;
- tabular figures for statistics;
- no open-ended animation.

### Vercel Web Interface Guidelines

Repositories: `vercel-labs/agent-skills`, `vercel-labs/web-interface-guidelines`.
Role: technical release gate, not art director.

Checks used:
- semantic elements and focus-visible states;
- real links for navigation;
- image dimensions;
- long-content/overflow resilience;
- responsive layout without measurement hacks;
- reduced motion;
- correct touch targets and safe-area behaviour;
- balanced headings and tabular numbers.

## A-tier: design intelligence

### UI UX Pro Max

Repository: `nextlevelbuilder/ui-ux-pro-max-skill`
Pinned revision: `97eb2a20032f0833e3d317162208a60385b0f96e`
Licence: MIT.

Useful as an encyclopedia of product categories, typography/palette combinations, UX heuristics, landing patterns and anti-patterns. It is intentionally **not** allowed to select the art direction automatically; its catalogue contains many styles that are wrong for ACE (glassmorphism, neon, generic bento, AI-native gradients).

### Frontend Design Pro

Repository: `Krishna-Modi12/frontend-design-pro`
Licence: MIT.

Useful for machine-enforced release gates and deep reference material. Lower confidence than the S-tier sources due to limited real-world adoption, so it remains supplementary.

### Frontend Design Audit

Repository: `mistyhx/frontend-design-audit`
Licence: MIT.

Useful for heuristic review and systematic usability checks. It is supplementary to the stronger evidence and screenshot gates above.

## Token and design-system infrastructure

### W3C Design Tokens Community Group
Official specification source for interoperable design-token structure. Use as the semantic model rather than inventing ad-hoc token schemas.

### Style Dictionary
Repository: `style-dictionary/style-dictionary`
Pinned revision: `2b03351d3d52399203deeaf231b3831c1f5fd707`
Licence: Apache-2.0.

Use as the transformation/build reference for cross-platform tokens. It does not define ACE's look.

### Tokens Studio
Repository: `tokens-studio/figma-plugin`
Licence: MIT.

Use as Figma/token workflow reference, especially once the client's final Figma system is established.

### Figma SDS / Code Connect
Use for the boundary between Figma variables/components and implementation. Keep design intent and component code connected rather than relying on screenshots as handoff.

### SEED Design
Use its primitive → semantic → recipe → component hierarchy as an architecture reference.

## Production products studied

These are **examples to study**, not packages to paste into ACE.

| Product | Why study it | Code policy |
|---|---|---|
| Supabase | restrained product surfaces, technical hierarchy, docs/product continuity | Apache-2.0 areas may be studied/reused with licence compliance |
| Cal.com / cal.diy | compact controls, whitespace, dense product UI without visual noise | MIT |
| Dub | high-quality modern product/marketing continuity | study only unless exact source licence verified |
| Midday | finance-specific density, typography, tables and restraint | AGPL: visual study only |
| Twenty | large product system, CRM density, scalable patterns | study only unless exact source licence verified |
| Formbricks | forms, survey flows, modern application chrome | study only unless exact source licence verified |
| Unkey | developer infrastructure positioning and technical UI | study only unless exact source licence verified |

## Component donors retained from earlier audit

Primer Brand, Reshaped, Base UI, Coss (MIT paths only), ReUI, React Aria and Radix remain useful. Their role is now strictly downstream:

- Primer Brand → layout anatomy, grids, rivers;
- Reshaped/Coss → control proportion and surface discipline;
- Base UI / React Aria / Radix → interaction/accessibility behaviour;
- ReUI → future Trade Requests forms/tables.

No component catalogue is permitted to decide the visual concept.

## Rejected design grammars

The following are hard anti-references for the ACE public site unless the client explicitly requests them:

- aurora / purple / multicolour gradients;
- diagonal colour fields whose only justification is "dynamic";
- fake trading dashboards;
- invented market charts;
- network node diagrams without real data;
- beams, glows, glass surfaces;
- bento as the main compositional idea;
- rows of interchangeable feature cards;
- giant empty illustration zones;
- random numbered labels;
- pill clouds for countries;
- oversized typography that causes accidental wrapping or clipping;
- all corporate colours displayed simultaneously simply because they are in the brand guide.

## Final source responsibility map

- **Art direction:** Anthropic Frontend Design + ACE subject evidence.
- **Operational critique:** Impeccable.
- **Baseline anti-slop:** ibelick/ui-skills.
- **Technical QA:** Vercel Web Interface Guidelines.
- **Reference catalogue:** UI UX Pro Max.
- **Tokens:** DTCG + Style Dictionary + Tokens Studio + existing ACE brand data.
- **Components:** existing ACE primitives plus downstream donor references only after direction is frozen.
- **Visual benchmarking:** Stripe for level/discipline, institutional market sites for authority, production OSS products for real interface craft.

## Outcome

The audit changes the build order from `choose component → style page` to:

`subject → art-direction thesis → anti-template critique → first viewport → screenshots → correction → full page → technical audit → publish`.

That sequence is mandatory for v7 and future public-site work.
