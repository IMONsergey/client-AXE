# Donor — Figma Simple Design System

Repository: `figma/sds`

Role: **design ↔ code architecture donor**.

Licence: MIT.

## Why it matters for ACE

Figma SDS explicitly demonstrates how Figma Variables, Styles, Components and Code Connect can coexist with a responsive codebase. It is not important because of its visual style; it is important because it shows how a design system remains one system across Figma and implementation.

## Architecture worth adopting

SDS separates code into:

- `compositions/` — arrangements of primitives into responsive patterns;
- `layout/` — structural layout components that may not have a direct Figma component;
- `primitives/` — irreducible UI components;
- `providers/` — shared context/configuration;
- `hooks/` — behaviour helpers;
- `icons/`;
- `utils/`.

Figma mappings and Storybook stories mirror this categorisation.

## ACE translation

The future ACE system should keep the same separation even if the first public concept remains plain HTML/CSS:

```text
ACE token → primitive → composition → page template
```

Examples:

- token: border / spacing / colour;
- primitive: Button / Field / Status / Document link;
- composition: Site header / Proof rail / Application filter bar;
- template: Homepage / Trade Requests form / Announcement table.

## Tokens

SDS includes tooling that reads Figma Variables/Styles and writes a code theme file, plus code-syntax mapping back to Figma.

For ACE this means the eventual goal is not a manually duplicated Figma palette and CSS palette. The same semantic token names should exist on both sides.

## Code Connect

SDS uses Code Connect for both primitives and compositions. It also uses URL substitution in `figma.config.json` so component mappings can be reused against duplicated/changed Figma files.

When the ACE Figma library is created, this is the preferred methodology:

1. map ACE Variables to CSS semantic tokens;
2. connect reusable components to their real implementation;
3. keep component documentation beside source;
4. avoid generated Dev Mode code as the source of truth.

## What not to import

- SDS visual theme as ACE styling;
- React runtime into the static concept just for parity;
- placeholder images/icons;
- Figma-specific scripts before an ACE Figma system actually exists.

## Design test

If a future Figma component and its production equivalent diverge in naming, states or token semantics, the system architecture has failed even if both look similar.