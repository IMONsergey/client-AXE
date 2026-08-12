# ACE Design Gates

> This is a release gate for design, not optional guidance.

## Gate 0 — Content lock

Use only supplied/approved content. If a design requires invented copy to work, the design is wrong.

## Gate 1 — Subject grounding

Before layout work, write the following internally:

- **Subject:** international commodity/futures exchange association and market infrastructure.
- **Audience:** exchange leadership, members, prospective members, professional market participants and institutional stakeholders.
- **Homepage job:** establish authority, explain the association's infrastructure role, prove scale and expose Trade Requests without pretending to be a trading terminal.
- **Subject materials:** exchange infrastructure, market access, institutional documents, standards, cross-border participation, price/data systems, precise registers and operational protocols.

A visual device must be traceable to these materials or to the ACE brand. Otherwise it is decoration.

## Gate 2 — Art-direction sheet before code

For every candidate direction define:

### Palette
4–6 roles max. Do not show all corporate colours simply because they exist.

### Typography
- display role;
- body role;
- utility/data role if necessary;
- target line lengths and scale relationships.

### Grid
- container width;
- column logic;
- section rhythm;
- where asymmetry is intentional.

### Signature
Exactly one memorable visual mechanism. State why it is specifically appropriate for ACE.

### Restraint
List what the direction deliberately does **not** use.

## Gate 3 — Generic-design rejection

Reject before code if the concept's identity is mainly any of these:

- diagonal/aurora gradient;
- big KPI numbers over decorative colour;
- Bento as the visual idea;
- feature cards with coloured rules;
- fake product dashboard;
- random network topology;
- glowing grid/beam/node system;
- editorial hairlines without a subject-specific concept;
- dark mode + one bright accent as the entire identity;
- oversize type without a compositional reason.

## Gate 4 — First viewport only

Implement header + hero + immediate proof only.

Do not continue the page until this first viewport has a coherent hierarchy and a valid responsive plan.

## Gate 5 — Screenshot review

Minimum captures:

- 1440px;
- 1024px;
- 390px.

Check the screenshot, not just the DOM/CSS.

Automatic rejection conditions:

- clipped or off-canvas text;
- accidental horizontal scroll;
- nav wrapping that changes hierarchy;
- CTA or language controls pushed out of view;
- decorative object covering/competing with copy;
- weak contrast;
- headline line breaks that look accidental;
- generic template resemblance;
- large empty surfaces with no information role;
- every section using the same container pattern.

## Gate 6 — Independent critique

Apply the substance of:

1. Anthropic Frontend Design self-critique;
2. Impeccable `critique`;
3. Impeccable `layout` / `typeset` / `distill` where relevant;
4. ibelick `baseline-ui` rules adapted to ACE;
5. project anti-pattern rules.

At least one issue must be actively searched for in each category:

- hierarchy;
- composition;
- typography;
- colour;
- spacing;
- component fit;
- subject specificity;
- responsive behavior.

## Gate 7 — Extend the language

Only now build About, strategic directions, countries and document.

Do not introduce a second art direction further down the page. The same signature grammar must extend or deliberately quiet down.

## Gate 8 — Technical audit

Use Vercel Web Interface Guidelines plus the project's frontend requirements:

- semantics;
- focus;
- overflow;
- keyboard behavior;
- image sizing;
- long text;
- reduced motion;
- touch targets;
- browser/responsive behavior.

## Gate 9 — Final screenshot strip

Before publish, keep visual evidence for:

- full-page desktop;
- full-page mobile;
- header at all three widths;
- hero at all three widths.

If screenshots have not been reviewed, the design is not ready to show.

## Gate 10 — Publish

Only publish the branch after visual and technical gates pass. Publishing is not a QA method.