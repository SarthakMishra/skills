---
name: design-engineer
description: Scope app-interface work to creating from scratch, implementing a bounded part of an existing system, or auditing and repairing existing implementation. Coordinate design-system, ux-guide, ui-guide, and ux-writer through implementation and verification. Clarify uncertain requirements before implementation. Excludes backend-only work and marketing or editorial writing.
---

# Create working app interfaces

Own one bounded task from the user's goal through implementation and verification.
Automatically use the relevant design companions; the user invokes this skill once.

## Establish scope before implementation

| Mode                     | Job                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------- |
| Create from scratch      | Build the agreed new interface and its needed system, flows, components, and copy.     |
| Implement a bounded part | Integrate a named component, screen, or flow into a larger system.                     |
| Audit and repair         | Inspect and fix an agreed existing area; return findings only when edits are excluded. |

Read [scoping and requirements](references/scoping.md) first. Establish the outcome,
target, exclusions, constraints, and completion checks. For existing work, offer
reuse/refinement versus first-principles reassessment and wait for the user's choice
unless it is already explicit. For uncertain requirements, apply `grilling`, the
workflow behind `grill-me`, until the user confirms shared understanding.

Read-only investigation can continue while decisions are pending. Neither this
skill nor a companion may begin implementation before the readiness check passes.
First-principles reasoning does not authorize a broader rewrite.

## Coordinate the design skills

Resolve model-invoked companions through the active catalog or installed registry.
Read each selected entry point and required references; apply its workflow within
the shared scope. Do not require separate user invocations or fixed sibling paths.

| Companion       | Contribution                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `ux-guide`      | Understand the user's path, action contract, completion, and recovery; refine in-scope friction.           |
| `design-system` | Reuse existing foundations and components, establish missing ones, or extend the agreed shared contracts.  |
| `ui-guide`      | Choose visual fundamentals, interaction feedback, and motion treatment.                                    |
| `ux-writer`     | Write and review every added or changed interface string, including alternate states and accessible names. |

Use all four for an app or feature interface build; select relevant responsibilities
for a narrow repair. Each companion remains independently usable. If one is missing,
report the coverage limit and continue only work supported by settled decisions.
Do not claim it was used or silently install it.

## Work through the interface

1. Pass the agreed mode, approach, scope, vocabulary, and constraints into one shared
   brief. Reuse accepted answers instead of starting separate interviews.
2. Follow [orchestration](references/orchestration.md) to coordinate UX, system
   choices, UI, and final copy. Honor requested checkpoints.
3. Implement the chosen treatment using the existing stack, router, data layer,
   and accessible components. Apply reviewed copy in the rendered UI.
4. Verify the journey, system, visual states, copy, and runtime behavior together.
   Stop once required checks pass unless a failure or unresolved concern remains.

A necessary change outside the agreed boundary needs a new scope decision before
implementation. Companion recommendations do not authorize unrelated migrations,
framework replacement, deployment, publication, or external actions.

## Implementation references

| Reference                                                          | Read for                                                                 |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [Component patterns](references/component-patterns.md)             | Controls, overlays, focus, gestures, request ownership, and recovery.    |
| [Interaction specifications](references/interaction-specs.md)      | Branching states, coordinated components, owners, and acceptance checks. |
| [React and Tailwind](references/react-tailwind.md)                 | Installed-stack implementation and controlled view recipes.              |
| [Animation implementation](references/animation-implementation.md) | CSS, WAAPI, Motion, springs, gesture release, and rendering cost.        |
| [Verification](references/verification.md)                         | Combined companion criteria, runtime checks, and evidence limits.        |

## Handoff

Report the scoped result, before/after behavior, locations, checks run, and material
limits. Mark unavailable checks `Not verified`. If work remains, name one concrete
next step.
