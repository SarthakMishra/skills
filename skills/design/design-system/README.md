# Design system

Build a React, Tailwind, and shadcn/ui design system, formalize one that grew
informally, or keep component changes consistent with an established system.
The methodology comes from Brad Frost's _Atomic Design_, with visual guidance
from _Refactoring UI_. Motion is part of the system's foundations and component
contracts.

## When to choose it

Use this skill for shared tokens, component APIs, system adoption, documentation,
or enforcement. For local layout and interaction design, use `ui-guide`; use
`ux-guide` for user flows and `ux-writer` for interface copy. These companion
skills are optional.

The agent can select this skill for matching work. Invoke it explicitly with
`$design-system` in Codex or `/design-system` in Claude Code. For example:

- "Build a design system for this React app and implement the account settings
  feature using it. Include motion and document the conventions in DESIGN.md."
- "Consolidate our existing buttons, fields, and dialogs into a shared system.
  Preserve current behavior and migrate their consumers."
- "Add a pending state to our button using the existing design and motion rules."
- "Find an existing document viewer in the shadcn registries and adapt it to our
  design system. Build new components in our shadcn style only where needed."
- "Audit these components for design-system drift and recommend enforcement."

## What to expect

For a new system without an adequate project basis, the skill grills the missing
requirements and records a PRD, spec, or architecture document before making
dependent design choices. It reuses existing decisions and does not require a
new product spec for a routine component change.

The resulting screens use the shared tokens and components. Documentation
records conventions and exceptions, and the handoff reports what was tested.
Existing projects should get an inventory and an explicit migration status.
Small projects use `DESIGN.md`. For larger systems, the agent consults you
before adding Storybook and its required development workflow.

Before creating missing components, the skill searches relevant community
registries with the shadcn CLI. A [shortlist of 14 specialist
registries](references/registry-discovery.md) covers documents, AI interfaces,
tables, charts, maps, editors, and motion. The agent adapts imported source to
local tokens and behavior and writes new components using the project's shadcn
conventions. The shortlist includes maintenance evidence and known compatibility
limits.

Enforcement starts with shared APIs and project guidance. The skill can add
targeted lint or test checks when justified by recurring violations. Installing
the skill alone does not add a lint plugin or enforce these rules.

The agent needs access to the project and its tooling. A running app or preview
allows visual and interaction checks; unavailable checks must be reported. The
original books are not required to use the skill. See the [source
notes](references/sources.md) for attribution and adaptations.

## During bootstrap

[`bootstrap`](../../engineering/bootstrap/README.md) offers design-system setup
as an option for frontends. If selected, it invokes this skill to establish or
adapt the minimal system using the accepted project basis and records its rules
in `DESIGN.md`. If skipped, bootstrap preserves existing styling and keeps the
scaffold minimal. This choice does not disable automatic invocation of the
skill.
