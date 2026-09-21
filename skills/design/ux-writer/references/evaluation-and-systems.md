# Evaluate and maintain UX content

Choose a complete task or an explicitly bounded part of it. Record the person's
purpose, the organization's purpose, and the available evidence before judging
copy. Keep an expert assessment separate from measured user behavior.

## Audit the agreed scope

1. Inventory the relevant screens, strings, states, and entry points. Include
   accessible names, conditional messages, and generated content where applicable.
2. Record current wording and its location or string key. Group by task and
   concept so conflicting names and missing states become visible.
3. Evaluate usability and voice separately with the criteria below. Preserve
   effective wording and document evidence beside each finding.
4. Rank repairs by likely harm, blocked work, frequency, and reach. Separate a
   factual defect, a comprehension risk, and a stylistic preference.
5. Give the proposed copy or behavior repair and its acceptance check. Record
   unresolved product facts without turning guesses into final wording.

## Check usability before style

| Criterion      | Ask                                                                         | Evidence to inspect                                                               |
| -------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Accessible     | Can the intended audience perceive and understand the content?              | Language availability, accessible names, reading order, realistic values, layout. |
| Purposeful     | Does this text help complete the task or understand a necessary constraint? | User and organization goals, decisions, next steps, completion.                   |
| Concise        | Does every phrase contribute without hiding necessary context?              | Repetition, irrelevant requests, misplaced detail, avoidable memory work.         |
| Conversational | Does each statement connect logically to the person's possible response?    | Information order, recognizable language, coherent choices.                       |
| Clear          | Can the person predict the outcome and recover when needed?                 | Terms, scope, action labels, help, system states, failure paths.                  |

Then check the six voice aspects against the project's own guidance: concepts,
vocabulary, verbosity, grammar, punctuation, and capitalization. A playful voice
can pass; a formal voice can pass. The question is whether each fits its product
and situation while preserving meaning.

Use written evidence rather than an unexplained score. If a scorecard is requested,
define its scale, exclude inapplicable items, and use it to prioritize within the
same product. Scores are subjective assessments, not a usability percentage or
proof of accessibility. Keep critical failures visible instead of averaging them away.

## Match the research to the question

| Question                         | Method                                                                                     | Limit                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Which terms do people recognize? | Review supplied search and support language; use open naming questions or card sorting.    | Existing users may not represent new users or other locales.           |
| Do people understand the action? | Observe an unaided task, then ask what they expected and what they think happened.         | Small qualitative studies explain problems, not population-wide rates. |
| Which wording feels appropriate? | Ask participants to identify confusing and resonant phrases in context.                    | Preference alone does not establish task success.                      |
| Does a variant change outcomes?  | Compare variants with an appropriate controlled experiment and a defined completion event. | A change in the metric does not by itself explain why.                 |

For a research plan, state the audience, task, question, and observable outcome.
Avoid leading participants with the label being tested. Ask them to explain what
an action will do, rather than asking whether the wording is clear. Agent role-play
can expose omissions during drafting; it is not research with actual users.

Use the smallest relevant measure. A clearer field hint might reduce correction
attempts; an onboarding rewrite might shorten time to the first useful outcome.
A higher click rate can coexist with more mistaken submissions. Include a relevant
countermeasure such as errors, reversals, complaints, or successful recovery.
Retention should match a real recurring need, not reward obstructed exits.

State what was observed and what remains a hypothesis. Compare equivalent tasks
and audiences; a before/after change may have other causes. Do not invent sample
sizes, uplift, significance, or user testimony. Proposing a study does not mean
it ran or authorize contacting participants.

## Maintain a content system when requested

Reuse the existing design system and content repository. Add guidance for repeated
writing decisions; a single-string request does not need a new documentation system.
Organize reusable guidance into four parts:

| Part           | Maintain                                                                           |
| -------------- | ---------------------------------------------------------------------------------- |
| Principles     | Audience, user goals, product goals, and the constraints that guide decisions.     |
| Personality    | Product voice choices and situational tone, with representative examples.          |
| Patterns       | Component and flow copy, state coverage, terminology, variables, and exceptions.   |
| Practicalities | Spelling, formats, localization notes, ownership, review, and publication process. |

Separate a concept's definition from spelling preferences and voice choices.
Keep one authoritative copy of each decision. Update affected usages when an
approved term changes, while checking contexts that share the same string key.

## Make the handoff usable

For a multi-screen change, keep final strings tied to locations, states, and exact
variables. Show copy in context and record why a consequential choice changed.
Follow the project's review requirements for regulated or approved wording; retain
its version and owner when that record is required. Do not manufacture review gates
for routine changes or treat silence as approval.

When implementation is authorized, use the project's existing content mechanism
and check the final rendered strings against the accepted copy. Include supported
languages and alternate states in the relevant checks. A string spreadsheet alone
does not demonstrate correct placement, translation, or runtime behavior.
