# Donor — Primer Brand

Repository: `primer/brand`

Role: **primary public-site composition donor**.

Do not use Primer as a skin. Use it to understand how a mature brand system structures pages.

## Why it matters for ACE

Primer Brand is specifically built for GitHub marketing websites and digital brand experiences. This makes it more relevant to ACE's public site than a normal application component library.

The useful lesson is that strong branded pages are built from a limited set of layout rules, not an unlimited set of cards.

## Source paths reviewed

- `packages/react/src/Grid/Grid.module.css`
- `packages/react/src/Hero/Hero.module.css`
- `packages/react/src/Hero/`
- component catalogue under `packages/react/src/`

Current captured ref is recorded in `../SOURCES.md`.

## Extracted layout rules

### Grid

Current Primer Grid:

- 12 columns;
- maximum width 1280px;
- responsive span/start controls;
- optional full-width mode;
- explicit gutter token;
- nested grids reset their own outer padding/margin.

**ACE translation:** use a stable global 12-column page grid and let section compositions span it deliberately.

### Hero

Current Primer Hero source demonstrates:

- contained grid max width 1280px;
- narrow padding 32px and desktop padding 64px in gridline layouts;
- media max width around 1176px;
- heading max width around 924px;
- description max width around 600px;
- normal action row starts around 28px after the description;
- breakpoint around 34rem for small and around 63.25rem for desktop refinements;
- gridline variants use structural borders rather than floating card shells;
- the expressive hero variant separates heading and body into distinct grid columns with a real divider.

The exact values are not sacred for ACE. The valuable part is the **relationship** between type, grid, rules and media.

## Components worth studying later

- `Hero` — composition, not skin;
- `Grid` — page system;
- `River` / `RiverAccordion` — alternating explanatory sections;
- `CTABanner` — strong action without excessive decoration;
- `Button` / `ButtonGroup` — action hierarchy;
- `ComparisonTable` — structured comparison pattern;
- `AnchorNav` — long institutional pages;
- `FAQ` — dense information without card spam.

## ACE rules derived from Primer

1. Public pages should share one global grid.
2. Section edges, dividers and baselines are allowed to be visible.
3. Large media/product surfaces can be full-bleed inside a structured section.
4. Hero copy and hero media should be compositionally related, not two independent cards.
5. Page rhythm should be controlled by section anatomy rather than one-off margins.
6. Responsive behaviour changes composition; it does not merely scale it.

## What not to import

- GitHub palette;
- Mona/GitHub illustrations;
- GitHub typography branding;
- GitHub-specific cards or product metaphors;
- bento simply because Primer contains a Bento component.

## Design test

If the ACE homepage can be described as “a stack of cards inside a 1280px container”, Primer has been misunderstood.

Correct Primer influence should instead be visible in alignment, section rhythm, confident typography, rules and deliberate media placement.