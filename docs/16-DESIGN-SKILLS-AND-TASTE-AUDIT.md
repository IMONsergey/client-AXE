# 16 — Design skills, taste, rules, examples and token audit

> Status: mandatory research for the next ACE redesign. This audit exists because the previous component-first iterations improved code structure without materially improving art direction.

## 1. Diagnosis from v5/v6

The screenshots of the current concept expose failures that a component library cannot solve by itself:

- navigation does not manage available width correctly and wraps into an awkward two-line header;
- the hero composition allows the primary text to be visually cropped by the decorative field;
- the hero spends most of its visual budget on a generic multicolour diagonal graphic rather than on the association's own subject matter;
- the metrics are treated as a familiar template device instead of evidence integrated into a deliberate hierarchy;
- the three strategic directions become generic oversized boxes with large empty decorative areas;
- the visual language is still recognisable as generated fintech/AI landing-page grammar.

Conclusion: Primer/Reshaped/Coss are useful implementation sources, but **components must not be the art director**. Before coding, ACE needs a taste/critique layer and a mandatory visual QA loop.

---

## 2. S-tier design skills

### S1 — Anthropic / Frontend Design

Source: `anthropics/claude-plugins-official/plugins/frontend-design/skills/frontend-design/SKILL.md`
License: Apache-2.0.

Why it matters:

- explicitly targets distinctive, intentional design rather than templated defaults;
- requires grounding the page in the subject's own world, artifacts and vernacular;
- treats the hero as a thesis rather than a generic component;
- explicitly warns that `big number + small label + supporting stats + gradient accent` is the template answer;
- requires a pre-code design plan covering palette, type, layout and one signature idea;
- requires critiquing the design plan for generic defaults before coding;
- recommends screenshots and self-critique during implementation;
- says to spend boldness in one place and keep the rest disciplined.

ACE decision: **mandatory pre-code art-direction skill**.

### S2 — Impeccable

Source: `pbakaus/impeccable`
License: Apache-2.0.

Why it matters:

- design guidance specifically built to prevent AI-generated frontend slop;
- one skill plus a complete workflow rather than a static component catalogue;
- `shape` plans UX/UI before code;
- `critique` reviews hierarchy, clarity and emotional resonance;
- `typeset`, `layout`, `colorize`, `distill`, `bolder`, `quieter` provide targeted correction modes;
- `audit`, `harden`, `adapt`, `polish` cover production quality;
- live browser iteration and screenshot-based review are first-class parts of the workflow;
- deterministic detector rules catch repeated AI design tells;
- project context can be written into `PRODUCT.md` / `DESIGN.md` so later passes preserve brand and anti-references.

ACE decision: **mandatory critique + polish gate; strongest operational candidate to vendor/install for agent workflows**.

### S3 — ibelick / UI Skills

Source: `ibelick/ui-skills`
License: MIT.

Relevant skills:

- `baseline-ui`;
- `create-design-md`;
- `improve-ui`;
- `fixing-accessibility`;
- `fixing-motion-performance`.

High-value baseline rules:

- use existing primitives before inventing new ones;
- do not mix primitive systems inside one interaction surface;
- no gratuitous animation;
- use balanced/prettified text wrapping;
- use a fixed z-index system;
- never use gradients unless explicitly justified;
- never use purple/multicolour gradients as a default;
- do not use glow as a primary affordance;
- limit accent colour usage to one per view.

ACE decision: **mandatory anti-slop baseline, adapted to our pure HTML/CSS stack instead of copying its Tailwind-specific requirements**.

### S4 — Vercel / Web Interface Guidelines

Sources:
- `vercel-labs/agent-skills/skills/web-design-guidelines/SKILL.md`;
- `vercel-labs/web-interface-guidelines/command.md`.

Why it matters:

- semantic HTML and accessibility checks;
- visible focus states;
- explicit image sizing / CLS rules;
- overflow and safe-layout requirements;
- long-content handling;
- responsive / touch / safe-area rules;
- animation performance rules;
- interaction and navigation semantics;
- concise file:line audit format.

ACE decision: **mandatory technical UI audit after visual composition is approved**. It is not an art director; it is a shipping-quality gate.

---

## 3. A-tier / supporting design intelligence

### A1 — UI UX Pro Max

Source: `nextlevelbuilder/ui-ux-pro-max-skill`
License: MIT.

