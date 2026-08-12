# Donor — Coss

Repository: `cosscom/coss`

Role: **compact modern control and neutral UI donor**.

## Licence guard — mandatory

Coss uses mixed licensing:

- repository default: AGPLv3;
- `apps/origin/`: MIT;
- `apps/ui/`: MIT.

Only code under the two MIT directories may be directly copied into ACE without a separate licensing decision. Everything else is reference-only.

## Source paths reviewed

- `LICENSING.md`
- `apps/origin/app/globals.css`
- `apps/origin/components/`
- `apps/ui/components/`
- `apps/ui/registry.json`

## Why it matters for ACE

Coss is useful because it demonstrates a modern product surface that is visually restrained: compact controls, neutral background hierarchy, low radii, clean borders, clear state tokens and very little decorative chrome.

This is a good correction to the previous ACE concept where “modern” was expressed through rounded glass panels and blurred colour.

## Extracted visual rules

### Neutral-first UI

Origin's base theme is dominated by white and zinc-like neutrals. Colour enters through semantic/action roles rather than decorative surfaces.

**ACE translation:** Trade Requests and small homepage controls should be mostly neutral; ACE blue is the action signal, not the wallpaper.

### Radius

Origin uses a 10px base radius and derives smaller and larger sizes from it.

**ACE translation:** controls and menus should remain around the 4–10px range. Large pill shells are exceptions.

### Semantic roles

The theme separates:

- background / foreground;
- card / popover;
- primary / secondary;
- muted / accent;
- destructive;
- border / input / ring;
- sidebar states.

ACE uses the same separation idea while keeping its own values.

### Copy-and-own mentality

Coss UI is useful as a source library to inspect, copy selectively where the MIT boundary allows, then adapt rather than lock ACE into a monolithic package skin.

## Components worth studying

For the public site:

- navigation anatomy;
- button/input proportions;
- menus and popovers;
- compact tabs/segmented controls when genuinely needed.

For Trade Requests:

- form controls;
- command/search patterns;
- mobile navigation patterns;
- feedback states.

## What not to import

- Tailwind classes into the final static concept merely because the donor uses Tailwind;
- Zinc palette as ACE branding;
- generic shadcn-like page layouts;
- sidebar/dashboard conventions on the public homepage;
- anything outside MIT directories.

## Design test

Coss influence should make ACE controls quieter and more exact. If it turns the public site into an application shell or a shadcn demo, it is being used at the wrong layer.