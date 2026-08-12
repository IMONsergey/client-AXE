# Third-party licence handling

This directory documents how donor code may be reused. It does not replace the upstream licence files.

## Default rule

The donor library is primarily a **design-intelligence reference**. No third-party runtime code is copied into ACE automatically.

When a substantial upstream source file is copied later:

1. verify the licence of that exact repository/path at the pinned ref;
2. copy the upstream licence/copyright notice alongside the reused source when required;
3. record the upstream repository, ref and original path in `../SOURCES.md`;
4. isolate vendored/reference source from original ACE implementation;
5. do not remove attribution headers from source files.

## Current primary donors

- Primer Brand — MIT.
- Reshaped — MIT.
- Base UI — MIT.
- ReUI — MIT.
- Figma SDS — MIT.
- Coss — mixed: only `apps/origin/` and `apps/ui/` are MIT; default repository licence is AGPLv3.
- SEED — architecture is used as reference; verify the specific file/package before direct copying.

## Coss guard

This is a hard rule:

> Do not copy Coss implementation code outside `apps/origin/` or `apps/ui/` into ACE unless a separate licensing decision is explicitly made.

## Brand assets

Open-source code licences do not imply permission to reuse donor trademarks, logos, illustrations, proprietary imagery or fonts. None of those are part of the ACE donor library.

## ACE source ownership

Original files under `design-system/foundation/`, `patterns/`, `decisions/` and donor-analysis notes are ACE project work. They synthesise design principles and are not intended to reproduce a donor theme verbatim.