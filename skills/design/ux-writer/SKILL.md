---
name: ux-writer
description: Write or review product-interface copy, including labels, forms, errors, empty states, onboarding, confirmations, and status messages. Use for a single string, a flow's copy, copy audits, or product vocabulary and content systems. Excludes marketing, long-form editorial writing, and general brand voice work unless the text is part of a product flow.
---

# Write interface copy

Help a person understand where they are, what happened, what they can do, and what
happens next. Copy must match the system's behavior. If words cannot fix the
interaction, identify the smallest behavioral change needed.

Use familiar words and concrete verbs. Put explanations beside the actions they
explain and state the consequences. The HEY/Basecamp evidence informs these
choices; follow the target product's vocabulary and tone. This skill works
without another skill or service.

## Reconstruct the interaction

Read the neighboring title, explanation, controls, and feedback together. Establish
what affects the copy:

- The person's goal, expertise, permissions, language, and accessibility needs.
- Their entry point and the current state, including partial, blocked, or unknown outcomes.
- The object and immediate action.
- What changes, who is affected, when it happens, and whether it can be undone.
- What work survives failure and which recovery actions are available.

Infer low-risk details when reasonable. Ask when an unknown changes the action or
consequence. Separate observed strings from inferred behavior; flag contradictions
between copy and the actual system. Keep unresolved product decisions distinct
from copy variants.

## Use the product's vocabulary

Read the target project's glossary, `CONTEXT.md`, or equivalent domain docs when
present. Otherwise use established terms in the interface and requirements.
Preserve audience-specific professional terms and propose renames explicitly.

Give each object one stable name. Prefer words people recognize over database or
API terms. Match the label to the outcome: saving an existing object, creating one,
and sending it to someone are different actions. Use "you" or "your" when that
clarifies who is acting or affected.

## Draft in context

1. State the interaction contract: who can do what, for which outcome, affecting
   which scope, with what recovery. Keep this as working context for a small request.
2. Assign the information to the title, label, helper text, action, and feedback.
   Explain unfamiliar concepts before a choice, constraints beside the field,
   and consequences before commitment.
3. Draft the primary path, then the applicable empty, partial, loading, success,
   error, permission, and destructive states. Include offline, expired, conflict,
   and zero-result states when the product can produce them.
4. Read the words with the surrounding controls. Check hierarchy, repetition,
   truncation, variables, screen-reader meaning, and how they work without icons.
5. Remove words that add no information. Keep details needed to understand scope,
   timing, consequence, or recovery.

Read the relevant sections of
[interface-patterns.md](references/interface-patterns.md) for component rules and
examples. Read the whole reference for a product-wide audit or copy system.

Read [hey-basecamp-evidence.md](references/hey-basecamp-evidence.md) when
establishing a writing style informed by the sources or explaining those
patterns. Keep captured strings separate from proposed copy; they are evidence,
not a template library.

## Keep consequences precise

- Lead action labels with a specific verb and recognizable object. Use noun
  labels for destinations and modes. A staged action should reveal the next step.
- Explain novelty, meaningful constraints, and consequences. Helper text should
  add information rather than restate a label.
- Distinguish queued, processing, completed, failed, and unknown results. Use exact
  names, amounts, recipients, and timing only when reliable. Never promise unsupported
  persistence, delivery, undo, or safe retry.
- Describe errors without blame and offer a recovery the system supports.
- State destructive scope, timing, reversibility, and effects on data or access.
- Use personality where it helps comprehension. Keep errors, legal choices,
  payments, permissions, security, health, and accessibility instructions factual.
  Remove greetings, apologies, and enthusiasm from routine system feedback.
- Preserve variables as structured tokens such as `{project_name}`. Specify
  fallback, pluralization, and locale behavior where relevant.

## Deliver and check

For a small request, provide one recommended string and a short rationale. For a
flow or audit, use a compact copy table:

| ID / location | State or trigger | Component | Final copy | Behavior / rationale |
| ------------- | ---------------- | --------- | ---------- | -------------------- |

Keep observed and proposed copy distinct. Include constraints, variables, and
accessibility notes only where relevant. For a critique, identify the issue, what
the person may misunderstand or fail to do, and the replacement or interaction
change. Offer alternatives only for a real product or tone tradeoff.

Before finishing, check that the person can identify the object, state, and next
action. Check that primary and secondary controls have distinct outcomes and
that vocabulary stays consistent. Empty states should teach a useful first move,
errors should offer recovery, and success should confirm the actual result.

Check copy in the rendered interface when available, including keyboard and
screen-reader meaning, zoom, narrow layouts, and translation expansion. If only
strings or screenshots were available, say which behavior and rendering checks
remain unverified. Keep the final response proportional to the request.