Strengths:

- large searchable design-knowledge base;
- product-type reasoning;
- style / palette / typography / landing-pattern recommendations;
- industry-specific anti-patterns;
- pre-delivery checklist;
- broad UX rule coverage.

Risk:

It contains a catalogue of many fashionable styles (glassmorphism, bento, aurora, etc.). Allowing it to select a style mechanically would recreate the same problem we are trying to remove.

ACE decision: **use as a reference database and reasoning source, never as automatic visual style selection**.

### A2 — frontend-design-audit

Source: `mistyhx/frontend-design-audit`
License: MIT.

Use: secondary heuristic review. Good for another independent pass, but lower priority than Impeccable + Vercel because the latter provide broader, more operational quality gates.

### Watchlist, not trusted as primary

- `Krishna-Modi12/frontend-design-pro` — ambitious machine-enforced rule pack, very new and unproven; inspect useful gates later but do not let it become source of truth.
- `Ga14ctic/awwwards-skill` — combines multiple better-known skills but has almost no adoption; useful as orchestration inspiration only.
- random “Awwwards/UI god mode” repositories — excluded unless they contain reproducible rules, source provenance and real QA workflow.

---

## 4. Design-token stack

The current CSS variables are not enough. Tokens need a standard model, semantic hierarchy and design↔code pipeline.

### T1 — W3C Design Tokens Community Group

Source: `design-tokens/community-group`.

Role: canonical specification reference for token structure and interchange. Use to keep ACE tokens semantically modelled rather than as an arbitrary list of CSS variables.

### T2 — Style Dictionary

Source: `style-dictionary/style-dictionary`.
License: Apache-2.0.

Role: token transformation/build pipeline. Useful when ACE needs the same primitives emitted to CSS, JSON, native targets or documentation.

### T3 — Tokens Studio

Source: `tokens-studio/figma-plugin`.
License: MIT.

Role: Figma token workflow and eventual design↔code synchronization.

### T4 — Figma SDS

Source: `figma/sds`.

Role: architecture reference for `tokens → primitives → layouts → compositions`, plus Figma Variables / Styles / Components / Code Connect.

### T5 — SEED Design

Source: `daangn/seed-design`.

Role: mature layering model: primitive tokens → semantic tokens → recipes → components/compositions. Useful for keeping public-site and Trade Requests density systems separate without duplicating foundations.

### Token decision for ACE

Target architecture:

```text
tokens/
  primitive/
    color.json
    space.json
    radius.json
    type.json
  semantic/
    public.json
    application.json
  component/
    header.json
    button.json
    document.json
    table.json
```

CSS is an output/consumption format, not the canonical design-thinking model.

---

## 5. Real production design examples to study

These are not being selected because they contain a fashionable component. They are useful because they are full production products where we can inspect how hierarchy, responsive behavior, density and systems survive real content.

### P1 — Supabase

Source: `supabase/supabase`, Apache-2.0.

Study:
- strong technical brand without fake-tech decoration;
- marketing↔product continuity;
- dense information managed without losing hierarchy;
- real component/token reuse at scale.

### P2 — Cal.com / Cal.diy

Source: `calcom/cal.diy`, MIT.

Study:
- restrained product UI;
- compact controls;
- dense workflows;
- good boundary between marketing presentation and application UX.

### P3 — Dub

Source: `dubinc/dub`.

Study visually/code-read only until relevant file licensing is verified.

Study:
- contemporary product/marketing composition;
- strong hierarchy and whitespace;
- polished small UI details;
- modern without requiring generic glass/gradient theatre.

### P4 — Midday

Source: `midday-ai/midday`, AGPL-3.0.

Reference only unless licence implications are explicitly accepted.

Study:
- financial product restraint;
- neutral surfaces;
- data density;
- typography and quiet interaction design.

### P5 — Twenty

Source: `twentyhq/twenty`.

Reference visually until exact licensing boundaries are verified.

Study:
- large professional application UI;
- table/data/object density;
- component consistency over a large system.

### P6 — Formbricks

Source: `formbricks/formbricks`.

Reference visually until exact licensing boundaries are verified.

Study:
- form-heavy product UX;
- creator/editor patterns;
- restrained interaction states.

### P7 — Unkey

Source: `unkeyed/unkey`.

