# Write for generated-content experiences

Use this reference when a product generates text during use. Distinguish fixed
interface copy from generated output, and define the job of each. Writing a static
button with an AI assistant does not make the product a generated-content experience.

## Define acceptable output

1. Name the content to generate, its reader, their task, and the source information
   needed. Explain why generating it helps that task.
2. Gather representative examples and counterexamples from permitted product
   material. Record what makes each useful, acceptable, or unacceptable.
3. Define the content requirements: factual fidelity, relevant detail, product
   voice, length and structure, and handling of insufficient information.
4. Identify failures that make an output unacceptable regardless of style, such as
   invented facts, disclosure of private information, or unsupported commitments.

Prefer fixed copy or templates for stable outcomes that must be exact. A generated
success message must not determine whether an action actually succeeded.

## Write the surrounding interaction

| Moment     | Copy should establish                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------- |
| Input      | What information is needed, how it will be used, and a useful example or constraint.           |
| Action     | Whether the product will draft, summarize, recommend, or execute.                              |
| Output     | What is generated, its relevant source or uncertainty, and what the person can edit or verify. |
| Commitment | Who acts, what will change, and whether review is still required.                              |
| Failure    | What is unavailable or incomplete and the supported alternative.                               |

Use `Draft reply` when the result is editable text. Use `Send reply` only for the
actual sending action. `Draft ready` can confirm generation; it cannot confirm
accuracy, delivery, or approval.

State specific limitations at the decision they affect. For example, if a summary
covers only selected documents, identify that scope beside the summary. Generic
warnings cannot repair missing sources or unsupported behavior. Provide correction,
manual entry, or another recovery only when those paths exist.

## Evaluate content variability

For a generated-content review, use representative input and output examples.
Include sparse, conflicting, long, and sensitive inputs appropriate to the product.
Inspect repeated outputs for the same input; one successful sample does not
establish reliable behavior.

Keep examples used to tune prompts separate from examples reserved for evaluation.
Evaluate usefulness and factual fidelity alongside voice. Report unacceptable
outputs explicitly even when average quality is high. Use qualified human review
for consequential domain judgments; an LLM's self-rating is not sufficient evidence.

Preserve the source and version information needed to reproduce a result under the
project's data-handling rules. Keep model architecture, training, deployment, and
security implementation in their own workstreams unless explicitly in scope.
