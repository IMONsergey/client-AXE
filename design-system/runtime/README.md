# ACE Runtime Component Kit

This directory is the native HTML/CSS component layer used by ACE templates.

It exists specifically so future design work is assembled from a tested system instead of re-inventing one-off CSS for every concept.

## Files

- `core.css` — reset, focus, typography and page-level foundations.
- `layout.css` — container, 12-column grid, section rhythm and layout primitives.
- `primitives.css` — logo, navigation links, language control, buttons, metrics, document records, capability rows and country register.
- `compositions.css` — header, hero, proof, about, capability-system and country/document compositions.

## Donor mapping

### Primer Brand

Used for page anatomy rather than visual skin:

- 1280px contained page system;
- 12-column grid;
- hero variants as explicit compositions;
- gridline hero logic;
- clear separation between content and media/surface regions;
- river/structured-row logic instead of automatic feature cards.

### Reshaped

Used for system discipline:

- 4px base spacing rhythm;
- compact radius hierarchy;
- semantic color roles;
- restrained elevation;
- short motion durations and predictable easing.

### Coss (MIT paths only)

Used for compact control proportions and neutral component treatment:

- buttons around 40–44px rather than oversized pills;
- restrained borders/radii;
- simple hover/focus feedback;
- controls that remain visually secondary to page hierarchy.

No code is taken from Coss paths outside `apps/origin/` and `apps/ui/`.

### Base UI

Used as behaviour/accessibility reference. The public concept is native HTML, so Base UI is not a runtime dependency.

### ReUI

Reserved for the real Trade Requests form/table layer. It is intentionally not forced into the public homepage because the supplied prototype does not contain the required form fields or table columns.

## Rule

New ACE templates must use these primitives/compositions first. A new one-off component is allowed only when the existing system cannot represent the actual content or interaction.

The current `concept-lab/index.html` is the first implementation built on this runtime kit.
