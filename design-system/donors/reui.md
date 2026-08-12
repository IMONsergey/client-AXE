# Donor — ReUI

Repository: `keenthemes/reui`

Role: **primary Trade Requests data/form donor**.

Licence: MIT.

## Why it matters for ACE

The public site and Trade Requests have different density requirements. ReUI is not the homepage skin. It is the donor for the operational interface where forms, filters, tables and task completion matter.

## High-value patterns

- DataGrid;
- sorting/filtering;
- pagination;
- selection;
- empty/loading states;
- column sizing and pinning;
- virtualised rows/columns when needed;
- form controls;
- input groups;
- date controls;
- file upload;
- stepper/progress flows.

## RU / EN relevance

Current ReUI DataGrid work includes component-scoped i18n overrides covering sorting, filtering, pagination, empty/loading states, pinning, selection and accessibility text. This is directly relevant to the project rule that the same table/form structure must work on RU and EN pages.

ACE should follow the same principle:

- one structural component;
- locale changes content strings, not markup;
- explicit component copy can override shared locale defaults;
- accessibility labels are translated alongside visible controls.

## Table architecture to preserve

When the real announcement-table schema arrives, design around:

1. clear column hierarchy;
2. stable horizontal alignment;
3. sorting indicators with accessible names;
4. filters separated from table content;
5. pagination and result count as a predictable footer/control region;
6. empty, loading, error and no-filter-results states;
7. keyboard focus visibility;
8. mobile strategy defined per column importance rather than simply shrinking the table.

## Form architecture to preserve

- visible labels by default;
- predictable input heights and spacing;
- helper/error text tied to the field;
- error summary for long forms if validation requires it;
- groups/steps based on actual task logic, not ornamental cards;
- primary action position consistent across RU/EN;
- no placeholder-only labelling.

## What not to import

- ReUI page shell into the public website;
- default dashboard aesthetics;
- random charts;
- components with fake data;
- fields or table columns before client content arrives;
- React/TanStack dependency in the static public concept.

## Design test

ReUI influence should make Trade Requests feel calm, efficient and professional. It should not make ACE look like an admin template.