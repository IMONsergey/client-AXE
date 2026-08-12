# 12 — Design-system donor audit

> **Status:** research baseline for the ACE visual-system rebuild.
>
> This document does not relax `docs/10-STRICT-PRODUCTION-RULES.md`. The prototype remains the only source of visible copy. Donor systems are used for design language, component anatomy, spacing, interaction, responsive behavior, tokens and implementation discipline — not for importing foreign brand copy or blindly applying a ready-made skin.

## Goal

Find open repositories that can help ACE reach a modern, calm, professional and highly finished level without falling into the recurring AI-site look: generic shadcn defaults, giant rounded cards, glass panels, gradient blobs, glowing borders, bento-for-the-sake-of-bento, meaningless dashboard skeletons and random microcopy.

The current public-site north star remains Stripe, while this audit looks for repositories that can supply the **system underneath the art direction**.

## Evaluation criteria

Each donor was evaluated on:

1. **Visual maturity** — whether the system looks deliberately designed rather than merely functional.
2. **System quality** — tokens, primitives, variants, spacing, states and responsive behavior.
3. **Component depth** — especially navigation, forms, data tables, filters, dialogs and complex controls.
4. **ACE compatibility** — suitability for a serious international financial/institutional interface.
5. **Anti-template value** — whether it helps us escape default AI/shadcn aesthetics rather than reinforce them.
6. **Design↔code workflow** — Figma, Storybook, tokens, Code Connect or equivalent tooling.
7. **Portability** — whether useful decisions can be translated into our required semantic HTML5 + clean CSS implementation.
8. **License clarity** — whether code can be safely studied/reused under a clear permissive license. License still needs a final check before direct code reuse.

---

# Executive conclusion

There is no single repository that should become the ACE design system wholesale. The strongest result comes from a **layered donor stack**:

- **Marketing / public-site composition:** `primer/brand`
- **Modern product visual language:** `reshaped-ui/reshaped` + `cosscom/coss`
- **Interaction foundation:** `mui/base-ui` (with Radix/Ariakit/React Aria as cross-checks)
- **Copy-and-own component architecture:** `shadcn-ui/ui`, but **not its default visual skin**
- **Advanced forms / tables / application UI:** `keenthemes/reui`
- **Data visualization:** `tremorlabs/tremor` + selected `elastic/eui` patterns
- **Motion:** `ibelick/motion-primitives`, used very selectively
- **Tokens + Figma ↔ code methodology:** `figma/sds` + `figma/code-connect`
- **Cross-platform/token architecture reference:** `daangn/seed-design`

For ACE specifically, the public site should **not** look like a component library demo. The donor systems should disappear into a custom ACE system.

---

# S-tier — direct donors

## S1. `primer/brand` — primary public-site system donor

**Role for ACE:** page composition, responsive grid, section rhythm, typography hierarchy, navigation, marketing primitives.

Primer Brand is specifically GitHub's design system for marketing websites and digital experiences, with a Figma library and React implementation. That makes it much more relevant to the ACE public site than product-only libraries.

**Take:**
- container and grid discipline;
- section anatomy;
- large editorial/marketing typography patterns;
- responsive navigation structure;
- feature/product storytelling primitives;
- relationship between brand tokens and page-level composition;
- accessible, production-grade component states.

**Do not take:**
- GitHub colors, illustrations, iconography or branded page motifs;
- GitHub-specific copy and product structures.

**Why it matters:** this is the strongest repo in the audit for preventing the page from degenerating into a pile of generic cards.

**License:** MIT.

**ACE score:** 9.8 / 10.

---

## S2. `reshaped-ui/reshaped` — primary modern product-style donor

**Role for ACE:** component proportions, surface design, spacing, states, form quality, visual restraint.

Reshaped combines a professionally designed React system with a synchronized Figma library and also exposes headless utilities. It is visually cleaner and more authored than many large enterprise libraries.

**Take:**
- precise component proportions;
- calm border/radius hierarchy;
- spacing and density decisions;
- typography inside controls;
- form and overlay treatment;
- theme/token structure;
- Figma/code parity;
- headless component architecture as a reference.

**Do not take:**
- a ready-made Reshaped theme pasted over ACE;
- excessive rounded-product UI on the institutional public page.

**License:** MIT.

**ACE score:** 9.7 / 10.

---

