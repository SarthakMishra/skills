# Write interface patterns in context

Choose the section matching the interaction. Examples here are original and
illustrative; their behavior is a stated assumption, not a promise to import.
Use the project's vocabulary, voice, and supported capabilities.

## Find the pattern

- Orientation and choice: [titles](#titles-and-navigation),
  [actions](#buttons-links-and-menus), [descriptions](#descriptions-and-instructions).
- Input: [labels](#labels-and-data), [controls](#controls-and-settings),
  [fields](#text-input-and-validation).
- State: [empty states](#empty-states-and-first-use),
  [progress](#waiting-and-completion), [errors](#errors-and-recovery).
- Consequences: [confirmation](#confirmation-before-commitment),
  [access and payment](#access-consent-and-payment), [notifications](#notifications).
- Cross-cutting checks: [accessibility and localization](#accessibility-localization-and-variables).

## Titles and navigation

Use the words people expect after following the entry link or action. A title
should establish location, object, task, or result even when the body is skipped.

| Context     | Default                                              | Exception or check                                              |
| ----------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| Destination | Recognizable noun, such as `Appointments`.           | Preserve an established product term when its meaning is clear. |
| Task        | Action and object, such as `Reschedule appointment`. | Use a question when the screen asks a real question.            |
| Result      | Actual outcome, such as `Appointment requested`.     | Do not imply confirmation while approval is pending.            |
| Section     | Distinguishing topic, such as `Delivery address`.    | Remove a heading that adds no orientation.                      |

Match names across entry points and destinations. Write sibling headings at a
comparable level of detail. Avoid invented names for ordinary concepts and headings
that force users to read a paragraph to discover the topic.

## Buttons, links, and menus

Name the immediate outcome using a specific verb and object where useful. Use
nouns for destinations. Write the options together so their differences are clear.

| Actual behavior                            | Label                |
| ------------------------------------------ | -------------------- |
| Save a private draft                       | `Save draft`         |
| Open a review before submission            | `Review application` |
| Submit the completed application           | `Submit application` |
| Open the list of submitted applications    | `Applications`       |
| Abandon edits and retain the saved version | `Discard changes`    |

A short `Save` or `Continue` can work when the object and next step are unmistakable.
Add words when they distinguish consequences. A verb alone is not useful if it
hides the recipient, cost, or scope that matters to this decision.

Use the project's convention for ellipses, capitalization, and punctuation.
Punctuation cannot carry the only indication that another step follows. Link text
should name its destination or purpose outside its surrounding sentence; replace
`Click here` with something like `View delivery options`.

Make the secondary action precise. `Keep editing` and `Discard changes` describe
different outcomes; `Cancel` is sufficient only when what gets canceled is clear.
`Not now` requires a genuine path to defer the task. Do not imply an unsupported reminder.

## Descriptions and instructions

Add only the information the title and action cannot convey: a prerequisite,
meaningful benefit, constraint, scope, or consequence. Put it beside the decision
it supports. Choose the opening according to what the person needs to recognize:

| Need                     | Example                                              |
| ------------------------ | ---------------------------------------------------- |
| Reach an outcome         | `To receive delivery updates, add an email address.` |
| Understand a consequence | `Changing this address affects future deliveries.`   |
| Follow a requirement     | `Upload a PDF no larger than 10 MB.`                 |

These examples assume the stated rules are true. Avoid repeating `Email address`
with `Enter your email address here`. Put optional explanation behind a descriptive
link when it is useful to only some people. Keep commitment-critical facts visible.

Use short paragraphs and ordered steps for an actual sequence. Retain necessary
explanation even when it exceeds a preferred line count. If a paragraph is needed
to explain every control, check whether the interaction itself needs repair.

## Labels and data

Name the fact, category, quantity, or status. Differentiate adjacent labels and
supply units or context where needed: `Delivery date`, `Amount paid`, `Pending review`.

- Distinguish estimates, recorded values, pending values, and final values.
- Put currency, period, timezone, or measurement basis beside the value it qualifies.
- Use the audience's professional terms when precise, and define unfamiliar terms.
- Keep a stable term for the same concept across labels, feedback, and help.

For search and filters, name the searched objects and constrained properties.
A zero-result message should reflect the active query or filter. For repeated row
actions, identify the row in the accessible name, such as `Actions for order 1842`.

## Controls and settings

Name the behavior being configured, then make its current state or range legible.
A checkbox or switch label should remain understandable when selected and unselected.

Bad: `Disable nonessential updates`

Better: `Email me about delivery changes`

Use parallel option labels. Explain differences in capability or consequence where
the label alone cannot do so. For a slider, label the measured property, units, and
meaningful endpoints. State whether a setting applies immediately, after saving,
or only to future activity. Avoid double negatives and unexplained internal modes.

## Text input and validation

Keep the field's purpose visible after entry. Use a persistent label; placeholders
may provide examples but cannot carry essential labels or requirements alone.

1. Label the requested information in the audience's terms.
2. Explain unfamiliar purpose or use of the information where needed.
3. State relevant format and limits before entry, using actual validation rules.
4. Mark optionality consistently and place correction guidance by the affected field.

Use distinct jobs for label, hint, example, and error. An example should not look
like a real saved value. Prefill only from a supported source, and keep corrections
possible. Do not infer country-specific address or phone constraints from one example.

Prefer an actionable correction such as `Enter a date after {start_date}` to
`Invalid date`. If several inputs are wrong, identify them without losing the
person's entries. A message cannot compensate for code that discards their work.

## Empty states and first use

Identify why content is absent before writing the message.

| State                           | Copy should do                                                        |
| ------------------------------- | --------------------------------------------------------------------- |
| Nothing created yet             | Explain the feature's purpose and offer a useful first action.        |
| Task or queue completed         | Confirm completion; allow the person to stop.                         |
| Search or filters match nothing | State the constraint and offer a supported way to broaden it.         |
| Access is restricted            | Explain the access condition without asserting that nothing exists.   |
| Retrieval failed                | Report the failure and recovery; do not label it an empty collection. |

For example, a new reading list might use `No saved articles` with `Save an article
to read it later`. A finished review queue needs no tutorial or new task merely to
fill the space.

For onboarding, teach the smallest concept needed for the next useful action.
Keep optional education skippable when the product supports it. Explain required
setup through its task benefit, not a tour of every feature.

## Waiting and completion

Use related verbs across the action and its states. In English, `Export report`,
`Exporting report`, and `Report exported` make the progression recognizable.
Adapt tense naturally in other languages.

- Acknowledge received input separately from work completed. `Request received`
  does not mean `Appointment confirmed`.
- Show measurable progress only when the system supplies it. Give duration or
  permission to leave the page only when supported.
- Confirm the completed object or scope. For partial success, name what remains,
  such as `8 of 10 files uploaded`, and offer recovery for the remainder.
- Omit redundant success text when the result is already clear, including to
  people using assistive technology. Keep a durable record where later reference matters.

Do not invent a successful result after a timeout. An unknown state needs its own
message and a way to verify the outcome before repeating a consequential action.

## Errors and recovery

Choose the treatment according to what the person can do.

| Failure               | Treatment                                                       |
| --------------------- | --------------------------------------------------------------- |
| Correctable input     | State the required correction beside the field.                 |
| Available alternative | Explain the obstacle and the supported detour.                  |
| Work is blocked       | State what cannot proceed and the known condition for resuming. |
| Result is unknown     | Explain the uncertainty and how to check before retrying.       |

Include the failed action, known cause when useful, preserved work when verified,
and a supported next step. An unknown cause stays unknown. Put reference codes
beside useful recovery guidance when support needs them, not in place of an explanation.

Example, assuming entries remain in the current form and saving is safe to retry:
`We couldn't save your address. Your changes are still in this form. Try saving again.`

If retry could duplicate a payment or submission, direct the person to check its
status or use the supported recovery path. Do not promise `Nothing was charged`
without confirmation. Apologies may acknowledge disruption when the voice supports
them; they do not replace recovery or justify blame.

## Confirmation before commitment

Distinguish a request to confirm an action from feedback that it already completed.
Use pre-action confirmation for consequential or hard-to-reverse decisions. For
ordinary reversible actions, recommend supported undo when changing behavior is in scope.

Name the action and object, affected people or data, timing, and reversibility.
Pair a specific commitment label with a clear safe alternative.

Example, only if deletion is immediate and permanent:

- Title: `Delete workspace "Archive"?`
- Description: `This permanently deletes its 12 files for everyone in the workspace.`
- Actions: `Delete workspace` / `Keep workspace`

For archive, suspension, removal, merging, or transfers, describe the actual effect.
Do not soften deletion into deactivation or hide asymmetric effects in `Are you sure?`.

## Access, consent, and payment

Explain role, ownership, authentication, and plan restrictions according to their
actual cause. Name who can unblock a task when that information is safe to disclose.
Describe roles through capabilities and limits before access is granted.

For consent, explain the requested access, purpose, and available alternative if
the person declines. Keep optional choices understandable. A promise such as
`We won't contact anyone` requires evidence about the actual data use.

For payments and subscriptions, put amount, billing interval, known taxes, renewal,
and cancellation effects where they inform commitment. Distinguish a trial from a
purchase and a scheduled cancellation from immediate closure. Use approved policy
wording where required; flag contradictions instead of inventing a policy.

## Notifications

Justify the interruption with timely value to the recipient. Put the essential
information and relevant action where they survive a collapsed view. Supporting
text adds context rather than hiding a critical deadline or consequence.

Specify the triggering event, audience, channel, and destination when designing
notification copy. Consider what may appear on a lock screen or shared device.
Use the product's privacy settings to determine which details can be shown.

For preferences, explain what will arrive and when. Keep notification subscriptions
separate from the recipients of an individual action. Avoid manufactured urgency,
shaming, and recurring prompts after the person has made a clear choice.

## Accessibility, localization, and variables

### Preserve meaning beyond the visible string

- Give meaningful controls accessible names, with identifying context for repeated
  actions. Keep the visible label in the accessible name and avoid duplicated role words.
- Read text in its actual reading order. Check links independently and verify that
  field guidance and errors are associated with the correct input.
- Make essential instructions understandable without color, position, icons, or
  animation alone. Keep feedback available long enough to use it.

### Plan variable and language behavior

- Preserve structured placeholders such as `{file_name}`. Define their source,
  empty-value fallback, and long-value behavior without inventing missing facts.
- Use complete localizable messages and the project's plural rules. Avoid joining
  sentence fragments or assuming English word order and two plural forms.
- Format names, numbers, dates, times, currency, and units for the target locale.
  Test zero, one, many, missing, long, and mixed-direction values where relevant.
- Allow expansion and reflow. Keep essential distinctions visible instead of
  shortening every translation to an English character limit.
- Give translators the state, intended meaning, variables, and any literal meaning
  behind wordplay. Treat locale-specific writing as a design decision.

For `Invitation sent to {recipient_name}`, use the address as fallback only if it
is available and appropriate to show. Otherwise use a complete alternative such as
`Invitation sent`. Check that the sending state itself is verified.
