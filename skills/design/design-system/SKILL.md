---
name: design-system
description: Build, adopt, or audit React design systems and component-level visual contracts on Tailwind and shadcn/ui. Use for tokens, layout, typography, icons, color, surfaces, states, motion, variants, migration, documentation, or enforcement. Skip isolated page styling without shared-system impact, product flows, copy, and backend work.
---

# Build a shadcn design system

Start with the project's installed shadcn components, Tailwind theme, and
`components.json`. Keep those defaults unless a real requirement or consumer
evidence shows a gap. Fix hierarchy and state before adding decoration. Finish
with real consumers, documented exceptions, and checks that prevent drift.

For an audit-only request, inspect and report findings. Do not edit files unless
the request includes implementation.

For audit findings, label each result `Defect`, `Risk`, or `Preference`. Include
the affected location, the observed or proposed treatment, the evidence, and
any checks that remain unverified.

## Workflow

1. **Inspect the project.** Read repository instructions, the accepted PRD or
   spec, `DESIGN.md`, package versions, the Tailwind theme or config,
   `components.json`, `components/ui`, `cn`, `cva` usage, representative
   consumers, and existing checks. Record the requested scope, source-of-truth
   files, constraints, and gaps.

   Done means you can name the files and consumers the change must touch.

2. **Keep the shadcn defaults.** Start with the installed shadcn style, control
   library, semantic roles, radius, spacing, and component source. Change a
   default only when a product requirement, accessibility need, or repeated
   consumer need proves it is insufficient. Record the exception in `DESIGN.md`.

   Good: add a named `destructive` or `loading` variant to the existing
   `components/ui/button.tsx` when several consumers need the same contract.

   Bad: create `PrimaryButton` because one page wants a different color. It
   creates a second source of truth.

   Done means every changed default has a reason and an affected-consumer list.

3. **Test foundations in a real feature.** Choose a form, list, dashboard, or
   dialog with real text and relevant empty, loading, error, disabled, selected,
   and long-content states. Read [foundations.md](references/foundations.md)
   before creating or changing tokens.

   Done means the choice works in two compositions and the relevant states are visible.

4. **Compose before extending.** Search local shadcn components and feature
   compositions first. Use atoms, molecules, and organisms to decide ownership.
   Read [react-tailwind-shadcn.md](references/react-tailwind-shadcn.md) for
   `cva`, `cn`, component APIs, and Tailwind classes. Read
   [registry-discovery.md](references/registry-discovery.md) only when the local
   and official shadcn options do not fit.

   Done means each missing capability has a composition, extension, adaptation,
   or new-component decision.

5. **Define the component contract.** State each shared component's purpose,
   variants, content limits, responsive behavior, semantic element, keyboard and
   focus behavior, visual roles, geometry, feedback, recovery, and supported
   states. Keep each state understandable without animation or color alone;
   preserve input and focus, and keep feedback near its cause. Read
   [motion.md](references/motion.md) for system motion or animated interactions.
   Keep feature data and business rules in feature code.

   Done means the code and project docs describe the same contract.

6. **Prevent decay.** Read
   [adoption-and-enforcement.md](references/adoption-and-enforcement.md) when
   migrating consumers, changing a shared contract, or adding checks. Use
   `@shadcn/lint` where the project's Tailwind and linter setup supports it.
   Configure rules for raw colors, arbitrary values, restyling, and dynamic
   classes as the project needs.

   Done means the project has a repeatable check for the drift the change could introduce.

7. **Verify the result.** Run the project's format, lint, type, test, and build
   checks that apply. Exercise changed consumers with real and long content,
   wrapping or translation, supported themes, narrow and wide widths, text zoom,
   forced colors, contrast, keyboard input, focus, failure states, stable
   geometry, and reduced motion. Report unavailable checks as unverified.

   Done means required checks pass and the handoff separates verified results from
   unverified work.

## Use Atomic Design for ownership

Atomic Design is a composition guide, not a folder requirement.

| Level    | React example                 | Use it when                               |
| -------- | ----------------------------- | ----------------------------------------- |
| Atom     | `Button`, `Input`             | one reusable control owns its behavior    |
| Molecule | `SearchField`, `FormField`    | existing atoms work together for one task |
| Organism | `DataToolbar`, `SettingsForm` | molecules form a reusable product section |

Compose existing atoms into a molecule. Extend an atom with `cva` only when a
new visual or behavior variant belongs to the shared contract. Keep a one-off
combination in its feature until another consumer proves it should be shared.

## Reference map

- [foundations](references/foundations.md): read before changing shadcn theme roles or tokens.
- [react-tailwind-shadcn](references/react-tailwind-shadcn.md): read when authoring or adapting React components.
- [registry-discovery](references/registry-discovery.md): read when local and official shadcn components do not fit.
- [motion](references/motion.md): read for Tailwind or component motion.
- [adoption-and-enforcement](references/adoption-and-enforcement.md): read for migration, decay prevention, docs, or lint.
