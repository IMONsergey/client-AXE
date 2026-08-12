# Secondary donors

These systems are useful cross-checks, but they do not define ACE's primary public visual language.

## `shadcn-ui/ui`

**Use:** copy-and-own source organisation, registry model, component boundaries.

**Do not use:** default shadcn visual skin. No automatic neutral-card/pill/sidebar aesthetic.

The project is valuable as an engineering distribution model, not as ACE art direction.

---

## Radix / React Aria / Ariakit

**Use:** interaction and accessibility cross-checks alongside Base UI.

Questions to verify:

- focus movement;
- keyboard semantics;
- modal layering;
- menu/select behaviour;
- touch behaviour;
- accessible naming;
- reduced-motion handling.

**Do not use:** introduce multiple primitive frameworks into one production interface without a clear architecture.

---

## `tremorlabs/tremor`

**Use:** data visualisation and compact metric presentation if real approved market data appears later.

**Do not use:** dashboard shell, decorative charts, fake time series or public-site styling.

A chart exists only when the client has real data that is better understood visually than as text/table.

---

## `elastic/eui`

**Use:** dense data-table, filter and enterprise application anatomy as a reference for Trade Requests.

**Do not use:** copy Elastic's application identity into ACE.

---

## `cloudscape-design/components`

**Use:** complex forms, table interaction, filtering, validation and enterprise workflow reference.

Cloudscape is especially useful as a behaviour/density benchmark for high-stakes application UI.

**Do not use:** AWS-console styling on the public site.

---

## `ibelick/motion-primitives`

**Use:** study concise enter/exit/state transitions once static layouts are approved.

**Do not use:** effect-gallery design. No animated beam, glowing border, text shimmer, floating-orbit or scroll spectacle simply because a primitive exists.

---

# Selection rule

A secondary donor is consulted only when the primary stack does not answer a concrete problem.

Do not combine component libraries for novelty. Every donor added to a design decision must have a specific job.