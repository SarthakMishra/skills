# UX guide

Use `/ux-guide` in Claude Code or `$ux-guide` in Codex with the task people need
to complete and the journey that is failing or missing.

## What it does

`ux-guide` designs and repairs the path a person takes through a web app. It traces
the task from entry to completion, including waiting, failure, recovery, and
returning later. Recommendations must match behavior the system can support.

A review produces a proposed flow and prioritized findings. When you ask for a
repair, the skill implements the scoped changes and checks the affected journey.
It distinguishes what it observed from what it inferred.

## When to use it

The agent can also select this skill when a task fits.

| Situation                                                 | What it covers                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| A form loses work or a failed action leaves people stuck. | The affected journey, its immediate neighbors, and a recovery path.                  |
| You are designing a new flow.                             | Entry, decisions, state changes, completion, and connections to the rest of the app. |
| You want an app-wide UX review.                           | A journey inventory followed by findings ordered by their effect on users.           |
| Onboarding or return use is weak.                         | The first useful outcome and the reasons people need to return.                      |

For labels, errors, and other copy changes, use [ux-writer](../ux-writer/README.md).
Visual styling and animation tuning are outside this skill's scope.

## Work from the actual journey

Give the agent the task people are trying to complete and the relevant app,
screens, or code. Access to the running app lets it check behavior. Screenshots
can support a review, but cannot prove what happens after a click or a timeout.

The skill shows current and proposed branching flows in Mermaid. For a trivial
linear action, a table or short explanation is enough. Working maps use the
project's scratch convention, defaulting to `.scratch/<effort-slug>/ux/`. They stay
separate from permanent specs and tickets.

## Common questions

### Scope of a small fix

It should stay within the affected journey and its immediate neighbors. An
app-wide audit is a separate request.

### Review checkpoints

It pauses if you requested a review checkpoint or a decision needs your input.
Otherwise it shows the map and continues work you have already authorized.

### Framework support

The flow guidance is framework-independent. The agent reads React-specific
guidance only when the implementation uses React.

## Check the result

- You can see where the existing journey breaks and how the proposal addresses it.
- Consequential actions explain what changes, what survives failure, and how to recover.
- A narrow repair stays within the requested scope.
- The result identifies which paths were exercised and which remain unverified.
- A timeout does not become a claim of failure or a blind retry when the action may have succeeded.

## Where it fits

Use it to design, review, or repair a user flow.
[ux-writer](../ux-writer/README.md) covers the words within that interaction;
neither skill requires the other to be installed. See the [design
index](../README.md) for the current collection.