## S3. `cosscom/coss` — clean modern component donor

**Role for ACE:** modern product controls, form anatomy, compact UI, clean neutral styling.

This is the official Cal.com design system. The current coss UI layer is built on Base UI and Tailwind and follows a copy/paste/own model.

**Take:**
- button/input/select/dropdown proportions;
- neutral surfaces and borders;
- compact spacing;
- modal/popover/menu treatment;
- component composition patterns;
- source-ownership model;
- modern Base UI component anatomy.

**Do not take:**
- Cal.com's gray/black identity wholesale;
- default shadcn-like styling without ACE-specific redesign.

**License warning:** the repository is mixed-license. `apps/ui/` and `apps/origin/` are MIT; other directories default to AGPLv3. Direct reuse must stay inside clearly permissive areas unless separately reviewed.

**ACE score:** 9.5 / 10.

---

## S4. `mui/base-ui` — primary behavior/accessibility foundation

**Role for ACE:** interaction logic rather than visual styling.

Base UI is intentionally unstyled and focuses on accessible, high-quality primitives. This is ideal for our case because the public result must be custom, while controls still need professional keyboard/focus behavior.

**Take:**
- menu/select/popover/dialog anatomy;
- keyboard behavior;
- focus management;
- accessible state models;
- compositional API thinking;
- separation of behavior from appearance.

**Do not take:** nothing visual needs to be copied — that is precisely the benefit.

**License:** permissive open-source; verify package-level license before direct reuse.

**ACE score:** 9.5 / 10.

---

## S5. `figma/sds` + `figma/code-connect` — design-system process donor

**Role for ACE:** build a real design system instead of a CSS file that happens to contain variables.

Figma SDS demonstrates Variables, Styles, Components, responsive compositions and Code Connect living alongside a codebase. Code Connect maps design-system components to production code shown in Dev Mode.

**Take:**
- token/source-of-truth structure;
- Figma variables and code token parity;
- primitive vs composition separation;
- responsive layout components;
- Storybook organization;
- component metadata;
- Code Connect mapping conventions;
- design/code synchronization discipline.

**Do not take:** SDS's intentionally basic visual skin as ACE's design language.

**License:** MIT.

**ACE score:** 9.5 / 10 for methodology, 6/10 as a visual donor.

---

## S6. `keenthemes/reui` — primary Trade Requests / complex-UI donor

**Role for ACE:** forms, filters, tables and later Trade Requests interfaces.

ReUI is a design-forward shadcn ecosystem with 1,000+ examples and custom components such as Data Grid, Filters, Stepper, Timeline, Tree, Gantt and Kanban. It supports both Radix UI and Base UI variants.

**Take:**
- Data Grid anatomy;
- advanced table states;
- filtering controls;
- multi-step form structure;
- date inputs;
- row/action density;
- empty states;
- pagination;
- realistic application compositions.

**Do not take:**
- the whole dashboard look for the public homepage;
- generic shadcn cards/sidebars by default;
- decorative icon stacks if they do not communicate real content.

**License:** MIT for the open-source library; premium blocks are separate.

**ACE score:** 9.3 / 10 for Trade Requests, 7.5/10 for the public homepage.

---

## S7. `shadcn-ui/ui` — architecture donor, not art-direction donor

**Role for ACE:** copy-and-own distribution, component ownership, CSS-variable theming, readable local source.

shadcn/ui is excellent as an engineering model because components live in the project instead of hiding in a black-box package.

**Take:**
- copy-and-own model;
- local component source;
- semantic component boundaries;
- CSS variable/token model;
- variant architecture;
- accessibility primitives underneath;
- registry concept.

**Strict warning:** do **not** use default shadcn appearance as ACE's visual identity. Default rounded cards, black/white UI, common dashboard shells and stock layouts are now one of the most recognizable AI-generated UI signatures.

**License:** MIT.

**ACE score:** 9.2 / 10 architecture, 5/10 if used without redesign.

---

## S8. `daangn/seed-design` — token architecture donor

**Role for ACE:** serious token and cross-platform system architecture.

SEED uses one token source across React, iOS, Android, Lynx and Figma, with separate styled/headless packages, token/recipe engines, CLI and Figma integration.

**Take:**
- separation of definitions, CSS output and framework components;
- token schema architecture;
- recipes/variants;
- Figma extraction/sync concept;
- styled vs headless split;
- disciplined multi-platform naming.

