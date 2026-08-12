# Donor — Base UI

Repository: `mui/base-ui`

Role: **interaction and accessibility foundation**.

Licence: MIT.

Base UI describes itself as an **unstyled UI component library for building accessible user interfaces**. This is exactly why it belongs under ACE: behaviour can be mature without importing a foreign visual identity.

## What we use it for

- keyboard navigation;
- focus management;
- escape/outside-click behaviour;
- menu and popover semantics;
- select/listbox behaviour;
- dialog/modal semantics;
- tooltip behaviour;
- accessible state and ARIA patterns;
- interaction edge cases across mouse, keyboard and touch.

## What we do not use it for

Base UI does not define the ACE visual system. Public-site HTML/CSS should not gain a React dependency simply to match a static layout.

When Trade Requests becomes interactive application UI, Base UI may become an implementation candidate, but only after architecture is approved.

## ACE implementation principle

Separate two questions:

1. **How should this control behave?** — Base UI is a primary reference.
2. **How should this control look in ACE?** — ACE tokens + Reshaped/Coss visual discipline answer this.

Never let behaviour primitives dictate page composition.

## Component behaviour checklist

When implementing interactive primitives, compare against mature Base UI behaviour for:

- trigger/content ownership;
- focus return;
- roving focus where relevant;
- disabled state semantics;
- pointer vs keyboard activation;
- viewport collision for floating surfaces;
- scroll locking for modal layers;
- nested menu/dialog edge cases;
- reduced motion;
- accessible labels and descriptions.

## Public-site rule

On the initial ACE homepage, interaction should remain minimal. Do not add menus, tooltips, tabs or accordions only to make the page feel like a product.

Use interactive primitives only when the content or navigation requires them.