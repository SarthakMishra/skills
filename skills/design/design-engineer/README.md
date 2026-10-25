# Design engineer

Invoke `/design-engineer` in Claude Code or `$design-engineer` in Codex once to
create or improve an app interface:

```text
Build the workspace invitation interface. Reuse our design system, improve
the flow where needed, write the interface copy, and implement and verify it.
```

The skill coordinates UX, the design system, visual decisions, UX copy, and implementation.
You do not need to invoke each companion separately. The agent can also select
design-engineer for matching work. A review-only request produces findings without
edits.

## Choose one job per invocation

| Mode                     | What it delivers                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| Create from scratch      | The agreed new interface, including its needed system, flows, components, and copy.                   |
| Implement a bounded part | A specific component, screen, or flow integrated with a larger system.                                |
| Audit and repair         | Inspection and fixes for a named system, component, or flow; findings only if you requested no edits. |

The agent defaults clear existing-work requests to reuse and refinement, states
the scope, and starts. Ask for first-principles reassessment when you want the
problem and flow reconsidered. Either approach stays inside the named area.

When material requirements are unclear, the agent investigates repository facts
and asks focused questions. Routine design decisions stay with the agent. A deeper
`grilling` interview is available when explicitly requested.

For example: "Polish the invitation dialog's layout and feedback; preserve the
recipient and role behavior." The result includes a rendered comparison of the
weakest detail, refinement where justified, and checks of the affected states.

## Install the design collection together

Install these companions alongside design-engineer for its full workflow:

| Companion       | What it contributes                                                            |
| --------------- | ------------------------------------------------------------------------------ |
| `ux-guide`      | User journeys, action contracts, recovery, and UX refinements.                 |
| `design-system` | Existing-system reuse, visual foundations, shared components, and conventions. |
| `ux-writer`     | Final labels, instructions, accessible names, and state-specific feedback.     |

Install missing companions from this repository with:

```sh
npx skills add SarthakMishra/skills --skill ux-guide design-system ux-writer react-guide
```

Select the four design skills when installing this collection. The engineer
discovers them from the skill catalog or installed registry; it does not assume
fixed sibling paths. If a required companion is unavailable, ask the user to
install it before dependent work. If an optional companion is unavailable, report
the gap and continue only with supported decisions. Do not silently install or
claim to have used a missing companion.

Each companion remains independently usable for focused tasks. Orchestration is
the behavior of design-engineer, not a requirement added to the other skills.

## How the work proceeds

1. Establish the mode, scope, and approach; clarify uncertain requirements before implementation.
2. Understand the user's path and refine in-scope UX problems.
3. Coordinate system choices, UI treatment, and final copy.
4. Implement the screens and interactions with the project's stack.
5. Check behavior and complete a rendered craft pass, comparing refinements before and after.

[SKILL.md](SKILL.md) is the entry-point map. The
[scoping reference](references/scoping.md) defines the interview and readiness check.
The [orchestration reference](references/orchestration.md) defines companion handoffs
and shared decisions. Its implementation references cover component
lifecycles, specifications, React/Tailwind, animation, and verification.

The [filter-panel specification](references/interaction-specs.md#example-filter-panel)
and [controlled view](references/react-tailwind.md#filter-panel-view) illustrate the
implementation connection. Their sample strings must be replaced with the copy
reviewed for the actual product.

For React implementation rules, use the `react-guide` skill. This package keeps
only interface-specific React and Tailwind recipes. If `react-guide` is missing,
install it with the command above before writing React behavior.

## Scope and completion

A new interface uses all three companions. A narrow repair uses only relevant
guidance and preserves existing decisions. Reusing a design system does not mean
rebuilding it, and improving a feature flow does not imply an app-wide UX audit.

The skill preserves the installed framework, router, components, data layer, and
vocabulary. It honors requested review checkpoints and keeps proposed checks
separate from exercised evidence. A build request finishes with the integrated
interface, not just independent design documents or copy suggestions.

A handoff names the behavior before and after, locations, checks run, and material
limits. Publication, deployment, external tickets, and unrelated migrations require
their own authorization.

## Sources

Shared visual-system guidance lives in design-system, including focused
references for typography, layout, and color. Design-engineer applies those
choices in real consumers and reports coverage for broader visual audits.

This package's original interaction and animation foundations include Dan Saffer's _Microinteractions_ and
Val Head's _Designing Interface Animation_.

The user-provided emil-design-eng reference informed the emphasis on component
craft, interruptibility, working previews, and concrete before/after review.
Original research included Emil Kowalski's
[public skills collection](https://github.com/emilkowalski/skills/tree/85e8e2363b713506e1d5b6e07a0eb2da66be1bc3).
Implementation claims retain links to primary documentation and are checked against
the installed stack.

Some examples adapt Jakub Krehel's
[better-* material](https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e/skills).
The visual-audit coverage guidance was inspired by
[make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better/tree/35545ea1512ad59fa463e6b1f95ca9c052981fe6/skills/make-interfaces-feel-better).