**Do not take:** its consumer-product visual personality as a direct ACE skin.

**License:** Apache-2.0.

**ACE score:** 9.1 / 10.

---

## S9. `ibelick/motion-primitives` — motion donor

**Role for ACE:** restrained micro-motion after the static composition is already strong.

**Take:**
- reveal timing;
- height/layout transitions;
- text/number transitions where justified;
- hover/focus motion;
- menu/dialog transition behavior;
- reduced-motion thinking.

**Do not take:** animated text gimmicks, shimmer for ordinary headings, excessive cursor-following or movement added only to make the site look 'premium'.

**ACE rule:** motion must clarify structure or state. It must never be used to compensate for weak composition.

**ACE score:** 9.0 / 10 as a motion donor.

---

# A-tier — strong secondary donors

## A1. `radix-ui/primitives`
Excellent accessibility and interaction reference. Strong alternative/cross-check to Base UI. Use for behavior, not appearance. MIT. **8.9/10.**

## A2. `radix-ui/themes`
Useful for compact theme anatomy, semantic colors, density, radius and component consistency. Clean but too generic to define ACE by itself. MIT. **8.6/10.**

## A3. `shadcnblocks/kibo`
Useful for complex composable components that sit above base shadcn primitives. Strong for editor-like, kanban/gantt/application patterns. Keep the visual layer custom. **8.5/10.**

## A4. `heroui-inc/heroui`
Modern v3 architecture, Tailwind v4, CSS variables/OKLCH, React Aria Components, Figma parity and a large component set. Visually polished, but some of its softer/rounder product language is less institutional than ACE needs. Apache-2.0. **8.5/10.**

## A5. `mantinedev/mantine`
Very complete: 100+ core components plus forms, charts, notifications, command palette, editor, dropzone, modals and more. Excellent source for completeness and behavior; weaker as a unique visual donor because its default look is deliberately general-purpose. MIT. **8.4/10.**

## A6. `adobe/react-spectrum`
Exceptional accessibility, adaptive input behavior, internationalization and robust component architecture. React Aria is especially valuable when building custom visual components. Visually too Adobe-product-specific to drive ACE, but technically first class. Apache-2.0. **8.8/10 engineering / 7.0 visual.**

## A7. `tremorlabs/tremor`
Strong donor for charts, dashboards and data presentation. For ACE it becomes relevant in Trade Requests and future market/data sections. Avoid turning the public website into a dashboard. **8.4/10 for data UI.**

## A8. `elastic/eui`
Very mature dense-data patterns: tables, filters, selectable lists, flyouts and data-heavy application UI. Great research donor for Trade Requests; visually too Elastic-specific/dense for the main public page. **8.4/10 for application UI.**

## A9. `ariakit/ariakit`
Accessible low-level toolkit with components, styles and examples. Valuable as an interaction/a11y cross-check when we reimplement controls in custom HTML/CSS/JS. **8.5/10 engineering.**

## A10. `factorialco/f0`
A real production design system behind Factorial HR, with shared core tokens and web/mobile implementations. Strong reference for keeping token architecture coherent across surfaces. MIT. **8.3/10.**

## A11. `mondaycom/vibe`
Large production React design system with components, tokens, icons, testing/codemod tooling and Storybook ecosystem. Useful for complex form/application patterns. Visually more colorful/productive-tool oriented than ACE. **8.1/10.**

## A12. `DouyinFE/semi-design`
80+ components, 3000+ design tokens, Figma Design-to-Code/Code-to-Design, accessibility and internationalization. Technically impressive and highly systematic. Default visual language can feel enterprise-app rather than premium institutional, so use as architecture/reference rather than skin. MIT. **8.3/10.**

## A13. `arco-design/arco-design`
60+ components, extensive theme tokens, Design Lab, Figma resources and material/component reuse tooling. Excellent for theme-system study and admin/product components; not the public-site art direction. MIT. **8.1/10.**

## A14. `cloudscape-design/components` / `component-toolkit`
Cloudscape is an open system used for AWS experiences. Strong donor for dense forms, tables, filtering, information hierarchy and enterprise accessibility. The AWS-console aesthetic is too recognizable for ACE, so borrow anatomy rather than appearance. **8.2/10 for Trade Requests.**

