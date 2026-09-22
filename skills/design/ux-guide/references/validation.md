# Validate the experience

Use this reference for every UX proposal, review, or repair. Check the task and
failure that motivated the change. Separate evidence that the implementation
behaves correctly from evidence that people understand and can complete the task.
An agent walkthrough is not participant research.

## Select checks by the changed contract

Use the applicable rows. For a proposal, record them as acceptance checks. For a
repair, exercise them using the project's available tooling and test environment.

| Changed behavior                   | Required checks                                                                                            |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Navigation or entry                | Direct link, refresh, Back/Forward, return context, and relevant role gates.                               |
| Form or staged decision            | Core completion, invalid submission, backtracking, retained values, cancel, and resume.                    |
| Async action or bulk operation     | Slow response, known failure, out-of-order or partial results, unknown outcome, and safe retry.            |
| Permission or consequential action | Correct actor/object/scope, visible consequences, no restricted-data exposure, and actual recovery limits. |
| First use or return experience     | First meaningful outcome, optional setup, recognizable completion, and resumption at the natural cadence.  |

Across changed paths, inspect focus, preserved work, selection scope, navigation
context, and duplicate side effects. Operate with keyboard and relevant touch/narrow
layouts; check assistive technology when available. Use representative data and
roles, not only an empty happy path.

Use test data, mocks, or an authorized test environment for consequential actions.
Do not send real invitations, delete user data, or trigger external effects merely
to exercise a UX check without authorization.

## Record evidence against a transition

For each check, record the flow step or transition, precondition, action, expected
outcome, actual result, and evidence. Reuse a check that covers several concerns
rather than running the same action once per reference.

| Label          | Meaning                                                             |
| -------------- | ------------------------------------------------------------------- |
| Proposed       | An acceptance check or future treatment; it has not been exercised. |
| Code-supported | The source supports the claim; runtime behavior remains unverified. |
| Verified       | The named scenario was exercised and its actual result recorded.    |
| Not verified   | The check was unavailable or was not run.                           |

| Bad check                                                | Good check                                                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "Retry works."                                           | Commit an invitation but lose the response; recovery must not send a duplicate.                               |
| "The wizard is simpler."                                 | Go back from review, edit an earlier answer, and confirm dependent choices and entered values remain correct. |
| "The flow is verified because the document is complete." | Record documentation completeness separately from observed application behavior.                              |
| "Users will understand this."                            | State the expected improvement and the task observation that could disprove it.                               |

A successful build or snapshot does not establish comprehension, focus behavior,
request ordering, or recovery. Mark browser, screen-reader, device, and performance
checks unavailable when that is the evidence limit.

## Observe people when user testing is requested

1. Give a goal-based task in a plausible context. Use realistic data without naming
   the intended control.
2. Observe first action, hesitation, wrong turns, repeated entry, assistance, recovery,
   and recognition of completion.
3. Ask what the person expected before teaching the interface. Capture the first
   cause of difficulty, not just the point where they gave up.
4. Repair the most consequential observed problem and repeat the task. Check for
   new errors or confusion introduced by the change.

Bad: "Click My tasks and select Overdue."

Good: "Find work assigned to you that needs attention this week."

Include the relevant experience levels, devices, and access differences. A fixed
participant count does not guarantee audience coverage or statistical certainty.
Preference and appearance feedback do not replace observed task success.

## Use measures that answer the question

### Completion and effort

| Question            | Outcome                                   | Unwanted effects                               |
| ------------------- | ----------------------------------------- | ---------------------------------------------- |
| Can people finish?  | Correct task completion.                  | Assistance, incorrect completion, abandonment. |
| Is it easier?       | Time or effort to the meaningful outcome. | Errors, rework, unnecessary steps.             |
| Does recovery work? | Recovery without lost work.               | Duplicate effects and unresolved state.        |

### First value and return use

| Question                       | Outcome                                            | Unwanted effects                                            |
| ------------------------------ | -------------------------------------------------- | ----------------------------------------------------------- |
| Does onboarding deliver value? | First meaningful outcome among eligible new users. | Forced setup or later undoing of rushed choices.            |
| Do people want to return?      | Repeated valuable outcome at the natural cadence.  | Reminder fatigue, regret, avoidance.                        |
| Does it feel better?           | Post-task ease, confidence, and satisfaction.      | Failure to complete correctly despite positive impressions. |

Define the denominator, eligible population, time window, and observation limits.
Do not add instrumentation automatically. A before/after metric or correlation
alone does not establish causation.

If no user data exists, label the result a heuristic assessment. A concrete repair
can still proceed within authorization, but its predicted usability benefit remains
a hypothesis until tested.

## Finish at the requested scope

- Audit: deliver prioritized findings, evidence, and proposed repairs.
- Design: deliver the proposed flow, decisions, dependencies, and acceptance checks.
- Repair: deliver implemented behavior, exercised checks, and material unverified paths.

Prioritize consequential failures over easy cosmetic wins. Re-test after a change
or failure; do not repeat successful checks without a new reason. Stop optional
testing after the required scope is covered. If a required check cannot run, report
that limit without calling it verified. End with one concrete next check when work
remains.
