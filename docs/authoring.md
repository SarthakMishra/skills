# Author a skill

Write one sentence naming the skill's job and the result that proves it worked.

Use this guide when adding or editing skills, their READMEs, or repository
instructions. Start at the stage that matches your change:

1. [Define the job and create the package](#1-define-the-job-and-create-the-package).
2. [Choose who invokes it and write the trigger](#2-choose-who-invokes-it-and-write-the-trigger).
3. [Write the instructions and completion criteria](#3-write-the-instructions-and-completion-criteria).
4. [Check compatibility and write the usage docs](#4-check-compatibility-and-write-the-usage-docs).
5. [Validate the package and test behavior](#5-validate-the-package-and-test-behavior).

Use `unslop` while drafting or revising any Markdown in this repository. This
includes skills, references, READMEs, and documentation. Review the finished draft
for remaining patterns. Preserve technical meaning, code examples, and quoted
source text.

## 1. Define the job and create the package

### Decide what the skill adds

Supply domain knowledge, conventions, and decisions the model cannot reliably
infer. Identify which need the skill addresses:

| Need                                 | When to revisit it              |
| ------------------------------------ | ------------------------------- |
| Compensate for a model's weakness    | When the model changes          |
| Encode the team's preferred workflow | When the team's process changes |

Keep a rule when removing it causes a real failure.

### Create the smallest useful package

Keep one canonical copy at `skills/<category>/<skill-name>/SKILL.md`. Use the
[Agent Skills format](https://agentskills.io/specification).

Add a category with its first skill. Keep UI and UX design in `design`; add
`frontend` when an implementation skill needs it.

```markdown
---
name: my-skill
description: Describe the job and the situations that should trigger it.
---

# My skill

State the outcome, the decisions that matter, and how to check the result.
```

Check the metadata:

- Match `name` to the skill directory and keep it unique across categories.
- Use 1 to 64 lowercase letters, digits, or hyphens. No leading, trailing, or
  consecutive hyphens.
- Keep `description` non-empty and at most 1024 characters.
- Use the optional `compatibility` field for required tools or agent-specific
  features.
- Follow the standard's required metadata even when a host accepts looser input.

### Add resources only when needed

Add `references/`, `scripts/`, or `assets/` when the work needs them. Keep required
resources inside the skill so it can be installed independently. Avoid relative
links outside the installed skill, and document installation dependencies.

Add a script when deterministic behavior matters or the task repeatedly requires
fragile code. Verify dependencies, tools, network access, and package installation
in each intended environment. A valid package does not guarantee that its host
can execute it.

For imported skills, record the source URL and retain the license and attribution.
Keep credentials and private examples out of published content.

## 2. Choose who invokes it and write the trigger

### Choose the invocation mode

Automatic discovery spends the agent's context. Explicit invocation asks the
person to remember which skill to choose. Decide who should make that choice.

| Mode          | Use when                                                                            | Description                                        |
| ------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| Model-invoked | The agent should recognize the task, or another workflow needs to invoke the skill. | Name the job and its distinct triggers.            |
| User-invoked  | The person should deliberately start the workflow.                                  | Give a short summary for someone choosing a skill. |

For a **model-invoked skill**, omit `disable-model-invocation` and leave automatic
invocation enabled. The user can still invoke it explicitly.

For a **user-invoked skill**:

1. Keep the required `description`, but remove automatic trigger phrasing.
2. Set `disable-model-invocation: true` in `SKILL.md` for Claude Code.
3. Set the matching Codex policy in `agents/openai.yaml`:

```yaml
policy:
  allow_implicit_invocation: false
```

Keep both controls in sync. Add `agents/openai.yaml` only when policy or picker
metadata needs it.

Claude Code's `user-invocable: false` does something different: it hides the skill
from the user menu while retaining automatic invocation. See the
[Claude Code controls](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill)
and [Codex policy](https://learn.chatgpt.com/docs/build-skills#optional-metadata).

### Handle dependencies between skills

A workflow can invoke an available model-invoked skill. If it needs a user-invoked
skill, tell the person which one to select. Keep shared reference material
accessible without invoking an explicit-only workflow.

Add a router only when choosing among user-invoked skills becomes difficult. The
router recommends a skill; it cannot bypass explicit invocation. Use a short
category index while the choices remain easy to scan.

### Write a precise description

1. Put the distinguishing task and trigger first.
2. Cover each distinct case once. Cut synonyms that repeat the same trigger.
3. Add exclusions when neighboring tasks cause false activations.
4. Test the description alongside the other skills installed with it.

Use the same concrete terms in descriptions, instructions, and examples. Prefer
familiar terms such as "draft," "recovery," or "focus restoration." Define
specialized terms where their rules appear.

### Diagnose missing activations

Hosts may shorten descriptions when many skills are installed. As of September
20, 2026, Codex budgets its initial catalog at 2% of the context window, or 8,000
characters when the window size is unknown. It shortens descriptions first and
may omit skills with a warning. The selected skill's full body still loads.

Check the [host's discovery rules](https://learn.chatgpt.com/docs/build-skills)
when a skill never activates.

## 3. Write the instructions and completion criteria

### Make the next action easy to find

Apply these writing rules throughout skills, READMEs, and documentation. Keep the
information needed to act beside the action, so readers can resume without
remembering earlier sections.

1. Lead with the action or answer. Put the command, path, or snippet first when
   that is what the reader needs. Make the first action small and specific.
2. Number multi-step work. Give each step one bounded action. Remove unnecessary
   steps and fold trivial ones into the action they support.
3. Aim for at most five items per group. Split longer lists under descriptive
   headings and put the most relevant group first. Keep all important information
   available; grouping must not remove requirements, exceptions, or options.
4. Make progress visible. At a handoff or checkpoint, state what now works and
   where work resumes. In interactive workflows, update one checklist with one
   item in progress instead of repeating the full plan in prose.
5. When work remains, end the procedure with one concrete next action the reader
   can start in under two minutes. When the task is complete, stop.

For example, replace "Update the skill and check it" with:

```text
1. Open skills/<category>/<skill-name>/SKILL.md.
2. Replace the description with the agreed trigger wording.
3. Run pnpm check from the repository root.
```

### Keep the reader on the current task

- Resolve questions that affect the current task where they arise. Keep unrelated
  work separate. In interactive workflows, ask an unresolved question once,
  where its answer is needed, and defer optional follow-ups until the end.
- When timing helps someone plan work, give an estimate in concrete units and
  name its assumptions: "About 10 minutes if the test environment is ready."
  Estimate the work the reader must perform; avoid unsupported precision.
- State errors plainly. Name the failed check, expected and actual behavior,
  known cause, and next diagnostic or fix. Mark an unknown cause as unknown.
- Cut introductions that announce the answer, repeated recaps, praise, and closing
  pleasantries. Report a concrete result once. Replace idioms with literal actions.
- Remove hedges that add no information. Keep qualifications that express real
  uncertainty or limit what the evidence supports.

### Preserve detail when the task needs it

These defaults shape presentation; they do not limit analysis or completeness.

- For explanations and walkthroughs, include the full reasoning the reader needs
  and use headings so they can find their place again.
- For comparisons, show the relevant options and tradeoffs. Rank recommendations
  when justified; do not force a single action when the choices are the answer.
- Preserve warnings and approval requirements for destructive actions. Follow the
  actual authorization boundary and higher-priority agent instructions, including
  required tool announcements. Do authorized work instead of offering to do it.
- For ambiguity that changes the result, ask one focused question. In interactive
  troubleshooting, after three unsuccessful attempts, identify the assumption to
  recheck and ask for the missing diagnostic evidence instead of repeating fixes.

### Choose how much procedure to specify

Specify exact commands or sequences when deviating would affect correctness.
Otherwise, state the outcome and constraints and let the model choose ordinary
implementation steps.

A reference skill can group rules by the decisions they affect.

### Put each rule where it is needed

| Content                                     | Location                                                                |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| Actions and constraints needed on every run | In `SKILL.md`, beside the relevant step                                 |
| Short definitions used throughout the task  | In `SKILL.md`, with their rules and exceptions                          |
| Detailed guidance for one branch            | In a reference linked from that branch, with a condition for reading it |

Keep each concept's definition, examples, and exceptions together. Maintain each
rule in one place. Link references directly from `SKILL.md`, without chains of
references.

A description or reference link must name the material and say when to use it:

| Weak instruction                                          | Useful instruction                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| Read the references.                                      | For a failed or interrupted journey, read `references/recovery.md`. |
| Use for writing, rewriting, editing, and polishing words. | Use for interface copy, terminology reviews, and copy audits.       |

These are wording examples, not files to create. Apply the same rule to links in
`AGENTS.md`. If agents skip a needed reference, improve its trigger and try again
before copying the reference into the main instructions.

The [format specification](https://agentskills.io/specification) recommends fewer
than 5,000 tokens and 500 lines in the main file. These are guidelines, not target
lengths or proof of quality. Keep material needed on every run inline.

### Define what counts as done

For each meaningful step, specify:

1. Required inputs and the source of truth. Require current-source lookup when
   freshness matters.
2. The requested scope and checkable evidence of completion.
3. What to do when evidence is missing. Separate observed facts from hypotheses.
4. The final deliverable and the checks sufficient to finish.
5. Any action that needs approval. Continue authorized work without adding
   approval steps for routine choices.

Replace "Review the form" with "For each changed field, check its label,
validation message, and failure recovery." Name the desired behavior, such as
"retain entered values after a failed save."

Distinguish a proposal, an implemented change, and an exercised result. Suggested
checks are not evidence that they passed. After required checks pass, broaden
verification only for a new change, failure, or unresolved concern.

Keep explicit prohibitions when they protect a real boundary, and state the safe
alternative. Cover the requested scope without expanding it.

### Split only when the split helps

- Move branch-specific detail to a reference. A multi-workflow skill can use a
  short entry point to select the relevant branch.
- Create a separate skill when it needs its own trigger or another workflow must
  invoke it independently.
- If an agent rushes a step, clarify its completion criterion first. Consider a
  separate stage or handoff only if the problem persists and the separation
  actually keeps later work out of context.

Splitting files does not isolate instructions already loaded into context. Moving
text helps only when the agent knows when to read it.

### Remove instructions that do not help

Audit the skill alongside repository and application instructions. Resolve
conflicts before adding rules. Preserve correctness, accessibility, permission,
and recovery requirements.

1. Ask what decision each paragraph changes. Remove stale guidance, repetition,
   and advice the model already follows.
2. Write short sentences with concrete verbs, sentence-case headings, and plain
   punctuation. Rewrite sentences that rely on em dashes.
3. Keep one name per concept. Repeat the term when useful, not its definition.
4. Keep examples that resolve ambiguity. Cut decorative emphasis and template
   filler.
5. Let configuration and existing files answer easy lookups. Document conventions,
   reasons, and exceptions the agent cannot discover there.

Use the [behavior evaluation](#5-validate-the-package-and-test-behavior) when a
rule's value is uncertain. Shorter text alone does not establish an improvement.
Revisit instructions after model upgrades; a procedure that helps one model may
hinder another.

Before handing off a document, read its opening and each procedure's ending. The
reader should be able to find the starting action, the expected result, and the
next action if work remains. Remove any opening that merely announces the work,
closing that repeats it, or sidebar that distracts from it.

## 4. Check compatibility and write the usage docs

### Separate the model from the host

Verify the skill's content, the host's loading and execution rules, and the model's
behavior separately. Keep model settings and application-wide behavior in the
application's configuration or instructions.

The findings below were checked on September 20, 2026. Apply an adjustment when
the behavior occurs, then evaluate it. Do not copy every adjustment into every
skill.

### Account for model-specific behavior

- [GPT-6 Astra](https://developers.openai.com/api/docs/guides/latest-model) can pause
  on conflicting instructions, stop early, or expand verification unnecessarily.
  Resolve conflicts and define completion, authorized scope, and sufficient checks.
- [Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)
  can underuse search at low effort, add work or tests, stop early, or rewrite whole
  files. Require lookup for current facts, define scope, and prefer targeted edits
  when preserving existing content matters.
- [Gemini guidance](https://ai.google.dev/gemini-api/docs/prompting-strategies#gemini-3)
  favors direct goals, consistent structure, explicit verbosity, and examples.
  Internal reasoning generally need not be narrated. Specify the output and test
  whether examples resolve task ambiguity.

Compare effort levels on the intended tasks. Fable 5.1 recommends starting at
`high` and testing alternatives. Equal effort names do not imply equal computation
across models.

Configure general delegation, independent tool batching, and progress updates at
the application level. If updates are missing, check whether the client displays
them before adding prompt instructions.

### Check permissions and runtime dependencies

In [Claude Code](https://code.claude.com/docs/en/skills), `allowed-tools` grants
approval for listed tools. It does not restrict the available tool set. Loaded
instructions persist across turns; those grants have a shorter lifecycle. Use the
host's permission controls for enforcement.

Check the [runtime constraints](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#runtime-environment-constraints)
when choosing dependencies:

| Environment                   | Constraint                                        |
| ----------------------------- | ------------------------------------------------- |
| Anthropic API skill container | No network access or runtime package installation |
| Claude Code                   | Uses the local execution environment              |
| claude.ai                     | Network access depends on settings                |

### Write the README and update indexes

1. Put human-facing guidance at `skills/<category>/<skill-name>/README.md`, beside
   `SKILL.md`.
2. Explain what the skill does, when to choose it, and how to recognize a useful
   result. Include prerequisites and questions only when they help the reader.
3. Keep the agent's procedure in `SKILL.md`; avoid duplicating it in the README.
4. List the skill in the [root README](../README.md) and category README. Use a
   one-line description linked to `SKILL.md`, and link usage guidance to the skill's
   README. Group entries by invocation mode and omit empty sections.
5. Update indexes, usage guidance, and affected links when a skill moves, is
   renamed, or changes behavior.

## 5. Validate the package and test behavior

### Run the checks required by the change

1. Run `pnpm check` for formatting and linting.
2. For skill additions or packaging changes, run `pnpm dlx skills add . --list`.
   Verify local links after moves.
3. For behavior changes, test automatic selection with ordinary requests and nearby
   requests that should not trigger a model-invoked skill. Test explicit invocation
   separately and cover each affected branch.
4. Check artifacts and execution in each intended agent and model. Exercise every
   changed executable helper.
5. Record which checks ran and which remain proposed. Confirm that the agent reads
   the right references, stays within scope, and meets the completion criteria.

Formatting and discovery checks do not prove behavior. Forced invocation does not
prove automatic selection.

To install a skill for a local trial, replace `my-skill` and run from the repo root:

```sh
pnpm dlx skills add . --skill my-skill --agent codex claude-code
```

### Compare versions when creating or optimizing a skill

1. Collect routine and ambiguous requests, known failures, nearby non-triggering
   requests, and affected recovery paths.
2. Reserve some requests for evaluation. Do not use every case to tune the wording.
3. Run the same tasks without the skill, with the current version if one exists,
   and with the candidate. Keep starting files, tools, permissions, and model
   settings equivalent.
4. Grade artifacts and actual state against outcome, required process, style, and
   efficiency criteria. Require a tool sequence only when it affects correctness.
5. Inspect failures in the trace and artifacts. Repeat uncertain cases in clean
   sessions and report each model and effort setting separately.

### Measure quality and cost together

Record these results:

| Measure                                    | What it reveals                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| Task success and critical failures         | Whether the skill produces the required result                           |
| Missed and false activations               | Whether the trigger selects the right tasks                              |
| Human interventions                        | Where the workflow needs help                                            |
| Elapsed time                               | How long completion takes                                                |
| Token or monetary cost per successful task | Whether lower cost reflects useful completion rather than cheap failures |

Keep critical failures visible instead of averaging them into one score. Prefer
the smallest version that meets the required quality and reliability. Recheck
behavior when models, tools, agent applications, or neighboring skills change.

Use deterministic checks for objective requirements. Use a clear rubric with human
review for qualitative requirements. Anthropic's
[skill-creator evaluation tools](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills)
support isolated runs, blind comparisons, trigger tuning, and token and time
benchmarks. Choose tooling appropriate to the skill. Review generated evaluations.

### Keep evidence limits visible

No cited source establishes a universal best length or performance gain across
frontier models. A [June 2026 skill evaluation study](https://arxiv.org/html/2606.17819v1)
found model-dependent gains, but disclosed skill relevance to agents, used one
model judge, and emphasized software tasks while excluding difficult environments.
Use these findings to design local tests, not to assume discovery or task success.

## Sources and attribution

The authoring and evaluation guidance incorporates:

- OpenAI's [September 2026 skill guidance](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)
  and [skill evaluation workflow](https://developers.openai.com/blog/eval-skills).
- Anthropic's [authoring practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
  and [agent evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).
- Matt Pocock's [writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md)
  and [skill mechanics](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL-MECHANICS.md).

Research sources were checked on September 20, 2026. Undated documentation can
change. Wording and examples here apply the guidance to this repository's layout
and independently installed skills.

The action-first writing guidance adapts the user-provided `i-have-adhd` skill,
whose metadata declares the MIT license. Its documentation rules are included
here and require no separate skill installation.

The initial `ux-guide` and `ux-writer` skills came from the `wekeep` project's
`.agents/skills/` directory. Their references retain the underlying design and
writing sources.
