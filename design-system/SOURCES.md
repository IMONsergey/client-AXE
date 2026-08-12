# Donor sources and licence boundaries

Captured for ACE design-system research on **2026-08-12**.

This file is the source-of-truth for what may be studied, distilled or directly reused. Direct code reuse is optional; the default is to extract design rules and reimplement them as ACE HTML/CSS.

| Donor | Captured ref | Role | Licence / reuse rule | High-value source paths |
|---|---|---|---|---|
| `primer/brand` | `main` / `424cc8441487033d21dbb4a3e47064c73caed7d7` | public-site composition | MIT; preserve notice for substantial copied code | `packages/react/src/Hero/`, `Grid/`, `River/`, `CTABanner/`, `Button/` |
| `reshaped-ui/reshaped` | `canary` / `1bb445b6f442071694f7aae5e1d3f0bb8eda2feb` | tokens, surfaces, component proportions | MIT | `packages/reshaped/src/themes/slate/theme.css`, `packages/reshaped/src/components/`, `packages/theming/` |
| `cosscom/coss` | `main` | compact modern controls | **mixed licence**: default AGPLv3; only `apps/origin/` and `apps/ui/` are MIT | `apps/origin/`, `apps/ui/`; do not copy code from other directories into ACE |
| `mui/base-ui` | `master` | interaction/accessibility primitives | MIT | primitive implementations and tests; visual styling is intentionally not copied |
| `keenthemes/reui` | `main` | Trade Requests forms/data grid | MIT | DataGrid, filters, pagination, form controls, Base UI/Radix variants |
| `figma/sds` | `main` | Figma ↔ code architecture | MIT | `src/ui/`, `src/figma/`, `src/stories/`, `src/theme.css`, `figma.config.json`, token scripts |
| `daangn/seed-design` | `dev` | token/recipe architecture | verify package licence before direct source copy; use architecture primarily | `packages/design-token/`, `packages/css/`, `packages/react-headless/`, `packages/react/`, `packages/figma/` |
| `shadcn-ui/ui` | current main | copy-and-own source organisation | use architecture only; do not inherit default visual skin | registry/source ownership patterns |
| `tremorlabs/tremor` | current main | data visualisation | verify current licence before direct source copy | chart/table patterns only |
| `elastic/eui` / `cloudscape-design/components` | current main | enterprise data/form references | reference anatomy; verify licence on copied files | tables, filters, form states, density |
| `ibelick/motion-primitives` | current main | selective motion reference | verify licence before direct source copy | only low-key state/reveal motion |

## Verified licence facts

### Reshaped

`LICENSE.md` is MIT.

### Base UI

The repository README states the project is MIT and describes Base UI as an **unstyled UI component library for building accessible user interfaces**. That makes it a behaviour donor rather than a visual donor.

### ReUI

`LICENSE.md` is MIT (Keenthemes Inc., 2025).

### Coss

`LICENSING.md` explicitly states:

- repository default: AGPLv3;
- `apps/origin/` and `apps/ui/`: MIT.

Therefore **no Coss source outside those two MIT directories may be copied into ACE without a separate licensing decision**.

## Copy policy

### Allowed by default

- internal notes describing spacing, anatomy, responsive behaviour and component states;
- original ACE tokens derived from observations across multiple systems;
- links to exact donor source paths;
- small reference snippets with attribution where useful;
- direct reuse from clearly permissive files when it materially saves work and the licence notice is preserved.

### Not allowed by default

- vendoring an entire donor repository;
- importing a donor package only to obtain its visual appearance;
- foreign logos, brand illustrations, fonts, screenshots or copy;
- Coss AGPL source outside `apps/origin/` and `apps/ui/`;
- copying a complete donor theme and calling it ACE;
- copying shadcn default visual styling.

## Why this is curated instead of wholesale vendoring

The production requirement is semantic HTML5 + clean CSS and future CMS portability. Pulling several React design systems into runtime would create the opposite result: dependency weight, conflicting visual assumptions and a component-demo aesthetic. The useful material is the **design logic**: dimensions, hierarchy, grid, tokens, states and information density.

The repository therefore stores a curated design-intelligence layer rather than seven unused third-party applications.