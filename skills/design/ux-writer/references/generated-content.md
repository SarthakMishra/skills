# Write for generated-content experiences

Read this file when the product generates text during use. Separate fixed
interface copy from generated output. Fixed copy names the action and state;
generated prose does not prove that an action happened. These examples are
conceptual and assume the stated product behavior.

## Define the output contract

1. Name the content to generate, its reader, their task, and the source
   information required. State why generation helps that task.
2. Gather representative examples and counterexamples from permitted product
   material. Record what makes each useful, acceptable, or unacceptable.
3. Define factual fidelity, relevant detail, voice, length, structure, and the
   response when information is missing or conflicting.
4. Identify failures that are unacceptable regardless of style, such as invented
   facts, private-data disclosure, or unsupported commitments.

Prefer fixed copy or a template when the result must be exact. Do not let a
generated success message decide whether an operation succeeded.

Bad: let generated text say `Payment sent` and use it as the payment status.

Good: derive the fixed status from the payment result, then show generated text
as a receipt or explanation that the person can review.

Done means the contract names the reader, task, permitted sources, acceptance
rules, unacceptable failures, and missing-information behavior.

## Write the surrounding interaction

| Moment     | Copy should establish                                                                  |
| ---------- | -------------------------------------------------------------------------------------- |
| Input      | What information is needed, how it will be used, and a useful example or constraint.   |
| Action     | Whether the product will draft, summarize, recommend, or execute.                      |
| Output     | What was generated, its source or uncertainty, and what the person can edit or verify. |
| Commitment | Who acts, what changes, and whether review is still required.                          |
| Failure    | What is unavailable or incomplete and the supported alternative.                       |

Use `Draft reply` for editable text. Use `Send reply` only for the actual send
operation. `Draft ready` can confirm generation; it cannot confirm accuracy,
delivery, or approval.

State a limitation beside the decision it affects. If a summary covers selected
documents, name that scope beside the summary. A generic warning cannot replace a
missing source or unsupported recovery path. Offer correction, manual entry, or
another recovery only when the product supports it.

Done means a person can distinguish input, generation, review, commitment, and
failure without relying on generated wording to infer system state.

## Evaluate content variability

1. Test representative sparse, conflicting, long, and sensitive inputs that the
   product permits.
2. Review repeated outputs for the same input. One successful sample does not
   establish reliable behavior.
3. Keep examples used to tune prompts separate from examples reserved for
   evaluation.
4. Evaluate usefulness, factual fidelity, and voice. Report unacceptable outputs
   even when average quality is high.
5. Use qualified human review for consequential domain judgments. An LLM's
   self-rating is not sufficient evidence.

Done means the evaluation set covers the known input risks, the acceptance rules
are applied to each result, and tuning examples cannot hide failures.

## Hand off the result

Preserve the source and version information needed to reproduce a result under
the project's data-handling rules. Record the fixed state source, generated
content behavior, review requirement, and supported recovery. Keep model
architecture, training, deployment, and security implementation in their own
workstreams unless the request includes them.

Done means the handoff separates fixed copy, generated output, verified behavior,
and unverified claims.
