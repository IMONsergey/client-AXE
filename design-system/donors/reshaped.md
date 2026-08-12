# Donor — Reshaped

Repository: `reshaped-ui/reshaped`

Role: **primary component-proportion and token donor**.

Licence: MIT.

## Why it matters for ACE

Reshaped is useful because its visual quality comes from disciplined tokens and proportions rather than large decorative effects. It provides a strong counterexample to generic “premium SaaS” styling.

## Source paths reviewed

- `packages/reshaped/src/themes/slate/theme.css`
- `packages/reshaped/src/themes/slate/theme.json`
- `packages/reshaped/src/components/`
- `packages/theming/`

## Extracted system facts

### Spacing

The Slate theme uses a **4px base unit** with 4/8/12/16/20/24/28/32/36/40px increments plus compact 2px and 6px steps.

ACE adopts the same rhythm principle and extends it for page-scale spacing.

### Radius

Slate defines:

- small: 4px;
- medium: 6px;
- large: 10px.

This is a direct reason to eliminate the previous 20–30px generic panel radii from ACE.

### Typography hierarchy

The theme separates headline, featured, body and caption roles instead of improvising font sizes per component.

The exact donor font sizes are not copied blindly because ACE uses Russian text and later receives Echoes Sans / Pragmatica, but the **role-based hierarchy** is adopted.

### Motion

Reshaped defines:

- rapid 100ms;
- fast 150ms;
- medium 200ms;
- slow 300ms;
- standard / accelerate / decelerate easing roles.

ACE uses the same type of semantic motion scale.

### Breakpoints

The donor theme carries viewport thresholds around 660 / 900 / 1280. This maps unusually well to ACE's required mobile/tablet/desktop model and is used as the internal layout baseline.

### Semantic colour architecture

Reshaped distinguishes:

- background;
- border;
- foreground;
- faded/highlighted states;
- critical/warning/positive/neutral roles;
- disabled roles;
- page/elevation surfaces.

ACE adopts this semantic architecture instead of creating per-component colours.

### Elevation

Reshaped uses small multi-layer shadows for outline, raised and overlay states. It does not require every surface to float.

ACE therefore treats shadow as a real elevation state, not a page decoration.

## ACE rules derived from Reshaped

1. 4px spacing base.
2. 4/6/10px normal radius scale.
3. semantic token names over component-specific magic values.
4. borders and neutral surface shifts before shadows.
5. component states must be explicit: default, hover, active, focus, disabled, invalid where relevant.
6. public-site visuals should remain calmer than application UI.

## What not to import

- Reshaped brand colour;
- donor font stack as final production typography;
- complete donor theme CSS;
- React dependency for the static public concept;
- donor components solely because they already exist.

## Design test

A component inspired by Reshaped should feel compact, precise and unsurprising. If it looks “designed” primarily because of a large radius, gradient or heavy shadow, the donor has been misunderstood.