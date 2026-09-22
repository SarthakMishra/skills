# Evaluate and maintain UX content

Read this file for a copy audit, research plan, effectiveness claim, reusable
content guidance, or implementation handoff. Choose a complete task or an
explicitly bounded part of it. Record the person's purpose, the organization's
purpose, and the available evidence before judging copy. Keep expert assessment
separate from measured user behavior.

## Audit the agreed scope

1. Inventory the relevant screens, strings, states, and entry points. Include
   accessible names, conditional messages, and generated content when they apply.
2. Record current wording and its location or string key. Group it by task and
   concept so conflicting names and missing states are visible.
3. Evaluate usability and voice separately. Preserve effective wording and put
   evidence beside each finding.
4. Rank repairs by likely harm, blocked work, frequency, and reach. Separate a
   factual defect, a comprehension risk, and a stylistic preference.
5. Give each repair proposed copy or behavior and an acceptance check. Record
   unresolved product facts without turning guesses into final wording.

Done means every in-scope string and state has a location, an assessment, and an
evidence or uncertainty label.

## Check usability before style

| Criterion      | Ask                                                                      | Evidence to inspect                                                                   |
| -------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Accessible     | Can the intended audience perceive and understand the content?           | Language availability, accessible names, reading order, realistic values, and layout. |
| Purposeful     | Does the text help complete the task or explain a necessary constraint?  | User and organization goals, decisions, next steps, and completion.                   |
| Concise        | Does every phrase contribute without hiding necessary context?           | Repetition, irrelevant requests, misplaced detail, and avoidable memory work.         |
| Conversational | Does each statement connect logically to the person's possible response? | Information order, recognizable language, and coherent choices.                       |
| Clear          | Can the person predict the outcome and recover when needed?              | Terms, scope, action labels, help, system states, and failure paths.                  |

Then check the six voice aspects against the project's guidance: concepts,
vocabulary, verbosity, grammar, punctuation, and capitalization. A playful or
formal voice can pass when it fits the product and situation and preserves
meaning.

Use written evidence rather than an unexplained score. If a scorecard is
requested, define its scale, exclude inapplicable items, and use it to prioritize
within the same product. A score is a subjective assessment, not a usability
percentage or proof of accessibility. Keep critical failures visible instead of
averaging them away.

Bad: `The rewrite is 90% accessible.` It gives no test, scope, or remaining risk.

Good: `The review found that the label names the field, the error is associated
with it, and the translated long value still wraps. Screen-reader and user
comprehension checks are Not verified.`

Done means findings distinguish observed defects, comprehension risks, and style
preferences, with evidence and remaining checks stated.

## Match research to the question

| Question                         | Method                                                                                  | Limit                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Which terms do people recognize? | Review supplied search and support language; use open naming questions or card sorting. | Existing users may not represent new users or other locales.           |
| Do people understand the action? | Observe an unaided task, then ask what they expected and what they think happened.      | Small qualitative studies explain problems, not population-wide rates. |
| Which wording feels appropriate? | Ask participants to identify confusing and resonant phrases in context.                 | Preference alone does not establish task success.                      |
| Does a variant change outcomes?  | Compare variants with a controlled experiment and a defined completion event.           | A metric change does not by itself explain why.                        |

For a research plan, state the audience, task, question, method, and observable
outcome. Avoid leading participants with the label being tested. Ask what an
action will do rather than whether the wording is clear.

Bad: `Is this button clear?`

Good: `What do you expect to happen after you select "Submit application"?`

Agent role-play can expose omissions during drafting. It is not research with
actual users. Use the smallest relevant measure and add a countermeasure such as
errors, reversals, complaints, or successful recovery. Retention should match a
real recurring need, not reward obstructed exits.

State what was observed and what remains a hypothesis. Compare equivalent tasks
and audiences. Do not invent sample sizes, uplift, significance, or user
testimony. Proposing a study does not mean it ran or authorize contacting
participants.

Done means the plan names the question, audience, task, observable outcome, and
limit without presenting a proposal as a result.

## Maintain a content system when requested

Reuse the existing design system and content repository. A single-string request
does not need a new documentation system. Add guidance only for writing decisions
that recur.

| Part           | Maintain                                                                         |
| -------------- | -------------------------------------------------------------------------------- |
| Principles     | Audience, user goals, product goals, and constraints.                            |
| Personality    | Voice choices and situational tone with representative examples.                 |
| Patterns       | Component and flow copy, state coverage, terminology, variables, and exceptions. |
| Practicalities | Spelling, formats, localization, ownership, review, and publication.             |

Keep one authoritative copy of each decision. Separate a concept's definition
from spelling preferences and voice choices. Update affected usages when an
approved term changes, while checking contexts that share the same string key.

Bad: create a content system to settle one button label.

Good: add a reusable rule when the same decision recurs across screens, then name
its owner, affected patterns, and acceptance check.

Done means the system adds only repeated guidance, identifies its owner, and does
not duplicate the project's existing source of truth.

## Make the handoff usable

For a multi-screen change, keep final strings tied to locations, states, and exact
variables. Show copy in context and record why a consequential choice changed.
Follow the project's review requirements for regulated or approved wording. Keep
the required version and owner when the project records them. Do not manufacture
review gates for routine changes or treat silence as approval.

When implementation is authorized, use the project's existing content mechanism
and check final rendered strings against the accepted copy. Include supported
languages and alternate states in the check. A string spreadsheet does not prove
correct placement, translation, or runtime behavior.

Done means the handoff separates accepted copy, implementation constraints,
verified checks, and `Not verified` work.