## A15. `reshaped-ui/reshaped` headless package
Already S-tier overall, but worth explicitly calling out `@reshaped/headless`: useful if we later choose React for application UI while keeping a completely custom ACE skin. **8.8/10.**

---

# B-tier — valuable study/reference systems, not primary visual donors

## B1. `carbon-design-system/carbon`
IBM's open design system. Excellent tokens, grid, accessibility and complex enterprise patterns. Strong institutional rigor, but visually too corporate/IBM if copied directly. Use for grid/data/process discipline. **7.9/10.**

## B2. `microsoft/fluentui`
Deep production system with extensive component, theming and accessibility decisions. Useful for state anatomy and enterprise controls; not a visual direction for ACE. **7.8/10.**

## B3. `Workday/canvas-kit`
Mature design-system implementation for enterprise applications. Useful for forms, accessibility and token discipline. Too HR-enterprise in visual character for the public site. **7.6/10.**

## B4. `contentful/forma-36`
Contentful's active design system. Good content-management forms, field controls and editor patterns. Relevant later for admin-like interfaces. **7.7/10.**

## B5. `twilio-labs/paste`
Large, accessibility-oriented production system with a broad component inventory. Good component governance and token reference. Twilio is migrating documentation, so treat it primarily as a research donor. **7.6/10.**

## B6. `sumup-oss/circuit-ui`
Clean payment/product UI reference with design tokens and component patterns. Useful for form/control details, but not differentiated enough to lead ACE. **7.5/10.**

## B7. `iTwin/iTwinUI`
Polished B2B/technical design system. Useful for data-dense professional interfaces and layout discipline. **7.7/10.**

## B8. `palantir/blueprint`
Optimized for complex data-dense desktop web apps. Useful for tables, trees, menus and dense interaction patterns. Its classic desktop-tool look is wrong for the public site but valuable for functional reference. **7.5/10 for Trade Requests.**

## B9. `Tencent/tdesign`
Large enterprise design system with multi-framework implementations. Useful for coverage and enterprise interaction patterns, not for visual identity. **7.4/10.**

## B10. `swisspost/design-system`
Well-structured web-component system with pattern guidance and inclusive design. Useful because it is closer to framework-neutral web than many React-only libraries. Apache-2.0. **7.7/10 engineering.**

## B11. Nord Design System
One of the better examples of clean, calm, highly usable professional UI with strong templates and component breadth. Use as a **visual/architecture study reference only** unless licensing/usage rights are explicitly confirmed for our case. **8.4/10 visually, code reuse TBD.**

## B12. `primer/react` + `primer/primitives`
Excellent supporting references to Primer Brand for tokens and product components. For ACE, `primer/brand` is the more important visual donor; these are the engineering foundation behind it. MIT. **8.3/10.**

---

# Watchlist / niche donors

These can solve specific future problems but should not influence the main art direction:

- `chakra-ui/ark` — unstyled multi-framework accessible primitives.
- `chakra-ui/zag` — framework-agnostic component interaction logic through state machines.
- `chakra-ui/panda` — token/recipe-oriented build-time styling architecture.
- `primefaces/primereact` — extremely broad component coverage; useful when searching for edge-case controls.
- `TiendaNube/nimbus-design-system` — accessible commerce/product system.
- `ITS-HCD/nysds` — framework-light design-token/web-component reference.
- `nl-design-system/utrecht` — open standards-driven component/token architecture.
- `storybookjs/design-system` — useful Storybook/design-system packaging reference, but not visually current enough to lead ACE.
- `iTwin/iTwinUI` — technical/B2B patterns.
- `launch-ui/launch-ui` — marketing blocks; use cautiously because precomposed landing kits can quickly push us back into template aesthetics.

---

# Systems we should NOT use as the core ACE visual donor

This is not a claim that these libraries are bad. It is a fit decision for this project.

## Generic shadcn look

Avoid leaving components in default shadcn styling. It is now visually overrepresented in AI-generated interfaces: neutral cards, border-based hierarchy, ubiquitous `rounded-xl`, predictable sidebars, identical table shells and command palettes.

## "Wow-effect" component galleries as a foundation

Libraries focused on glowing borders, spotlights, text shimmer, animated backgrounds, floating particles, 3D cards and magnetic effects can provide one isolated effect, but they should **not** define the system. Otherwise ACE will look like a generated Awwwards imitation instead of a serious market institution.

