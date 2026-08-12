# 19 — Visual and responsive QA v7

> Status: passed before publication.

## Method

The final static HTML/CSS was rendered with Chromium/Playwright at the three project breakpoints required by the release gate. The review was performed on screenshots, not only on source code.

Tested widths:
- 1440px desktop;
- 1024px tablet/small desktop;
- 390px mobile.

## Measured overflow

Final refinement pass:

| Viewport | `clientWidth` | `scrollWidth` | Horizontal overflow |
|---:|---:|---:|---|
| 1440 | 1440 | 1440 | none |
| 1024 | 1024 | 1024 | none |
| 390 | 390 | 390 | none |

Approximate document heights in the final pass:
- desktop: 2928px;
- 1024px: 3015px;
- mobile: 3534px.

## Defects found and corrected

### 1. Previous header wrap
Old v6 allowed the full navigation to wrap across two lines. v7 uses a one-line desktop header and switches to a disclosure navigation before the available width becomes unsafe.

### 2. Hero text clipping
Old v6 let decorative geometry occupy/cover text space. v7 assigns text and signature visual to independent grid regions. The hero has no negative positioning over the copy.

### 3. Generic multicolour diagonal visual
Removed completely. Replaced with the content-derived `ЕАЭС+ / БРИКС+ / ШОС` regional register.

### 4. Generic oversized feature boxes
Removed completely. The three directions are now editorial infrastructure rows with real text carrying the hierarchy.

### 5. Fake chart resemblance in direction rows
An intermediate v7 draft contained small decorative horizontal bars. Screenshot review showed that they could be read as invented charts. They were removed; only restrained vertical ACE-colour markers remain.

### 6. Mobile horizontal overflow
The first mobile render showed a small (~9px) overflow. The root layout was corrected with clipping at the document boundary and responsive sizing was rechecked. Final `scrollWidth` equals `clientWidth` at 390px.

## Visual gate results

### Desktop 1440
- header stays one row;
- official logo zone, navigation and actions have independent space;
- headline has deliberate wrap and is fully visible;
- region register is visually strong but cannot overlap copy;
- proof strip is secondary to the thesis;
- about section has enough whitespace to reset the eye;
- dark directions block provides one controlled contrast event;
- countries/document read as institutional registers rather than UI cards.

Result: pass.

### 1024
- full nav is replaced before wrap;
- hero remains split, with reduced title/region scale;
- all content remains inside viewport;
- country register recomposes to four columns.

Result: pass.

### Mobile 390
- logo, RU/EN and menu fit on one header row;
- header Trade Requests button is removed at this size, while the primary hero CTA remains visible and the menu retains Trade Requests;
- hero becomes copy → regional register → proof sequence;
- no off-canvas text;
- direction rows become stacked text blocks;
- country register becomes two columns;
- document record stays legible without decorative arrow.

Result: pass.

## Accessibility / technical checklist

- semantic `header`, `nav`, `main`, `section`, `article`, `ul` elements;
- visible `:focus-visible` treatment;
- links remain links, no clickable generic divs;
- official logo has explicit intrinsic dimensions and alt text;
- decorative regional field is hidden from assistive technology because the same terms already occur in body copy;
- number presentation uses tabular figures;
- headings use balanced text wrapping where supported;
- body uses pretty wrapping where supported;
- animations are limited to local control transitions and suppressed under `prefers-reduced-motion`;
- no `transition: all`, backdrop filter, animated blur, scripted layout measurement or JavaScript runtime.

## Browser-risk review

The implementation relies on CSS Grid/Flexbox, `<details>`, CSS custom properties and modern text-wrap enhancement. Core layout remains valid if `text-wrap: balance/pretty` is unsupported. No experimental rendering API is required.

Target: current Chrome, Firefox, Safari and Edge.

## Publication gate

No known visual blocker remains from the defined gate set:
- clipped text: none;
- accidental horizontal scroll: none;
- wrapped desktop navigation: none;
- CTA/language pushed outside viewport: none;
- decorative object over copy: none;
- fake data graphic: none;
- large meaningless card surfaces: none.

Approved for main/publication.
