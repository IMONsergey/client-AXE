# Pattern — Trade Requests

> The actual field labels, table columns and business states must come from the client. Do not invent them during design-system work.

## Purpose

Trade Requests is operational UI. Its quality is judged by clarity, speed, accessibility and information hierarchy rather than by public-site spectacle.

Primary donor: ReUI. Behaviour cross-check: Base UI. Enterprise cross-checks: Cloudscape / EUI when a concrete edge case requires them.

## Shared RU / EN architecture

One structural implementation must serve both locales.

- no duplicate RU/EN markup trees;
- strings come from locale/content data;
- layout must tolerate Russian labels being materially longer than English labels;
- no fixed-width controls whose text clips in one language;
- accessibility labels are localised too;
- sort/filter/pagination copy belongs to the same i18n system as visible page content.

## Form template

Keep the application form independent from the homepage.

Recommended future structure:

```text
form
├── form header
├── field group
│   ├── label
│   ├── control
│   ├── helper text (optional)
│   └── error text (conditional)
├── …
└── actions
```

### Rules

- labels are persistent;
- placeholders are examples/hints only, never labels;
- validation appears next to the field and, for long forms, may also be summarised at the top;
- required/optional semantics are consistent;
- fields are grouped by business meaning rather than by equal card size;
- form width is controlled for scanning/readability;
- mobile keeps the same logical order;
- primary action is obvious but not oversized.

## Announcement table template

Keep the table independent from the homepage and form.

Expected composition once real columns arrive:

```text
section
├── filter/search controls
├── table status/result count
├── data table
└── pagination
```

### Table rules

- column importance determines responsive behaviour;
- numeric/date/status columns align consistently;
- sorting is visible and keyboard accessible;
- filters have clear active states;
- selected filters can be removed without resetting unrelated state;
- loading does not cause violent layout shifts;
- empty and no-results states are distinct;
- horizontal scroll is an explicit fallback, not an accidental overflow bug;
- sticky/pinned columns are considered only if the real data density warrants them;
- virtualisation is an implementation optimisation, never a visual requirement.

## State inventory

Before implementation, design at least:

- default;
- hover;
- focus;
- active/selected;
- disabled;
- invalid;
- loading;
- empty;
- no filtered results;
- successful submit;
- submit error.

Do not postpone state design until development.

## Density

Trade Requests should be denser than the public site, but still calm.

Use:

- compact spacing scale;
- 4–10px radii;
- subtle borders;
- neutral surfaces;
- ACE blue for primary action/selection;
- red only for actual destructive/error state or approved brand use;
- green only for actual positive/success state or approved brand use.

## Forbidden

- fake market tickers;
- fake chart data;
- dashboard KPI cards unrelated to the task;
- glass panels;
- enormous empty whitespace around work controls;
- decorative gradient sidebars;
- duplicated RU/EN components;
- invented fields/columns;
- mobile table reduced by shrinking font to unreadable sizes.