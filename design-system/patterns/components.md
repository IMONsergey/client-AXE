# Pattern — components

## Component philosophy

ACE components are built from semantic need, not from a catalogue.

A reusable component should exist when at least one of these is true:

- the interaction repeats;
- the visual anatomy repeats with the same meaning;
- accessibility behaviour is non-trivial;
- the client CMS/backend will need a stable integration boundary.

Do not turn every visual group into a component.

## Primitive categories

### Actions

- button;
- text link;
- compact icon action only where an icon meaning is unambiguous.

### Inputs

Reserved mainly for Trade Requests:

- text input;
- textarea;
- select/combobox;
- checkbox/radio;
- date/file controls if the real form requires them.

### Information

- status;
- document record;
- metric;
- table cell patterns;
- validation/error message.

### Navigation

- header link;
- language switcher;
- mobile navigation trigger/content;
- pagination.

## Size discipline

Use a small number of heights/sizes. Do not create subtly different controls for every page.

Initial target ranges:

- compact: 32–36px;
- default: 40–44px;
- prominent public CTA: 44–48px.

Values are provisional until visual testing, but controls should not grow to 52–60px by default merely to look premium.

## Radius discipline

Use foundation tokens:

- 4px compact;
- 6px normal;
- 10px panels/menus;
- 14px exceptional large media surface;
- full pill only when the control's semantics warrant it.

## Border discipline

Default hierarchy:

1. no boundary if whitespace is enough;
2. subtle 1px border;
3. background shift;
4. shadow only for genuine elevation.

## Focus

Every keyboard-focusable control must have an obvious focus state that is not communicated by colour alone.

Do not remove browser focus without replacing it with a tested visible focus treatment.

## Disabled states

Disabled means unavailable, not merely lower opacity. It must remain legible enough to understand what is unavailable while clearly separating from enabled controls.

## Hover states

Hover changes should be small and causal:

- colour/background change;
- border change;
- underline/arrow movement where appropriate.

Do not lift every card by several pixels. Do not add glowing halos.

## Icons

Icons are functional, not decoration.

- use a consistent stroke/fill family;
- avoid colourful circular icon badges as a default feature-card motif;
- icon-only actions require accessible names;
- do not invent iconography for content that works better as typography.

## Surface hierarchy

### Page surface

Normally white or near-white.

### Subtle section surface

Used to create chapter separation, not to wrap every section.

### Raised surface

Popover/menu/dialog or a deliberate product/document object.

### Strong surface

Near-black or ACE-colour surface used sparingly for contrast and institutional/product emphasis.

## Component review questions

Before accepting a component ask:

- Is the boundary necessary?
- Is the radius too large?
- Could the shadow be replaced with a border?
- Does the component still look correct with longer Russian text?
- Does it have a deliberate mobile state?
- Is any text invented?
- Would this component still make sense without the donor library name attached to it?

If not, redesign.