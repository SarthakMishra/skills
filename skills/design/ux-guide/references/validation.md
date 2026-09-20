# Validate the experience

Use evidence appropriate to the claim. Automated checks verify behavior. Observe task sessions to assess comprehension and effort. Analytics can reveal patterns but rarely explain causes alone.

## Validate the flow contract

Start with the task and failure that motivated the change. Select applicable checks rather than running every case mechanically:

- Start from a realistic direct link or return visit with representative data and role.
- Complete the core job and identify the actual commitment and completion states.
- Go back, edit an earlier choice, cancel, close/reopen, or resume after interruption.
- Simulate relevant slow, failed, stale, partial, or unknown outcomes.
- Operate the task with keyboard, touch/narrow layout, and relevant assistive technology where available.
- Check focus, preserved work, selection scope, navigation context, and absence of duplicate side effects.

For each check, record flow/node, precondition, action, observable expected outcome, result, and evidence. Mark code inspection separately from exercised behavior. Mermaid parsing only proves diagram syntax; it cannot prove that the product matches the map.

## Observe people completing tasks

Use task prompts that describe a goal without naming the intended control. "Find work assigned to you that needs attention this week" is better than "Click My tasks and select Overdue." Begin from a plausible context and use realistic content.

Observe first action, hesitation, wrong turns, repeated entry, assistance, recovery, and recognition of completion. Ask what the person expected before teaching the intended behavior. Capture the first cause of difficulty, not just where they finally gave up. Preference and appearance feedback can mask usability failures.

Use small iterative sessions to discover and fix problems early. Include relevant expertise, device, and access differences. Do not treat a fixed participant count as statistical certainty or a substitute for important audience coverage. An agent walkthrough is a heuristic inspection, not research with users.

## Prioritize learning and repair

Choose the most consequential observed problems and make concrete fixes. Avoid spending the entire iteration on easy low-impact issues while a core task remains blocked. Re-test the task after repair; evaluate new problems introduced by the change.

For a design hypothesis, state what observation could disprove it. A before/after metric alone cannot establish causation. If no user data exists, say so and use a clearly labeled heuristic assessment; useful implementation can still proceed where authorized and low-risk.

## Measures by question

| Question                       | Outcome                                           | Check for unwanted effects                       |
| ------------------------------ | ------------------------------------------------- | ------------------------------------------------ |
| Can people finish?             | Correct task completion                           | Assistance, incorrect completion, abandonment.   |
| Is it easier?                  | Time/effort to meaningful outcome                 | Errors, rework, unnecessary steps.               |
| Does onboarding deliver value? | First meaningful outcome among eligible new users | Forced setup or later undoing of rushed choices. |
| Does recovery work?            | Recovery without lost work                        | Duplicate effects and unresolved state.          |
| Do people want to return?      | Repeated valuable outcome at the natural cadence  | Reminder fatigue, regret, avoidance.             |
| Does it feel better?           | Post-task ease, confidence, satisfaction          | Actual completion and correctness.               |

Define denominators, eligible population, time window, and observation limits when proposing metrics. Do not add instrumentation automatically. End with implemented improvements, the checks actually performed, remaining unknowns, and the smallest next check needed. Stop optional testing when the scoped behavior is sufficiently verified.
