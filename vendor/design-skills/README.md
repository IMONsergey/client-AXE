# Pinned design sources

This directory contains Git submodules pinned to the exact source revisions used in the ACE v7 design audit. They are research / agent-design tooling, not runtime dependencies of the public website.

## Included

- `impeccable` — `pbakaus/impeccable` @ `ae388ac58fb33aade50fc47e2be07c3192dcaabd` (Apache-2.0)
- `ui-skills` — `ibelick/ui-skills` @ `146fcd0b34fca2d80333b120d67f5009ccf58b28` (MIT)
- `ui-ux-pro-max` — `nextlevelbuilder/ui-ux-pro-max-skill` @ `97eb2a20032f0833e3d317162208a60385b0f96e` (MIT)
- `style-dictionary` — `style-dictionary/style-dictionary` @ `2b03351d3d52399203deeaf231b3831c1f5fd707` (Apache-2.0)

Anthropic Frontend Design and Vercel Web Interface Guidelines are referenced/pinned in `design-system/skills/sources.json` and the audit docs; whole upstream monorepos are intentionally not vendored because only one small skill/rule source is relevant.

## Rule

Do not import these repositories into the public runtime merely because they exist here. Their role is to give designers/agents a reproducible evidence base. Production HTML/CSS remains native ACE code.
