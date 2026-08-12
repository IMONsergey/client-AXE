# ACE Design Skill Stack

This directory defines the non-component layer that must govern future ACE design work.

The previous iterations proved that high-quality component donors do not create high-quality art direction automatically. Components are implementation tools. Design requires a separate process for subject grounding, visual concept selection, critique and screenshot QA.

## Mandatory reading order before visual work

1. `../../docs/10-STRICT-PRODUCTION-RULES.md`
2. `../DESIGN-INTELLIGENCE.md`
3. `ACE-DESIGN-GATES.md`
4. `../../docs/16-DESIGN-SKILLS-AND-TASTE-AUDIT.md`
5. relevant public/application patterns

## External skill priority

### Art direction

1. Anthropic Frontend Design — source-specific visual identity, hero thesis, typography, one signature idea, two-pass plan/critique workflow.
2. Impeccable — shape → critique → targeted corrections → polish, with screenshot/live review and deterministic anti-slop rules.

### Baseline

3. ibelick UI Skills / baseline-ui — anti-slop guardrails, component consistency, motion restraint, accent restraint.

### Technical quality

4. Vercel Web Interface Guidelines — accessibility, overflow, focus, semantics, responsive/touch/performance checks.

### Reference intelligence

5. UI UX Pro Max — searchable UX/style/typography/palette knowledge base only. Never let its style catalogue choose ACE's visual identity automatically.

## Source repository map

- `anthropics/claude-plugins-official/plugins/frontend-design/skills/frontend-design/`
- `pbakaus/impeccable`
- `ibelick/ui-skills`
- `vercel-labs/agent-skills/skills/web-design-guidelines/`
- `vercel-labs/web-interface-guidelines`
- `nextlevelbuilder/ui-ux-pro-max-skill`

## Non-negotiable principle

A component name is not a design concept.

`Hero + Bento + River`, `cards + gradient`, `dark fintech`, or `12-column grid` describe implementation/layout mechanisms. A valid ACE concept must first explain the specific institutional idea and why its visual form belongs to ACE.

## Required evidence before publishing

Every concept shown to the client must have been visually reviewed from screenshots at 1440px, 1024px and 390px. If the environment can render more widths, add them; these three are the minimum gate.