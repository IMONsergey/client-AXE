# 15 — Concept Lab v6: direct donor rebuild

## Why v5 was rejected

v5 changed code architecture more than visual design. The page still looked materially similar because the runtime layer was re-authored internally instead of physically grounding the concepts in donor component anatomy.

## v6 rule

The public concept lab now uses donor-derived component CSS directly:

- `design-system/vendor/primer-brand/components.css`
  - Grid
  - expressive/gridline Hero anatomy
  - Bento anatomy
  - River anatomy
- `design-system/vendor/reshaped/button.css`
  - Button sizing, transition, radius and interaction anatomy
- `design-system/vendor/coss-origin/controls.css`
  - compact neutral control proportions from MIT-covered Origin/Coss source paths

ACE tokens still own colour, spacing, typography proxy and brand identity.

## Five concepts

All five keep the exact prototype content but now use materially different donor compositions:

1. Stripe-led diagonal field + Primer Bento.
2. Primer 2026 expressive gridline Hero + River system.
3. Dark infrastructure surface + Primer Bento.
4. Editorial institution + Primer Grid/River.
5. Contained product surface + donor controls and shared grid.

## Content lock

No new visible marketing copy, KPI, dashboard data, English micro-labels or product labels were introduced.

## Licensing

Primer Brand and Reshaped are MIT. Coss usage is restricted to the upstream MIT-covered `apps/origin/` / `apps/ui/` boundary already documented in the repository.
