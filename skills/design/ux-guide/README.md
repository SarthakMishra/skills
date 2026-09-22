# UX guide

Use `/ux-guide` in Claude Code or `$ux-guide` in Codex when a person's path
through a web app is confusing, incomplete, risky, or hard to recover. The
agent can also select the skill for a matching task.

## When to choose it

| Request         | What it delivers                                                                |
| --------------- | ------------------------------------------------------------------------------- |
| Review or audit | Evidence-backed findings, causes, proposed repairs, and verification limits.    |
| New flow design | A textual use case, action contracts, recovery paths, dependencies, and checks. |
| Flow repair     | A scoped implementation, exercised checks, and remaining unverified paths.      |
| Narrow change   | Work limited to the affected journey and its immediate dependencies.            |

Use [design-engineer](../design-engineer/README.md) when one interface task
needs UX, design-system, UI, copy, and implementation work. Use [ux-writer](../ux-writer/README.md)
for copy-only work and [ui-guide](../ui-guide/README.md) for visual fundamentals.

## Useful requests

- "Review the teammate invitation flow from entry through acceptance. Report
  failures and recovery. Do not change code."
- "Design the first-run workspace setup flow. Include validation, cancellation,
  return behavior, and acceptance checks."
- "Repair the lost-response path after sending an invitation. Implement the fix
  and verify that retry cannot create a duplicate."
- "Audit the checkout journey for scope, commitment, unknown outcomes, and safe
  recovery."

## Canonical flow format

The source of truth is a textual Cockburn-style use case:

1. `Intent` names the actor, goal, entry, permissions, commitment, and success.
2. `Main flow` records one linear Main Success Scenario.
3. `Extensions` attach branches to the step where they first diverge.
4. `States and transitions`, `Rules`, and `Scenarios` are added when the flow
   needs them.

Use stable flow-step and transition IDs. Keep current and proposed behavior
separate. Mermaid or another diagram is an optional derived view, not the
canonical artifact.

## Result

A useful run leaves the requested journey documented or repaired, with the
person's goal, completion contract, failure and recovery paths, preserved work,
focus behavior, and evidence limits explicit. It does not claim persistence,
delivery, undo, cancellation, safe retry, or user comprehension without support
from the product or an exercised check.

## Reference map

- [Flow mapping](references/flow-mapping.md): use-case structure, Extensions,
  state tables, stable IDs, storage, and handoffs.
- [Diagnosis and repair](references/diagnose-and-fix.md): root-cause investigation
  and scoped repairs.
- [Flow patterns](references/flow-patterns.md): common navigation, form, list,
  permission, and recovery treatments.
- [Decision rules](references/decision-principles.md): testable choices about
  memory, mistakes, friction, and feedback.
- [Engagement](references/engagement.md): first value, repeated work, and return use.
- [Validation](references/validation.md): acceptance checks, evidence, and limits.

## Scope and evidence

Review and design requests do not authorize implementation. The skill reads the
repository's requirements, routes, components, contracts, and available runtime
evidence before proposing behavior. It reports unavailable browser,
device, assistive-technology, or user-research checks as `Not verified`.
