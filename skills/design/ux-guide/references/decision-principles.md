# Decision rules for user flows

Use this reference when a flow decision trades task clarity, memory, speed,
familiarity, or error prevention. Name the decision, apply the matching rule,
and state the behavior and check that should improve. These rules guide a
proposal; they do not prove that users will succeed.

## Remove uncertainty before removing steps

1. Identify what the person must guess: where to start, what is actionable, what
   is selected, which object changes, or what comes next.
2. Put that information beside the decision or action that needs it.
3. Remove steps that collect redundant information or add no useful decision.
4. Preserve a step when it makes a consequential choice understandable or lets
   people review the correct object and scope.

Use familiar conventions for ordinary actions. Depart when the familiar pattern
would conceal a different consequence or a documented task need. Keep the primary
job visible; do not impose exactly one action on every screen.

| Bad                                                          | Good                                                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Combine a wizard into one crowded page to reduce clicks.     | Use one page for independent choices; keep stages when later choices depend on earlier ones. |
| Add a tour to explain unclear navigation.                    | Make destinations and the current location understandable without the tour.                  |
| Hide comparisons in separate tabs to reduce visible choices. | Keep the information needed for the decision together.                                       |

For repeated expert work, keep shortcuts alongside a discoverable standard path.
Evaluate memory, repeated entry, context switches, and unnecessary decisions as
well as clicks.

## Connect intention, action, and result

Use this sequence to locate a breakdown: goal, plan, action choice, execution,
perceived result, interpretation, and comparison with the goal.

### Before the action

| Question                               | Required treatment                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| Can the person find the action?        | Expose a recognizable control and its current availability.                             |
| Can they operate it?                   | Provide the relevant keyboard, touch, and non-gesture alternatives.                     |
| Which object and scope does it affect? | Keep row actions beside their row and distinguish personal from workspace-wide actions. |
| What will happen?                      | Distinguish draft, save, publish, send, and delete before commitment.                   |

### After the action

| Question                          | Required treatment                                                             |
| --------------------------------- | ------------------------------------------------------------------------------ |
| Did the input register?           | Acknowledge it immediately at the action.                                      |
| Is work pending or complete?      | Show real operation state; acceptance is not completion.                       |
| What failed or remains unknown?   | Show what is known, retained work, and a supported recovery path.              |
| Can the person recognize success? | Show the changed object or a durable result that matches the intended outcome. |

A constraint must prevent a real invalid action and explain how to proceed.
Use one clear feedback location for an ordinary result; duplicated alerts obscure
what matters.

## Put memory into the interface

- Keep prior choices, selection scope, relevant comparisons, and unfinished work
  visible or recoverable at the decision that needs them.
- Group information by meaning. Do not use a seven-item limit for every list or
  navigation merely because a memory principle mentions seven.
- On return, show the current object, saved or unsaved state, and next useful action.
- Derive reliable mechanical values from known data. Keep consequential defaults
  inspectable and correctable; do not guess ambiguous meaning.

| Bad                                                          | Good                                                              |
| ------------------------------------------------------------ | ----------------------------------------------------------------- |
| Remember a price from step 1 while choosing terms in step 4. | Show the selected price and terms together before commitment.     |
| Return from detail to a reset search.                        | Restore the prior query, filters, and list position.              |
| Automate a destination based on an uncertain guess.          | Present the proposed destination and require the needed decision. |

## Distinguish slips from mistaken plans

A slip is an unintended execution of a correct plan. A mistaken plan follows an
incorrect understanding of the system. Match the repair to the cause:

| Failure                                                         | Default repair                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Neighboring controls or a hidden mode cause accidental actions. | Separate confusable actions, expose mode/scope, and provide supported recovery. |
| The user believes Save publishes externally.                    | Make the actual save/publish boundary visible before commitment.                |
| An ordinary reversible mistake occurs.                          | Offer genuine undo or correction without generic confirmation fatigue.          |
| An irreversible or broad action is about to commit.             | Review the actual object, affected scope, and consequence.                      |

A warning can catch a slip but does not automatically repair an incorrect mental
model. Recovery must be supported by the system, not promised by wording alone.

## Use psychology as a lens, not a specification

### Choice and operation

| Lens                   | Decision it informs                                          | Do not infer                                                            |
| ---------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Familiarity            | Reuse behavior suited to the job and audience.               | A familiar product's flow fits every other product.                     |
| Target acquisition     | Check operable hit areas and placement across input methods. | A universal pixel size follows from Fitts's law alone.                  |
| Choice and memory load | Group related choices and expose needed information.         | Fewer visible items or clicks always means easier use.                  |
| Tolerant input         | Accept harmless variation that preserves meaning.            | Ambiguous dates, amounts, identities, or units may be silently coerced. |

### Attention and control

| Lens                                | Decision it informs                                    | Do not infer                                                  |
| ----------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| Peak/end and meaningful distinction | Improve stressful moments and recognizable completion. | Celebration compensates for a broken core journey.            |
| Aesthetic usability                 | Evaluate perceived ease alongside task success.        | Praise for appearance proves usability.                       |
| Complexity                          | Let the system perform reliable mechanical work.       | Necessary choices can be hidden without an exception path.    |
| Responsiveness                      | Keep input and feedback timely and truthful.           | 400ms is a universal deadline or fake progress is acceptable. |

## Resolve the tradeoff explicitly

Default to correctness and understandable consequences before removing a step.
Default to direct correction for reversible work. Keep expert efficiency and a
discoverable beginner path together. Explain the tradeoff as a concrete prediction:

Bad: "Hick's law says this is too complicated."

Good: "Keep the two plans and their limits on one page. Users can compare them
without returning to the previous step. Check whether they still backtrack for
missing information."

Preserve exits, necessary details, and work already entered. Useful friction
supports a deliberate commitment; friction caused by internal organizational needs
does not earn its place by being familiar.

For motivation or recurring use, continue with [engagement](engagement.md).
Fix an ability or timing obstacle before adding persuasion, and leave a clear
stopping point when the real task is finished.

## Finish

Done means the chosen treatment names the tradeoff, affected flow step, exception,
and check that could disprove the expected improvement. Mark the prediction as
heuristic when user evidence is unavailable.
