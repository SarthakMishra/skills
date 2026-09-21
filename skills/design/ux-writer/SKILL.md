---
name: ux-writer
description: Write or review product-interface copy, including labels, forms, errors, empty states, onboarding, confirmations, and status messages. Use for a single string, a flow's copy, copy audits, or product vocabulary and content systems. Excludes marketing, long-form editorial writing, and general brand voice work unless the text is part of a product flow.
---

# Write copy that helps people act

Read the surrounding interface and establish what the person needs to understand
or do. Write for that purpose, using the product's voice and actual behavior.
The result should make the action, consequence, and next step understandable.

Use these rules as defaults. Depart for an explicit requirement, supported product
constraint, audience or language need, or observed failure; state the reason and
replacement. This skill has no prescribed brand personality and works independently.

## Establish the writing context

1. Identify the person's goal, entry point, knowledge, and current situation.
   Distinguish the person using the product from the organization buying it.
2. Name the organization's goal for this interaction and where it conflicts with
   the person's goal. Preserve understandable choices, costs, and exits.
3. Read the relevant screen, requirements, and behavior. Establish the action's
   object, affected scope, timing, reversibility, and supported failure recovery.
4. Read project voice guidance, terminology, and nearby approved copy. Use existing
   decisions before proposing new ones. Without voice guidance, use plain,
   respectful, literal wording as a provisional default.

For one string, keep this context brief and use what is already known. Ask only
when a missing fact changes meaning, consequence, or the requested voice. Mark
inferences; a screenshot does not establish persistence, delivery, or safe retry.
Continue settled copy work while a consequential product question is unresolved.

When working under another design workflow, inherit its scope and accepted
decisions. A copy review does not authorize implementation or a broader redesign.
If words cannot resolve a behavior problem, name the required interaction change.

## Choose the relevant guidance

| Reference                                                              | Read for                                                                                             |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Voice and terminology](references/voice-and-terminology.md)           | Establishing or adapting product voice, tone mismatch, naming, or inconsistent vocabulary.           |
| [Interface patterns](references/interface-patterns.md)                 | Drafting or reviewing a control, screen, notification, or state. Read the matching sections.         |
| [Evaluation and content systems](references/evaluation-and-systems.md) | Copy audits, research plans, effectiveness claims, or reusable content guidance and handoffs.        |
| [Generated content](references/generated-content.md)                   | Product experiences that generate text dynamically, including their input, review, and failure copy. |

## Draft the exchange in context

For a new flow, outline the exchange before fitting words into components. Start
with what the person wants, the information each side needs, the available choices,
and the result. For an existing screen, reconstruct that exchange from the UI.
Conversational means a coherent exchange; it does not require a casual tone,
greetings, a chatbot, or a question for every heading.

1. Order information by when the person needs it. Put prerequisites before input
   and material consequences before commitment. Reuse information already given.
2. Map the product's statements to titles, descriptions, labels, and feedback.
   Map the person's responses to controls and input. Write related choices as a set.
3. Draft the primary path and the applicable empty, waiting, partial, success,
   error, permission, and destructive states within scope. Check interruptions
   and returning later when the interaction supports them.
4. Read the title, explanation, actions, and result together. Check whether the
   actions answer the question or fulfill the expectation the screen creates.

Example: a person wants to share a draft. The interface explains who will receive
it and whether they can edit. The person chooses access and sends the invitation.
The result distinguishes an invitation sent from access accepted. A button called
"Save" would misrepresent that exchange.

Keep draft copy in the design or running interface when available. A copy table
records decisions, but cannot establish whether the words work in their layout.

## Edit in four passes

Apply the passes in order; revisit an earlier decision when a later pass reveals
missing meaning. For a small edit, do this without narrating every pass.

| Pass           | Decision                                                                           | Completion check                                                                       |
| -------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Purposeful     | Identify what this text enables or explains. Remove text with no useful job.       | The person can reach their goal and understand the relevant consequence.               |
| Concise        | Remove repetition and move optional detail out of the immediate decision.          | Every remaining phrase earns its space; essential scope, timing, and recovery survive. |
| Conversational | Read the product's statements and the person's possible responses together.        | The exchange follows a useful order in language this audience recognizes.              |
| Clear          | Resolve ambiguity, check terminology and facts, and restore any necessary context. | The likely interpretation matches the real behavior and the product's voice.           |

Prefer recognizable words and concrete verbs. Keep professional terms when they
are the audience's clearest words. Brevity is subordinate to meaning: a longer
label that distinguishes two outcomes is better than a short ambiguous one.
English word counts and reading-level scores are diagnostic aids, not universal
limits or evidence of comprehension.

Use personality intentionally. Match warmth, formality, and celebration to the
project and the moment. In failures or consequential choices, put the facts and
recovery first. Courtesy may fit the voice; it must not obscure what happened.

## Deliver and verify

For a small request, give one recommended string with a brief reason. Offer
alternatives only when they represent a meaningful tradeoff or were requested.
For a flow, provide the final copy in context and a compact handoff when useful:

| Location / ID | State or trigger | Component | Proposed copy | Behavior or constraint |
| ------------- | ---------------- | --------- | ------------- | ---------------------- |

Keep observed and proposed text distinct. Include variables, missing facts, and
accessibility or translation notes where they affect the result. For an audit,
prioritize findings by misunderstanding, blocked work, or harm before style.

Before finishing:

1. Check that actions, affected objects, and outcomes agree across the flow.
   Verify claims about saved work, delivery, timing, undo, and retry against evidence.
2. Check names and related choices for consistency and distinguishability.
   Verify that every changed state offers a supported next step or a clear endpoint.
3. Check copy in its available layout, including accessible names, reading order,
   long values, empty values, plurals, narrow screens, and translation expansion.
4. Report the requested result and the checks actually performed. Mark unavailable
   rendering, behavior, or user-comprehension checks `Not verified`.

An expert review predicts problems; observing people use the copy tests that
prediction. Do not claim improved conversion or comprehension from a rewrite alone.
