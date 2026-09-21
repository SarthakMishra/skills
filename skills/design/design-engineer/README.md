# Design engineer

Invoke `/design-engineer` in Claude Code or `$design-engineer` in Codex once to
create or improve an app interface:

```text
Build the workspace invitation interface. Reuse our design system, improve
the flow where needed, write the interface copy, and implement and verify it.
```

The skill coordinates UX, the design system, UI design, UX copy, and implementation.
You do not need to invoke each companion separately. The agent can also select
design-engineer for matching work. A review-only request produces findings without
edits.

## Choose one job per invocation

| Mode                     | What it delivers                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| Create from scratch      | The agreed new interface, including its needed system, flows, components, and copy.                   |
| Implement a bounded part | A specific component, screen, or flow integrated with a larger system.                                |
| Audit and repair         | Inspection and fixes for a named system, component, or flow; findings only if you requested no edits. |

Before implementation, the agent establishes the intended outcome, exact target,
constraints, exclusions, and completion checks. For existing work, you choose
between **reuse and refinement** with limited interventions and **first-principles
reassessment** of the problem and implementation. An explicit choice in your request
is reused rather than asked again. First-principles work stays within the agreed
scope; it does not imply a whole-app rewrite.

If you are unsure, the agent follows the `grilling` workflow behind `grill-me`:
numbered rounds with recommendations, questions ordered by their dependencies,
and repository facts investigated by the agent. It continues until the relevant
decisions are settled and you confirm the shared understanding. Implementation
waits for that confirmation; read-only investigation can continue.

## Install the design collection together

Install these companions alongside design-engineer for its full workflow:

| Companion                                  | What it contributes                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| [ux-guide](../ux-guide/SKILL.md)           | User journeys, action contracts, recovery, and UX refinements.                  |
| [design-system](../design-system/SKILL.md) | Existing-system reuse, missing foundations, shared components, and conventions. |
| [ui-guide](../ui-guide/SKILL.md)           | Visual fundamentals, interaction design, and motion treatment.                  |
| [ux-writer](../ux-writer/SKILL.md)         | Final labels, instructions, accessible names, and state-specific feedback.      |

Select the five design skills when installing this collection. The engineer
discovers them from the skill catalog or installed registry; it does not assume
fixed sibling paths. If a needed companion is unavailable, it identifies the gap
and continues work supported by existing decisions. Installation or a product
decision is needed only when the gap blocks dependent work.

Each companion remains independently usable for focused tasks. Orchestration is
the behavior of design-engineer, not a requirement added to the other skills.

## How the work proceeds

1. Establish the mode, scope, and approach; clarify uncertain requirements before implementation.
2. Understand the user's path and refine in-scope UX problems.
3. Coordinate system choices, UI treatment, and final copy.
4. Implement the screens and interactions with the project's stack.
5. Check the journey, system consistency, visual states, copy, and runtime behavior.

[SKILL.md](SKILL.md) is the entry-point map. The
[scoping reference](references/scoping.md) defines the interview and readiness check.
The [orchestration reference](references/orchestration.md) defines companion handoffs
and shared decisions. Its implementation references cover component
lifecycles, specifications, React/Tailwind, animation, and verification.

The [filter-panel specification](references/interaction-specs.md#example-filter-panel)
and [controlled view](references/react-tailwind.md#filter-panel-view) illustrate the
implementation connection. Their sample strings must be replaced with the copy
reviewed for the actual product.

## Scope and completion

A new interface uses all four companions. A narrow repair uses only relevant
guidance and preserves existing decisions. Reusing a design system does not mean
rebuilding it, and improving a feature flow does not imply an app-wide UX audit.

The skill preserves the installed framework, router, components, data layer, and
vocabulary. It honors requested review checkpoints and keeps proposed checks
separate from exercised evidence. A build request finishes with the integrated
interface, not just independent design documents or copy suggestions.

The `grill-me` wrapper and `grilling` procedure informed the scope interview. The
engineer resolves `grilling` automatically when needed; if it is unavailable, the
scoping reference retains the round-based process. You do not need to invoke a
second skill to clarify the task.

A handoff names the behavior before and after, locations, checks run, and material
limits. Publication, deployment, external tickets, and unrelated migrations require
their own authorization.

## Sources

This package separates the engineering material previously maintained in ui-guide.
Its original interaction and animation foundations include Dan Saffer's
_Microinteractions_ and Val Head's _Designing Interface Animation_, with source
context in the [ui-guide README](../ui-guide/README.md#sources).

The user-provided emil-design-eng reference informed the emphasis on component
craft, interruptibility, working previews, and concrete before/after review.
Original research included Emil Kowalski's
[public skills collection](https://github.com/emilkowalski/skills/tree/85e8e2363b713506e1d5b6e07a0eb2da66be1bc3).
Implementation claims retain links to primary documentation and are checked against
the installed stack.

Some examples adapt Jakub Krehel's
[better-* material](https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e/skills).
The following notice travels with those examples.

### License for adapted better-* material

```text
MIT License

Copyright (c) 2026 Jakub Krehel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
