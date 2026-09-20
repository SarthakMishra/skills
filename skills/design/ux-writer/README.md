# UX writer

## What it does

`ux-writer` writes and reviews the words inside a product. It connects labels,
instructions, errors, and confirmations to the action a person is taking. Copy
must describe what the system actually does, including its limits.

It can fix one string, write a flow's copy, or review terminology across a
product. It uses the target project's vocabulary and adapts to its audience.

## When to use it

Type `/ux-writer` in Claude Code or `$ux-writer` in Codex, or let the agent
select it when a task fits.

| Situation                                                  | What it covers                                                         |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| A control says "Submit" but the consequence is unclear.    | A label that predicts the action.                                      |
| An error leaves people wondering what happened.            | The known result, preserved work, and a valid next step.               |
| A destructive action hides its scope.                      | A confirmation that names affected data, people, timing, and recovery. |
| Different screens use different names for the same object. | A vocabulary review and consistent replacements.                       |

For a broken interaction or a confusing journey, use [ux-guide](../ux-guide/README.md).
Marketing pages and long-form editorial writing are outside this skill's scope.

## Give the words a context

Provide the surrounding screen, design, requirements, or code, along with any
known constraints. A button label depends on whether it saves a draft, sends a
message, or commits a payment. Unknown behavior remains a product question until
there is evidence for it.

Small requests get one recommended version and a short rationale. Larger flows
or audits get a copy table that separates existing text from proposed text.

## Common questions

**Will it make everything sound like HEY or Basecamp?**

It uses plain language, explanations beside controls, and explicit consequences,
following your product's vocabulary and tone. The source
examples are evidence of those patterns, not strings to copy into another
product.

**Can it work from a screenshot?**

Yes, for the visible text and layout. It marks inferred behavior and asks about
unknown consequences when they would change the copy.

**What if better words cannot fix the problem?**

It identifies the interaction change needed. It does not promise undo, successful
delivery, or saved work that the system cannot provide.

## Check the result

- A control's label predicts what happens when you use it.
- An error explains what is known and offers a recovery the product supports.
- A destructive confirmation names the scope, timing, and reversibility.
- The same object keeps the same name across the flow.
- A single-string request gets a focused answer without a full copy audit.

## Where it fits

Use it while designing, building, or reviewing an interface. [ux-guide](../ux-guide/README.md)
covers flow behavior when changing words is insufficient. Both work independently.
See the [design index](../README.md) for the current collection.
