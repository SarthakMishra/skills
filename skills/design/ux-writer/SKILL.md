---
name: ux-writer
description: Write or audit product-interface copy for labels, forms, errors, empty states, onboarding, confirmations, status messages, and content systems. Use for a string, a flow's copy, a copy audit, or product vocabulary. Skip marketing, long-form editorial, and standalone brand strategy unless the text belongs to a product flow.
---

# Write copy that helps people act

Read the relevant interface, behavior, requirements, voice, and terminology
before drafting. Produce copy whose action, consequence, current state, and next
step match the evidence.

For an audit, report findings without editing. Implementation requires an explicit
request. This skill does not authorize an interaction redesign. If wording cannot
fix a behavior problem, name the smallest behavior change required. When the
writing basis is missing, use plain, respectful, literal wording as a provisional
default and mark inferences.

Ask only when a missing fact changes meaning, consequence, or requested voice. If
another design workflow owns the task, inherit its scope and accepted decisions.
Continue settled copy work while a consequential product question is unresolved.

## Reference map

| Reference                                                              | Read when                                                                                        | Decision it supports                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [Voice and terminology](references/voice-and-terminology.md)           | The task establishes voice, adapts tone, names a concept, or resolves inconsistent vocabulary.   | Which writing choices and terms are supported by the product and audience.    |
| [Interface patterns](references/interface-patterns.md)                 | The copy belongs to a control, screen, notification, or interface state.                         | Which label, explanation, action, and state pattern fits the actual behavior. |
| [Evaluation and content systems](references/evaluation-and-systems.md) | The task audits copy, proposes research, claims an effect, or creates reusable content guidance. | What evidence supports the finding, measure, system rule, or handoff.         |
| [Generated content](references/generated-content.md)                   | The product generates text during use.                                                           | What must be fixed, generated, reviewed, verified, or recovered.              |

Read only the branches that apply. Keep shared workflow rules here and branch
details in the linked reference.

## Workflow

1. **Establish scope and evidence.** Read repository instructions, the request,
   the relevant screen or code, requirements, behavior, existing copy, voice
   guidance, terminology, and supported states. Identify the person's goal,
   organization's goal, entry point, knowledge, object, affected scope, timing,
   reversibility, and supported recovery. Record authoritative sources and gaps.

   Done means you can state what the person needs to understand or do, which
   behavior the words describe, and which facts remain unverified.

2. **Load the matching branch guidance.** Use the reference map to choose the
   smallest set of references needed for the request. Read matching sections for
   interface patterns, voice, evaluation, content systems, or generated output.

   Done means every requested branch has an owner and unrelated guidance stays
   out of the working set.

3. **Reconstruct the exchange.** For a new flow, outline what the person wants,
   what information each side needs, the available choices, and the result. For
   an existing screen, reconstruct that exchange from the interface. Map product
   statements to titles, descriptions, labels, and feedback. Map responses to
   controls and input. Cover the primary path and applicable empty, waiting,
   partial, success, error, permission, and destructive states. Check
   interruptions and returning later when the interaction supports them.

   Put prerequisites before input and material consequences before commitment.
   Read the title, explanation, actions, and result together. A copy table records
   decisions, but the design or running interface is needed to check layout.
   Conversational means a coherent exchange, not a casual tone, greeting,
   chatbot, or question for every heading.

   Done means related choices have distinct outcomes and every in-scope state has
   either a supported next step or a clear endpoint.

4. **Edit in four passes.** Apply these passes in order. Revisit an earlier pass
   when a later pass reveals missing meaning.

   | Pass           | Decision                                                                  | Completion check                                                         |
   | -------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
   | Purposeful     | Keep only text that enables an action or explains a necessary constraint. | The person can reach the goal and understand the relevant consequence.   |
   | Concise        | Remove repetition and move optional detail out of the immediate decision. | Every phrase earns its space; scope, timing, and recovery remain.        |
   | Conversational | Read product statements with the person's possible responses.             | The exchange follows a useful order in language the audience recognizes. |
   | Clear          | Resolve ambiguity and check terms, facts, and required context.           | The likely interpretation matches real behavior and the product's voice. |

   Prefer recognizable words and concrete verbs. Keep professional terms when
   they are the audience's clearest words. Brevity does not justify hiding scope,
   timing, consequence, or recovery. Use word counts and readability scores as
   diagnostics, not universal limits or proof of comprehension. Match personality
   to the product and moment; put facts and recovery first in failures and
   consequential choices.

   Done means the copy passes all four checks without unsupported claims or a
   second term for the same concept.

5. **Deliver and verify.** For a small request, give one recommended string and
   a brief reason. Offer alternatives only for a meaningful tradeoff or when
   requested. For a flow, give final copy in context and use this handoff when
   locations or states matter:

   | Location / ID | State or trigger | Component | Proposed copy | Behavior or constraint |
   | ------------- | ---------------- | --------- | ------------- | ---------------------- |

   Keep observed, proposed, and hypothesized text distinct. Verify actions,
   affected objects, outcomes, saved work, delivery, timing, undo, retry,
   accessible names, reading order, variables, empty values, plurals, narrow
   layouts, and translation expansion against available evidence. For audits,
   rank misunderstanding, blocked work, and harm before style.

   Report the checks actually performed. Mark unavailable rendering, behavior,
   accessibility, translation, or user-comprehension checks `Not verified`.

   Done means the handoff states the requested result, the evidence checked, and
   every remaining uncertainty.

An expert review predicts problems; observing people use the copy tests that
prediction. Do not claim improved conversion or comprehension from a rewrite
alone.
