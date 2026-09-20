---
name: design-system
description: Build and evolve a design system for React, Tailwind, and shadcn/ui using Atomic Design. Use when starting a system, formalizing an informal or partial one, or creating, updating, or reviewing components against an existing system. Covers visual foundations, motion, documentation, migration, and enforcement. Excludes isolated visual tweaks without system implications and backend-only work.
---

# Build and enforce a design system

Produce a system used by real product screens: shared foundations, composable
components, documented decisions, and checks against drift. Use Brad Frost's
Atomic Design as the methodology. React, Tailwind, and shadcn/ui are the
implementation choices; preserve the project's installed versions and conventions.
For an audit-only request, use the workflow as inspection criteria and return
findings with proposed changes. Do not edit components, documentation, or tooling.

## 1. Establish the scope and evidence

Read project instructions, `DESIGN.md`, package versions, Tailwind configuration
or theme CSS, `components.json`, shared components, and existing documentation and
checks. Inspect representative screens and their actual component consumers.
Identify supported themes, platforms, accessibility requirements, product
character, and who maintains the system. Ask about missing decisions only when
they would change the work; record provisional choices explicitly.

| Request                      | Work to perform                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| Start from scratch           | Choose a real feature, establish the foundations it needs, and implement it with reusable components. |
| Formalize an existing system | Inventory current patterns, decide what to retain or consolidate, and migrate the agreed scope.       |
| Add or change a component    | Load the existing contract, reuse or extend it, check consumers, and update affected documentation.   |
| Audit enforcement            | Report violations with evidence and proposed repairs; implement only when requested.                  |

For a component task, inspect its dependencies and consumers rather than auditing
the entire product. For a system task, list the screens and component families in
scope so completion means more than finishing one attractive example.

For existing-system adoption, read
[adoption-and-enforcement.md](references/adoption-and-enforcement.md) now and
complete its inventory before selecting canonical patterns.

Finish with the scope, current sources of truth, constraints, and visible gaps.

## 2. Apply Atomic Design in context

Move between components and real pages throughout the work. These levels describe
composition, not sequential project phases or mandatory directory names.

| Level    | Responsibility                                         | Example                                         |
| -------- | ------------------------------------------------------ | ----------------------------------------------- |
| Atom     | Small UI element with its own behavior and constraints | Button, input, label                            |
| Molecule | Elements cooperating on one task                       | Search field with label and submit action       |
| Organism | A substantial section composed from smaller parts      | Search toolbar with filters and results summary |
| Template | Arrangement and content slots                          | Results layout with a filter region             |
| Page     | Template filled with real content and state            | No results, long names, many results            |

Tokens support these levels; treat them as foundations rather than an extra
mandatory component tier. Keep useful existing directories such as `components/ui`
and feature folders. Classify only when it clarifies responsibility or reuse.
Allow direct composition across levels; avoid wrappers whose only purpose is to
satisfy the taxonomy.

For creation or foundation changes, read
[foundations.md](references/foundations.md). Prove the choices in a representative
feature, then feed problems with content, density, or state back into the shared
definitions. A single attractive component does not validate the system.

## 3. Implement the component contracts

For React, Tailwind, or shadcn changes, read
[react-tailwind-shadcn.md](references/react-tailwind-shadcn.md), including its
adaptation and authoring conventions. Before creating a component, search local
components and supported variants. If they do not cover the requirement, read
[registry-discovery.md](references/registry-discovery.md) and search relevant
community registries with the shadcn CLI before writing it from scratch. Search
beyond the default registry; inspect candidate source and dependencies before
choosing reuse, adaptation, composition, or new code. Record what was searched and
why the chosen implementation fits. New components must follow the project's
shadcn authoring patterns and design-system contract.

Define each changed component's purpose, supported variants, content limits,
responsive behavior, semantics, keyboard and focus behavior, and relevant states.
Include empty, loading, error, disabled, and selected states where applicable.
Distinguish visual emphasis from meaning: a destructive action may have a quiet
treatment while retaining an unambiguous label and semantics.

Motion is part of this contract. For system creation or any interaction or motion
change, read [motion.md](references/motion.md). Specify the motion recipe or an
explicit instant response, including reduced motion and interruption. Existing
motion conventions apply to new components automatically.

Implement the shared definition and its in-scope consumers together. Preserve
public behavior during consolidation unless the task calls for a behavior change.
Finish with a working composition using real content, not only a token sheet or
unconsumed component library.

## 4. Document and enforce

Read [adoption-and-enforcement.md](references/adoption-and-enforcement.md) when
formalizing an existing system, establishing documentation or checks, or changing
a system contract. It covers migration, `DESIGN.md`, Storybook, and enforcement.

Use `DESIGN.md` by default for smaller projects. For a large component catalog,
many state combinations, or multiple contributing teams, explain what Storybook
would cover and consult the user before adding it as a required development
dependency or documentation workflow. Existing authorization is sufficient; if
undecided, continue with `DESIGN.md` and the app's preview facilities. Never make
Storybook a runtime dependency. Reuse an established Storybook setup.

Put executable values in the theme and components. Documentation explains how to
use them and links to their definitions. Add a short pointer in the project's
existing agent instructions when establishing enforcement, so future component
work reaches `DESIGN.md`. A skill installation alone does not enforce a system.
Use existing lint and test facilities before introducing custom rules.

Finish with discoverable conventions, the chosen enforcement actually wired into
the project, and any migration gaps or exceptions recorded. Do not claim a full
migration while legacy consumers remain in the agreed scope.

## 5. Verify the affected system

- Run the project's relevant formatting, lint, type, test, and build checks.
- Render changed components alone and in consuming pages at relevant widths,
  themes, density, and content extremes. Inspect text zoom and wrapping.
- Exercise keyboard navigation, focus visibility and restoration, accessible
  names, pending and failure behavior, and contrast for affected states.
- Exercise motion at normal speed, rapid reversal, repeated input, and reduced
  motion. State and focus must remain correct without animation completion.
- Check documentation examples against production imports. Exercise new
  enforcement with both a violating example and a permitted example.

For broad adoption, account for every in-scope family as retained, migrated,
retired, or explicitly deferred. For a narrow edit, verify the changed contract
and affected consumers. Report implemented changes, exercised checks, and remaining
limitations separately. Static analysis does not prove visual or motion quality.

For source attribution and conflicting advice, read
[sources.md](references/sources.md). The references are self-contained; the books
and inspiration sites are not required runtime inputs.
