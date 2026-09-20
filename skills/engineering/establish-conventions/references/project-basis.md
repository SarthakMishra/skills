# Establish the basis for later decisions

Find the requirements already available for the requested setup, architecture,
conventions, or design-system work. If no adequate PRD, spec, or architecture
document exists, establish one through scoped discovery. Do not send the user
away to another workflow.

## Inspect before interviewing

Look for existing requirements, architecture docs, issues, prior conversation
decisions, and relevant code. A document's content matters more than its filename.
Reuse an adequate PRD, `SPEC.md`, or architecture document rather than creating a
duplicate. If accepted decisions exist only in conversation, capture them in a
document and ask only about actual gaps.

For a narrow change, inspect its existing contract and affected area. Do not require
a product-wide PRD or start a discovery interview for an ordinary component edit.
An options-only request may keep its proposed basis in the response instead of
writing project files.

## Grill the missing decisions

Use the model-invoked `grilling` skill when available. Otherwise interview in rounds
of independent unresolved questions. Explain each recommendation and its tradeoff.
Wait for answers before asking dependent questions. Inspect or research factual
prerequisites yourself. Preserve decisions already made in `wayfinder`, `grill-me`,
bootstrap, or another discussion.

Establish the applicable requirements:

- Who will use or consume the product, what problem it solves, and the first
  useful outcome. For an existing system, identify the change being requested.
- Essential workflows or operations, representative inputs and outputs, failures,
  recovery, and observable acceptance criteria.
- Scope and exclusions, priorities, compatibility obligations, and constraints
  such as privacy, accessibility, offline use, deployment, performance, and cost.
- Known system boundaries, data ownership, external dependencies, and technical
  decisions already fixed by the user or the environment.
- For interface work, the intended audience, important screens and states, brand
  or visual references, density, input methods, and supported themes or devices.

Do not choose a stack to fill a gap in product understanding. Separate accepted
requirements from proposed solutions, assumptions, and open decisions. Challenge
contradictions, but let the user decide material product tradeoffs. Optional
discovery companions may help when explicitly selected; their absence does not
prevent this interview.

## Write one useful document

Follow the project's document layout. If it has none, choose the document that
matches what was established:

| Document          | Use when                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `PRD.md`          | User needs, product scope, priorities, and outcomes are the main decisions.                                                     |
| `SPEC.md`         | Observable behavior, interfaces, constraints, and acceptance criteria are ready to guide implementation.                        |
| `ARCHITECTURE.md` | System responsibilities, boundaries, and technical constraints are the main subject and product requirements are already clear. |

Do not create all three by default. An architecture document must include or link
the goals and behavioral requirements that justify its decisions; a diagram or
technology list alone cannot replace missing requirements. Use an existing
`docs/architecture.md` or other established path instead of competing with it.

Record scope, accepted decisions, their reasons and sources, success and failure
criteria, and unresolved items. Each deferral needs an owner, revisit condition,
and the decisions it blocks. Keep technical proposals labeled as proposals until
accepted. Use unslop while drafting when available and preserve private material.

### Confirm the basis before dependent work

Review the concrete document with the user. Existing approval of its decisions
still counts; silence does not establish acceptance. Correct misunderstandings
before implementation depends on them. Discovery is complete when the document
provides enough accepted constraints for the next decisions and names remaining
limits. Unresolved material requirements keep dependent work pending.

## Use and maintain the basis

Return the document path, accepted decisions, and remaining questions to the
calling workflow. For a basis-only request, stop there. Bootstrap and design-system
planning must reuse this document rather than repeat the interview or invent a
second brief. Creating the basis is not completing the design system or custom
coding skill.

Link subsequent architecture, design-system, and code-convention decisions to
their requirements. When an accepted requirement changes, update the basis and
revisit affected decisions, local skills, and checks in the same change. Preserve
decision history where the project uses ADRs.
