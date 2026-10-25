# Scope the invocation

Choose one primary mode, establish the intended outcome, and settle the approach
before implementation. Inspect existing material first so the user decides goals
and tradeoffs rather than answering questions the repository can resolve.

## 1. Select the mode and boundary

| Mode                     | Establish before starting                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Create from scratch      | The new app or interface area, its first usable outcome, and the system, flows, and components needed for that scope.    |
| Implement a bounded part | The named component, screen, or flow, its host system, reused components, integration points, and affected consumers.    |
| Audit and repair         | The existing area to inspect, the problem or evaluation criteria, and whether the user wants fixes or a read-only audit. |

Select the mode from an unambiguous request. Ask when multiple readings would
change the deliverable. A new component in an established app is normally bounded
implementation, not permission to rebuild the app's foundations. Verification of
new work is part of its original mode, not a second audit project.

Identify in-scope screens, component families, flows, and affected consumers.
Name exclusions such as unchanged navigation, copy, backend behavior, or system
tokens. Inspect adjacent code only to understand dependencies and prevent regressions;
proximity does not authorize editing it. Audit-only means no implementation or
system-documentation changes unless subsequently requested.

## 2. Choose an approach for existing work

Default to reuse and refinement for a clear existing-work request. State that
choice and proceed; the user does not need to select an approach by name.
Use first-principles reassessment when requested or when the observed problem
cannot be solved within the current flow. Ask before expanding the agreed scope.

| Approach         | Work within the requested boundary                                                  |
| ---------------- | ----------------------------------------------------------------------------------- |
| Reuse and refine | Compose existing components and improve their weakest visual or behavioral details. |
| First principles | Reassess the problem and flow, then implement justified changes to the named area.  |

Bad: pause a request to polish a settings dialog to ask which methodology to use.
Good: retain the dialog's flow, inspect its rendered states, and refine its layout
and feedback. Ask only if the repair would change a consequential product choice.

## 3. Resolve material uncertainty

Inspect repository facts first. Ask when different plausible answers would change
the target, user outcome, consequential behavior, or permitted scope. Choose routine
spacing, easing, composition, and implementation details using the existing system
and craft guidance; state meaningful assumptions without requiring approval.

For a vague request, ask the smallest useful round of questions, with recommended
answers and tradeoffs. Continue independent investigation while waiting. Once the
material decisions are answered, summarize the scope and proceed; request another
confirmation only when the user asked for a checkpoint or a new decision remains.
Silence is not an answer to a required question.

Use `grilling` for an explicitly requested in-depth requirements interview. Resolve
it through the active catalog; if unavailable, ask dependency-ordered questions
locally and state the fallback. Installation is optional for this branch:
`npx skills add mattpocock/skills --skill grilling grill-me`.

Bad: turn "make it better" into a whole-app redesign or an exhaustive preference
interview. Good: identify the target and desired outcome, then inspect and improve
that area using established product constraints.

## 4. Check readiness

State the mode, target, outcome, constraints, and observable completion checks
concisely. The user's clear request supplies authorization for the requested work;
reuse accepted answers and explicit approach choices. Keep routine design decisions
with the agent. An unresolved material decision blocks its dependent work only.

Pass the same scope to companions so they do not restart discovery. For example,
"Polish the invitation dialog's layout and feedback; preserve recipients, roles,
and submission behavior; check long names, pending, error, and completion states"
is enough to start a bounded polish task.

## 5. Keep the boundary during work

If new evidence changes an agreed assumption, name the affected decision and ask
only the newly necessary questions. Continue independent work inside the settled
scope. If the essential repair needs a broader change, show the reason, affected
area, and proposed scope adjustment before making it.

First-principles reasoning, companion recommendations, and a discovered adjacent
issue do not expand authorization. A user-requested scope change updates the shared
brief and mode explicitly. Finish by checking the deliverable against that brief.

Done means the mode, target, outcome, approach, exclusions, and authorization are
explicit enough that implementation will not require an unapproved scope choice.
