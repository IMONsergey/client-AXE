# Foundation model

## What changed compared with concept v3

The previous concept used an ad-hoc set of large radii, deep shadows and decorative gradients. That is now explicitly rejected.

The new foundation is based on four ideas extracted from mature donor systems:

1. **12-column page composition** rather than freeform card placement.
2. **4px spacing rhythm** with a small, explicit scale.
3. **compact radius hierarchy** around 4 / 6 / 10px.
4. **semantic tokens** for surface, foreground, border and state instead of component-specific magic values.

## Grid

Primer Brand is the primary donor here. Its Grid implementation uses 12 columns and a 1280px max width. Its current Hero system also uses a 1280px contained grid, with 32px padding at narrower sizes and 64px on desktop. The ACE system does not copy Primer classes, but adopts the same level of structural discipline.

### ACE public grid

- 12 columns;
- `1280px` primary content max;
- `1440px` optional wide media/art-direction boundary;
- mobile gutter `20px`;
- tablet gutter `32px`;
- desktop gutter `40px`;
- internal sections align to the same global column edges unless there is a deliberate full-bleed treatment.

## Spacing

Reshaped uses a 4px base unit and increments through 4/8/12/16/20/24/28/32/36/40, with 2px and 6px for compact adjustments. This is a useful discipline because it prevents arbitrary spacing values from accumulating.

ACE keeps a 4px base rhythm and extends it for page spacing up to 160px.

### Rule

If a new spacing value is needed, first prove that the current scale cannot express the layout. Do not add values to fix a local alignment mistake.

## Radius

Reshaped's Slate theme uses 4 / 6 / 10px radii. Coss Origin uses a 10px base radius with derived smaller sizes. This confirms that modern product UI does not require 24–32px rounding everywhere.

ACE baseline:

- 4px — small controls / compact records;
- 6px — normal buttons, inputs, small surfaces;
- 10px — panels, menus, document surfaces, product UI;
- 14px — exceptional large media/product objects only;
- 999px — true pill use cases only (status, compact segmented controls, circular controls).

## Elevation

Reshaped's shadows are layered but restrained. Normal hierarchy is primarily established with borders and surface shifts, while higher elevation is reserved for overlays.

ACE has three elevation levels:

- outline — tiny separation;
- raised — genuine floating surface;
- overlay — modal/popover layer.

Page sections and normal content blocks should normally use **no shadow**.

## Colour

The brandbook values remain raw primitives. The UI adds semantic aliases rather than introducing more decorative brand colours.

### Public-site colour logic

- near-black + white carry most of the composition;
- blue is the main identity/action signal;
- red and green are used where they have a specific semantic or compositional role;
- a section does not need all three ACE colours;
- neutral surface shifts are preferred over tinted SaaS cards.

## Typography

The real type system cannot be locked until Echoes Sans and Pragmatica files arrive. Current values are layout placeholders only.

What can be fixed now:

- body copy should have controlled line length;
- Russian headings should be evaluated as Russian headings, not by copying English Stripe font sizes;
- large type is allowed only when composition supports it;
- no negative tracking so aggressive that Cyrillic looks compressed or synthetic.

## Breakpoints

Three required composition ranges:

- mobile: `< 660px`;
- tablet: `660–899px`;
- desktop: `>= 900px`.

At `>= 1280px` the design may gain wide-layout enhancements, but all functionality and hierarchy must already work at the desktop threshold.

## Motion

The Reshaped duration/easing model is used as a useful reference: fast transitions around 100–200ms, slow around 300ms. ACE adopts the same discipline but not donor implementation.

Motion is considered a state tool, not part of the visual identity by default.