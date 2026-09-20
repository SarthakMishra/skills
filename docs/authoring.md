# Author a skill

Start with the job the skill should handle and a result you can check. Write the
instructions needed to produce that result. Use this guide when adding or editing
skills, their READMEs, or repository instructions.

Use the `unslop` skill whenever drafting or revising any Markdown file in this
repository, including skills, references, READMEs, and documentation. Apply it
while writing and review the finished draft for remaining patterns. Preserve
technical meaning, code examples, and quoted source text.

## Create only what the skill needs

Keep each skill at `skills/<category>/<skill-name>/SKILL.md`, using the
[Agent Skills format](https://agentskills.io/specification). Add a category with its
first skill. Keep UI and UX design in `design`; add `frontend` when an
implementation skill needs it.

```markdown
---
name: my-skill
description: Describe the job and the situations that should trigger it.
---

# My skill

State the outcome, the decisions that matter, and how to check the result.
```

Match the name to the skill directory. Use 1 to 64 lowercase letters, digits, or
hyphens, with no leading, trailing, or consecutive hyphens. Keep names unique
across categories and descriptions non-empty, with at most 1024 characters.

Keep one canonical copy. Add `references/`, `scripts/`, or `assets/` only when the
work needs them. Keep required resources inside the skill so it can be installed
independently. State required tools or agent-specific features in the optional
`compatibility` field.

## Choose who starts the work

Automatic discovery uses the agent's context; explicit invocation asks the person
to remember which skill to choose. Decide where that choice belongs.

| Mode          | Use when                                                                  | Description                                        |
| ------------- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| Model-invoked | The agent should recognize the task, or another skill needs to invoke it. | Name the job and its distinct triggers.            |
| User-invoked  | The person should start the workflow deliberately.                        | Give a short summary for someone choosing a skill. |

Model-invoked skills remain available to the user. Omit
`disable-model-invocation` and leave automatic invocation enabled.

For a user-invoked skill, keep the required `description` but remove automatic
trigger phrasing. Set `disable-model-invocation: true` in `SKILL.md` for Claude
Code and add this to `agents/openai.yaml` for Codex:

```yaml
policy:
  allow_implicit_invocation: false
```

Keep the controls in sync. `user-invocable: false` is a different restriction.
Add `agents/openai.yaml` only when policy or picker metadata needs it. See the
[Claude Code controls](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill)
and [Codex policy](https://learn.chatgpt.com/docs/build-skills#optional-metadata).

A workflow can use a model-invoked skill when it is available. If it needs a
user-invoked skill, tell the person which one to select. Put shared reference
material where readers can access it without invoking an explicit-only workflow.
Document any installation dependency. Avoid relative links to files outside the
installed skill.

## Make triggers specific

A description or reference link should name the material and say when to use it.
Lead with the task. Cover each distinct case once; lists of synonyms add little.

| Weak instruction                                          | Useful instruction                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| Read the references.                                      | For a failed or interrupted journey, read `references/recovery.md`. |
| Use for writing, rewriting, editing, and polishing words. | Use for interface copy, terminology reviews, and copy audits.       |

These are wording examples, not files to create. Apply the same rule to links in
`AGENTS.md`: the reader should know what condition makes a document relevant.
If agents repeatedly skip a needed reference, improve the trigger and try it
again before copying the reference into the main instructions.

Use the same concrete terms in descriptions, instructions, and examples. Prefer
familiar terms such as "draft," "recovery," or "focus restoration" to invented
labels. Define a specialized term where its rules appear.

## Put instructions where they are needed

Use numbered steps when order matters. A reference skill can instead group rules
by the decisions they affect. Choose the form that fits the work.

| Content                                     | Where it belongs                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| Actions and constraints needed on every run | In `SKILL.md`, beside the step they affect.                              |
| Short definitions used throughout the task  | In `SKILL.md`, with their rules and exceptions.                          |
| Detailed guidance for one branch            | In a reference linked from that branch, with a condition for reading it. |

Keep required guidance easy to find. Moving text into another file helps only
when the agent knows when to read it. Keep a concept's definition, examples, and
exceptions together. Maintain each rule in one place.

### Define when a step is complete

Name the evidence required to finish each meaningful step. Cover the requested
scope without expanding it. "Review the form" gives little direction. "For each
changed field, check its label, validation message, and failure recovery" states
what must be inspected.

Separate a proposal, an implemented change, and an exercised result. A list of
suggested checks is not evidence that they passed. Prefer instructions that name
the desired behavior, such as "retain entered values after a failed save." Keep
explicit prohibitions when they protect a real boundary, and state the safe
alternative.

### Split only for a reason

Move branch-specific detail to a reference. Create a separate skill only when it
needs its own trigger or another workflow must invoke it independently.

If an agent rushes a step, first make its completion criterion clearer. Splitting
files alone does not isolate later instructions that are already in context. A
separate stage or handoff is worth considering only if the problem persists and
that separation actually keeps later work out of context.

Add a router only when choosing among user-invoked skills becomes difficult. It
recommends a skill but cannot bypass that skill's explicit invocation
requirement. A short category index is enough while the choices are easy to
scan.

## Edit for useful instructions

Read each paragraph and ask what decision it changes. Remove stale guidance,
repeated rules, and advice the agent already follows without it. Preserve details
that affect correctness, accessibility, permissions, or recovery.

- Write short sentences with concrete verbs. Use sentence-case headings and plain
  punctuation; rewrite sentences that rely on em dashes.
- Keep one name for each concept. Repeat the term when useful, not its entire definition.
- Prefer examples that settle an ambiguity. Cut decorative emphasis and template filler.
- Let configuration and existing files answer easy lookups. Document conventions,
  reasons, and exceptions the agent cannot discover there.
- Remove a rule that adds no useful behavior. If its value is uncertain, compare
  representative outputs before and after the edit.

## Write the skill's README

Put human-facing guidance at `skills/<category>/<skill-name>/README.md`, beside
`SKILL.md`. Explain what the skill does, when to choose it, and how to recognize a
useful result. Include prerequisites and questions only when they help the reader.
Keep the agent's procedure in `SKILL.md` rather than duplicating it in the README.

List the skill in the [root README](../README.md) and its category's README with a
one-line description linked to `SKILL.md`. Link usage guidance to the skill's
README. Group entries by invocation mode and omit empty sections. Update the
indexes, usage guide, and affected links when a skill moves, is renamed, or
changes behavior.

## Check the result

1. Run `pnpm check` for formatting and linting.
2. Check discovery with `pnpm dlx skills add . --list`. Verify local links after moves.
3. Exercise a representative task and a nearby task that should not trigger the
   skill. For branching skills, cover the distinct paths affected by the edit.
4. Check the output and invocation behavior in each intended agent. Exercise any
   changed executable helper and record what was actually verified.

To install a skill for a local trial, run this from the repo root and replace
`my-skill`:

```sh
pnpm dlx skills add . --skill my-skill --agent codex claude-code
```

Formatting and discovery checks do not prove behavior. Confirm that the agent
reads the right references, stays within scope, and meets the completion criteria.

## Attribution

This guide draws on Matt Pocock's
[writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md)
and [skill mechanics](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL-MECHANICS.md).
The wording and examples here apply those ideas to this repository's layout and
independently installed skills.

The initial `ux-guide` and `ux-writer` skills came from the `wekeep` project's
`.agents/skills/` directory. Their references retain the underlying design and
writing sources.

When importing a skill, record its source URL and retain its license and
attribution. Keep credentials and private examples out of published content.