Reference visually until exact licensing boundaries are verified.

Study:
- infrastructure/developer product storytelling;
- strong technical identity;
- real operational product surfaces rather than decorative dashboards.

### P8 — Primer Brand itself

Source: `primer/brand`.

Retain as structural donor, especially Hero/Grid/River, but **do not treat Primer components as an automatic visual concept**. That mistake produced v5/v6.

---

## 6. What the new skill stack would have rejected in v6

### Screenshot: header

Would fail because:
- navigation and utilities were not tested against actual available width;
- wrapping destroyed header hierarchy;
- the composition was not screenshot-reviewed at the real desktop viewport before publication.

Relevant gates: Anthropic self-critique, Impeccable layout/polish, Vercel overflow/content handling.

### Screenshot: hero

Would fail before code because:
- the signature element was generic multicolour diagonal decoration, not something grounded in ACE's subject;
- the decoration consumed more attention than the content;
- title/body were clipped;
- blue/red/green were all used simultaneously without a semantic reason;
- `big claim + metrics + gradient field` is explicitly a known template answer.

Relevant gates: Anthropic frontend-design + ibelick baseline-ui + Impeccable critique.

### Screenshot: strategic directions

Would fail because:
- one large empty blue Bento object has no information purpose;
- the right cards are generic feature-card grammar;
- coloured bottom rules are decorative tokens, not meaningful structure;
- component availability determined composition instead of content hierarchy.

Relevant gates: Anthropic “structure is information”, Impeccable distill/critique, ACE content-first rules.

---

## 7. Mandatory workflow for the next redesign

No code until Gate 1–3 pass.

### Gate 1 — Subject / page thesis

Write one paragraph:
- what ACE is;
- who must trust it;
- what the homepage has to prove;
- what visual world belongs specifically to international exchange infrastructure.

### Gate 2 — Three written art directions

For each direction, define only:
- 4–6 colour roles;
- display/body/utility typography roles;
- grid and section rhythm;
- one signature visual mechanism;
- why that signature belongs to ACE and not another fintech company.

No HTML/CSS yet.

### Gate 3 — Anti-template critique

Reject any direction if it can be described primarily as:
- gradient hero;
- cards + metrics;
- bento;
- dark fintech;
- editorial hairlines;
- floating product window;
- random network nodes.

A donor component name is never a concept.

### Gate 4 — Build only one selected composition first

Build hero + header only. Do not build the rest of the page until the first viewport passes visual review.

### Gate 5 — Mandatory screenshots

Capture at minimum:
- 1440px desktop;
- 1024px tablet/desktop transition;
- 390px mobile.

Reject on any clipping, accidental wrapping, weak hierarchy, generic visual grammar or mismatch against the selected art direction.

### Gate 6 — Whole-page build

Only after first-screen approval, extend the same design language to About, directions, countries and document.

### Gate 7 — Independent audits

Run/adapt:
- Impeccable critique;
- Impeccable polish/layout/typeset as needed;
- ibelick baseline rules;
- Vercel Web Interface Guidelines;
- project `docs/10-STRICT-PRODUCTION-RULES.md`.

### Gate 8 — Publish

No GitHub Pages publish until screenshot evidence passes desktop/tablet/mobile review.

---

## 8. Final stack

### Art direction
1. Anthropic Frontend Design
2. Impeccable Shape/Critique
3. project brief + Stripe/reference analysis

### Anti-slop
1. Impeccable detectors
2. ibelick Baseline UI
3. existing ACE anti-patterns

### Technical UI quality
1. Vercel Web Interface Guidelines
2. Impeccable Audit/Harden/Adapt

### Tokens
1. DTCG semantic model
2. Style Dictionary pipeline
3. Tokens Studio / Figma SDS bridge
4. SEED layering reference

### Components
Primer / Reshaped / Coss / Base UI / ReUI remain implementation donors, **not visual directors**.

### Production examples
Supabase / Cal.com / Dub / Midday / Twenty / Formbricks / Unkey are study sources for real composition and product detail. Exact code reuse remains subject to each repository/file licence.

## 9. Core correction

The next ACE design should not start by asking “what components can we use?”.

It starts with:

> What is the one visual idea that makes this unmistakably an international market-infrastructure institution, and how does every typographic, spatial and component decision support that idea?

Only then do components enter the process.