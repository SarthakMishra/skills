# UX guide

Use `/ux-guide` in Claude Code or `$ux-guide` in Codex with the task people need
to complete and the journey that is missing or failing:

```text
Review the teammate invitation flow from entry through acceptance.
Explain failures and recovery with a current/proposed map. Do not change code.
```

The agent can also select the skill for a matching task.

## What it delivers

| Request         | Result                                                                     |
| --------------- | -------------------------------------------------------------------------- |
| Review or audit | Prioritized findings with evidence and concrete proposed repairs.          |
| New flow design | A proposed path, action contracts, recovery, and acceptance checks.        |
| Repair          | Scoped implementation, exercised checks, and explicit verification limits. |
| Narrow change   | Work limited to the affected journey and its dependencies.                 |

The guide makes defaults explicit and uses before/after or good/bad examples.
It distinguishes received input, pending work, confirmed results, known failure,
and unknown outcomes. It does not promise persistence, delivery, undo, or safe retry
without system support.

## Find the relevant guidance

[SKILL.md](SKILL.md) is a lean map to seven references:

| Decision                              | Reference                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Represent and diagnose a journey      | [Flow mapping](references/flow-mapping.md) and [diagnosis](references/diagnose-and-fix.md).           |
| Choose behavior and resolve tradeoffs | [Flow patterns](references/flow-patterns.md) and [decision rules](references/decision-principles.md). |
| Improve first value and return use    | [Engagement](references/engagement.md).                                                               |
| Implement React behavior              | [React interactions](references/react-interactions.md).                                               |
| Establish what is verified            | [Validation](references/validation.md).                                                               |

The flow guidance is framework-independent. React guidance applies only when that
is the installed stack. The source books are not required to use the skill.

## Give the task enough context

1. Name the person, intended outcome, and flow or app area in scope.
2. Provide the relevant app, screenshots, code, requirements, or reported failure.
3. Say whether you want findings, a design, or implementation, and what must stay unchanged.

The agent looks up repository facts and asks about unresolved product decisions
that change the flow. A screenshot supports visual inspection; it cannot establish
what happens after an action or timeout.

## Maps and checkpoints

Current and proposed branching flows appear as Mermaid diagrams. A trivial linear
action uses a short table or prose. Working files follow the project's convention,
defaulting to `.scratch/<effort-slug>/ux/`; a no-file-changes request keeps the
maps in the conversation. Existing specs, tickets, and identifiers are preserved.

The agent honors requested review checkpoints and otherwise continues work that is
already authorized. When design-engineer coordinates the task, UX guide inherits its
agreed scope, approach, and readiness rather than starting another interview.

## Check the result

- The journey includes entry, commitment, completion, and relevant recovery or return paths.
- Each finding identifies the cause, affected behavior, proposed change, and evidence.
- Partial results distinguish confirmed success, known failure, and unknown outcomes.
- The result names checks actually run and leaves unavailable checks marked Not verified.
- A review does not silently become implementation or an app-wide redesign.

## Use independently or through the orchestrator

For an app interface spanning UX, system, UI, copy, and implementation, invoke
[design-engineer](../design-engineer/README.md) once. It uses this skill automatically.
UX guide also works independently.

Use [ux-writer](../ux-writer/README.md) for copy-only work and
[ui-guide](../ui-guide/README.md) for visual fundamentals. Neither is required for
a standalone UX task. See the [design index](../README.md).

## Sources

- Steve Krug, _Don't Make Me Think, Revisited_, third edition, 2014. Chapters 1 to 4
  cover scanning and decisions; 6 to 7 cover navigation; 8 to 9 cover observing tasks
  and prioritizing repairs; 10 to 12 cover mobile, goodwill, and accessibility.
- Don Norman, _The Design of Everyday Things_, revised and expanded, 2013. Chapters
  1 to 2 cover interaction and the action cycle; 3 covers externalized knowledge;
  4 covers constraints and mapping; 5 covers recovery; 6 covers iterative design.
- Jon Yablonski, _Laws of UX_, second edition, 2024. Chapters 1 to 10 supply the
  psychology lenses; 11 covers their application; 12 covers responsibility,
  nonideal scenarios, and purposeful friction.
- Nir Eyal, _Hooked_, 2014. Chapters 1 to 5 cover cadence, triggers, ability,
  rewards, and investment; 6 covers influence; 8 covers testing recurring behavior.

Historical examples and numerical claims need their original context. The guide
keeps progress truthful, consequential results predictable, and user assumptions
testable. React state ownership, request ordering, map formats, and acceptance
contracts are the guide's engineering applications, not API prescriptions from
those books.