Examples of patterns to treat with caution rather than as a base system:

- gradient mesh blobs;
- glassmorphism card stacks;
- animated beams connecting fake nodes;
- glowing border cards;
- marquee logo walls without content purpose;
- cursor-following spotlights;
- floating device/dashboard mockups with fake data;
- bento grids used only because they are fashionable.

## Material / Ant / classic enterprise skins as the public identity

They are robust implementation libraries, but adopting their appearance would immediately make ACE look like an off-the-shelf application rather than a designed international infrastructure brand.

---

# Recommended ACE donor architecture

## Layer 1 — Public website / brand composition

**Primary:**
- Stripe — external art-direction benchmark;
- `primer/brand` — system implementation benchmark;
- `reshaped-ui/reshaped` — modern component finish.

**Purpose:** establish page rhythm, typography, spacing, responsive grid, navigation, surface hierarchy and section composition.

## Layer 2 — Core components

**Primary:**
- `cosscom/coss`;
- `mui/base-ui`;
- selective `radix-ui/primitives`.

**Purpose:** buttons, links, inputs, selects, menus, tabs, dialog, popover, tooltip and focus behavior.

**Implementation rule:** for the current static concept we translate useful anatomy into semantic HTML/CSS rather than introducing React.

## Layer 3 — Trade Requests / data-heavy UI

**Primary:**
- `keenthemes/reui`;
- `tremorlabs/tremor`;
- `elastic/eui`;
- Cloudscape/Blueprint as functional cross-checks.

**Purpose:** form, table, filtering, pagination, sorting, responsive dense data, empty/loading/error states.

## Layer 4 — Motion

**Primary:** `ibelick/motion-primitives`.

**Purpose:** subtle transitions only after the visual composition is approved.

## Layer 5 — Design-system infrastructure

**Primary:**
- `figma/sds`;
- `figma/code-connect`;
- `daangn/seed-design`;
- `primer/primitives`.

**Purpose:** tokens, Figma variables, naming, component mapping, responsive compositions and design↔code parity.

---

# Concrete design-system shape proposed for ACE

Instead of importing a library, build an internal system with the following structure:

```text
site/
  assets/
    css/
      tokens.css
      reset.css
      typography.css
      layout.css
      utilities.css
    icons/
    images/
  components/
    button/
    navigation/
    language-switcher/
    metric/
    document-row/
    service-module/
    form-field/
    select/
    table/
    pagination/
    dialog/
  home/
  trade-requests/
    form/
    table/
```

### Token groups

- color / semantic color;
- typography;
- spacing;
- container/grid;
- radius;
- border;
- elevation;
- motion;
- breakpoint;
- z-index.

### Important visual rule

Tokens do not make a design system beautiful by themselves. The visual quality must come from **authored compositions**. Components should be quiet enough that the page art direction can carry the brand.

---

# Immediate extraction shortlist

Before another homepage redesign, study and extract the following concrete systems into an ACE design-system lab:

1. **Primer Brand:** container, grid, nav, heading scales, section spacing, CTA groups.
2. **Reshaped:** button/input/select/dialog spacing, radius hierarchy, border hierarchy, typography inside controls.
3. **Coss:** modern compact form controls, menus, popovers and neutral surface treatment.
4. **Base UI:** exact interaction and accessibility anatomy for menu/select/dialog.
5. **ReUI:** one production-grade form and one production-grade data table/filter system for Trade Requests.
6. **Figma SDS:** token naming and primitive/composition folder organization.
7. **SEED:** semantic-token/recipe separation.
8. **Motion Primitives:** only 4–6 approved motion patterns.

Then create ACE-specific tokens and rebuild the homepage from those foundations.

---

# Final recommendation

For the current ACE public-site concept, do **not** start from Mantine, Material UI, Ant, Carbon or a shadcn dashboard template.

Start from the following combination:

> **Stripe composition + Primer Brand structure + Reshaped visual discipline + Coss component finish + Base UI behavior.**

For the future Trade Requests interface:

> **ACE tokens + Base UI behavior + ReUI data/form patterns + selected Tremor/EUI data patterns.**

For the design-system workflow:

> **Figma SDS / Code Connect methodology + SEED-style token architecture.**

This gives us enough professional system depth while leaving the actual ACE art direction custom and recognizable.