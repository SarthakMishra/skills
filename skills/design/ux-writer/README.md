# UX writer

Use `/ux-writer` in Claude Code or `$ux-writer` in Codex with the interface and
behavior the words must describe:

```text
Rewrite this application's review and submission copy. Use our formal voice,
keep the difference between a saved draft and a submitted application clear,
and cover pending review, success, and failure. Propose copy without editing code.
```

The agent can also select the skill automatically for matching work.

## What it covers

| Request                    | Result                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------- |
| Improve a string or screen | One recommended treatment, tied to the action and surrounding interface.               |
| Write a flow's copy        | Related titles, instructions, actions, and applicable alternate states.                |
| Adapt voice or terminology | Writing choices grounded in the project's principles, audience, and established terms. |
| Audit product copy         | Prioritized findings with evidence, replacements, and checks.                          |
| Build a content system     | Reusable guidance for voice, patterns, terminology, and maintenance.                   |

[SKILL.md](SKILL.md) defines the writing process and routes to four focused
references. It covers the user's purpose, the organization's purpose, writing in
context, and editing for purpose, concision, conversation, and clarity.

## How it handles brand voice

The skill follows your product's voice guidance and vocabulary. It distinguishes
stable voice from tone that changes with the person's situation. A formal service,
a playful game, and a professional tool can use the same process with different
wording. Conversational writing means a coherent exchange, not a mandatory casual
personality.

When voice guidance is missing, the skill uses plain, respectful wording as a
provisional default. It can help define a product voice when requested, but a
single label does not require a branding exercise. Examples illustrate decisions;
they are not a brand or a universal string library.

## Give it context

Provide the screen, design, requirements, or code and any existing voice or
terminology guidance. Include the behavior behind consequential actions, such as
whether submission is final, a draft survives failure, or retry can duplicate work.
The agent uses available evidence and identifies missing facts that change meaning.

Small requests get a focused answer. Larger changes can include a copy table tied
to states and locations. Rendering and user comprehension remain unverified until
those checks actually happen.

## Check the result

- Labels predict the action and distinguish different outcomes.
- Copy uses the product's voice without hiding facts or consequences.
- Errors offer supported recovery; status messages describe the actual state.
- Names remain consistent, and variables and translations retain their meaning.
- Findings distinguish observed defects, proposed improvements, and unverified effects.

## Where it fits

For an app interface spanning UX, system, UI, copy, and implementation, invoke
`design-engineer` once. It uses this skill automatically for new or changed
interface copy. You can still invoke ux-writer alone. Install a missing companion
from this repository with:

```sh
npx skills add SarthakMishra/skills --skill design-engineer ux-guide
```

Use `ux-guide` when the interaction needs to change beyond its wording. If it is
unavailable, keep the work copy-only and report the missing coverage. Marketing
pages, long-form editorial work, and standalone brand strategy are outside this
skill's scope.

## Source and adaptation

This guide draws on Torrey Podmajersky's _Strategic Writing for UX: Drive
Engagement, Conversion, and Retention with Every Word_, second edition,
O'Reilly Media, August 2025, ISBN 9781098174330. The supplied edition was consulted
directly. Page numbers below refer to the book's printed pagination.

| Guide material                                        | Book basis                   |
| ----------------------------------------------------- | ---------------------------- |
| Purpose, audience, and constraints                    | Chapter 1, pages 1 to 15.    |
| Product voice chart and situational tone              | Chapter 2, pages 17 to 45.   |
| Drafting the exchange before arranging the interface  | Chapter 3, pages 47 to 56.   |
| Interface patterns                                    | Chapter 4, pages 57 to 111.  |
| Generated-content requirements and evaluation         | Chapter 5, pages 113 to 154. |
| Four editing passes                                   | Chapter 6, pages 155 to 165. |
| Research and separate usability and voice assessments | Chapter 7, pages 167 to 207. |
| Writing in context, review, and content systems       | Chapter 8, pages 209 to 232. |

The instructions synthesize these methods for agent work. Examples are original;
the skill does not reproduce the book's fictional brands or require the PDF at
runtime. Scope boundaries, evidence labels, and checks against implemented behavior
are adaptations for this repository. English length and readability heuristics
remain contextual aids rather than universal rules or proof that copy works.
