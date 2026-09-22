# Author skills and docs

Write one sentence naming the skill's job and the result that proves it worked.

Use this guide when adding or changing a skill, README, reference, or repository
instruction. Keep the document self-contained. Put guidance here instead of
requiring a separate writing or productivity skill.

Use the repository's existing files as the source of truth. Run `pnpm check`
before handoff.

## 1. Define the job and scope

### Keep only rules that change behavior

Add a rule when removing it could cause a real failure or break a team
convention. Delete explanations the agent can infer from the task, package
configuration, or file layout.

Bad: "Use thoughtful, high-quality engineering practices."

Good: "Run the project's existing type check after changing a public component
prop."

Keep the requested scope visible. A skill that audits code must not edit it. A
skill that implements a change must say what evidence proves the change works.

### Keep one canonical package

Store a skill at:

```text
skills/<category>/<skill-name>/
├── SKILL.md
├── README.md
└── references/  # only when a branch needs separate guidance
```

Keep the main instructions in `SKILL.md`. Add `references/`, `scripts/`, or
`assets/` only when they support a real branch of the task. Keep required files
inside the package so the skill can be installed independently.

For imported content, preserve required license notices in the package. Keep
credentials and private examples out of published files. Do not add source
histories, research appendices, or background sections that do not help the
agent complete the task.

When a resource or helper needs a runtime, record the requirement in
`compatibility` and verify that the target host has the needed tool, package
manager, network access, and permission. Keep human-only setup steps explicit.

### Keep provenance separate from runtime guidance

Use current primary documentation while writing time-sensitive technical
guidance. Put required license and attribution notices in a README or notice
file. Keep source lists, research histories, and date-stamped notes out of
SKILL.md unless the agent must open that source to make a decision. Put the
version, configuration, and compatibility assumption beside the rule.

Bad: "The old API is gone."

Good: "For package version 4 and later, use newApi. Keep oldApi for consumers
below version 4. Check the package support range before changing a public
library."

### Check the metadata

Use this minimum frontmatter:

```markdown
---
name: my-skill
description: Describe the job and the situations that should trigger it.
---
```

- Match `name` to the directory.
- Use 1 to 64 lowercase letters, digits, or hyphens.
- Keep `description` non-empty and under 1024 characters.
- Add `compatibility` only for required tools or runtime features.
- Keep `disable-model-invocation` and any `agents/openai.yaml` policy in sync.

## 2. Choose invocation and write the trigger

### Pick one invocation mode

| Mode          | Choose it when                                   | Metadata                              |
| ------------- | ------------------------------------------------ | ------------------------------------- |
| Model-invoked | The agent should recognize the task on its own.  | Omit `disable-model-invocation`.      |
| User-invoked  | The person must deliberately start the workflow. | Set `disable-model-invocation: true`. |

Model-invoked skills need a precise description because it stays in the
discovery catalog. User-invoked skills should use a short human-facing summary.

### Write a precise description

1. Put the distinguishing task first.
2. Name each real trigger once. Remove synonym lists.
3. State nearby tasks that must not trigger the skill.
4. Use the same terms in the description, instructions, and examples.

Bad: "Use for design, styling, UI, frontend, visual, and interface work."

Good: "Build or audit shared React components, Tailwind tokens, and shadcn/ui
conventions. Skip isolated page styling and user-flow work."

### Handle skill dependencies

Reference another skill only when the host can resolve it and the dependency
changes the result. Keep the shared decision in the current skill. A
user-invoked companion cannot be silently invoked or installed.

Bad: "Read every skill in this category before starting."

Good: "For a missing project basis, use the project's conventions workflow and
reuse its accepted document."

Do not create a separate writing skill dependency for formatting, clarity, or
anti-filler rules. Those rules live in this guide.

## 3. Write actionable instructions

### Keep `SKILL.md` as a usable map

The entry point must contain:

1. The job, scope, and first action.
2. A short workflow with a completion condition for each meaningful step.
3. Constraints that apply on every run, including authorization and evidence limits.
4. Direct reference links that name when to read each branch and what it decides.

Put detailed recipes, examples, and branch-specific checks in their owning
references. Do not create references just to split a short skill into more files.

### Compose multi-branch guidance

Keep shared rules in SKILL.md and move each real branch into one named reference.
Use a reference when the branch needs its own workflow, examples, or checks. Keep
the entry point as the map.

Bad: one SKILL.md with flags for forms, migration, performance, and server
rendering, followed by repeated conditional rules.

Good: one shared workflow with focused references such as actions.md,
migration.md, and performance.md. Each reference owns its branch-specific
examples and completion checks.

### Make the next action easy to find

- Start with the action, command, path, or answer.
- Number sequential work. Give each step one bounded action.
- Keep groups to five items when possible. Preserve required detail when completeness matters.
- Put the rule, exception, and example together.
- End a procedure with a concrete next action or a clear completion condition.

Bad: "Update the skill and check it."

Good:

```text
1. Open skills/<category>/<skill-name>/SKILL.md.
2. Replace the description with the agreed trigger wording.
3. Run pnpm check from the repository root.
```

Give each paragraph one job. Use sentence-case headings. Use plain words and
active voice. Avoid em dashes, filler, praise, vague promises, idioms, and
generic closing sentences. State errors with the failed check, cause when known,
and next diagnostic or fix.

Bad: "There seems to be an issue with the configuration."

Good: "`pnpm check` fails in `SKILL.md:18`: the link points to a missing file.
Fix the path, then rerun the check."

### Make defaults and exceptions explicit

State the default, the condition that changes it, and the check that accepts the
exception.

| Vague rule                  | Actionable rule                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Use an appropriate layout.  | Default to one column. Use a row only while both fields and labels fit.                                          |
| Add a short animation.      | Reuse the existing recipe. If none exists, keep UI motion under 300ms and check interruption and reduced motion. |
| Add more testing if useful. | Exercise the changed failure path. Repeat passed checks only after a new change, failure, or unresolved concern. |
| Use tokens consistently.    | Use the existing semantic role. Add a new role only for a repeated meaning and record its consumers.             |

Do not invent numeric thresholds to sound precise. Keep a number when it is a
chosen project default, a tool requirement, or an observable acceptance check.

### Label versioned advice

When a rule depends on a library version, framework, feature flag, or build
setting:

- State the minimum version or required configuration.
- Separate the current default from the compatibility path.
- Mark experimental or unverified behavior as such.
- Do not describe a deprecation as a removal.

Bad: "Do not use oldApi. It is deprecated."

Good: "Use newApi by default on version 4+. Keep oldApi when the package still
supports version 3, and verify the public support range before removing it."

### Treat examples as acceptance checks

Every non-obvious rule needs a Bad/Good or Before/After pair for the same task
and scope.

- Label the failure in the Bad example.
- State whether each snippet is conceptual or runnable.
- Name version, framework, configuration, and omitted setup assumptions.
- For runnable examples, exercise the smallest meaningful behavior. Syntax alone
  does not prove the example works.
- State the reason or observable check that accepts the Good example.

Bad: "Use a shared component when appropriate."

Good: "Compose `Input`, `Button`, and `Popover` for a one-off filter toolbar.
Add a shared variant only when the same behavior recurs and has one contract."

### Keep concepts in one place

| Content                          | Location                             |
| -------------------------------- | ------------------------------------ |
| Rules needed on every run        | `SKILL.md`, beside the relevant step |
| Short definitions and boundaries | `SKILL.md`                           |
| One branch's detailed recipe     | A reference linked from that branch  |
| Human-facing use and examples    | The package `README.md`              |
| Executable values                | Project source and configuration     |

Do not copy the same rule into the entry point, README, and references. Improve a
weak reference trigger before copying its contents into the main file.

### Define completion

For every meaningful step, state:

1. The required input and source of truth.
2. The requested scope.
3. The evidence that marks the step complete.
4. What to do when required evidence is missing.

Distinguish a proposal, an implemented change, and an exercised result. A
suggested check is not evidence that it passed. Report unavailable checks as
unverified.

## 4. Apply UI system guardrails

Use this section when authoring a UI or design-system skill for React, Tailwind,
or shadcn/ui.

### Start with installed shadcn defaults

Read `components.json`, the theme CSS or Tailwind config, and local
`components/ui` before proposing new foundations. Reuse the installed shadcn
component, control library, semantic roles, radius, spacing, and state
attributes. Change a default only for a product requirement, accessibility need,
or repeated consumer need.

Bad: create `PrimaryButton` because one page wants a different color.

Good: add a named variant to the existing `Button` when several consumers need
the same behavior and visual contract.

### Compose before extending

Use Atomic Design as an ownership guide:

- An atom owns one control, such as `Button` or `Input`.
- A molecule composes atoms for one task, such as `FormField` or `SearchField`.
- An organism composes molecules into a reusable section, such as `DataToolbar`.

Compose existing parts for a feature. Extend a shared component only when the
same behavior or visual choice recurs and can be named as a variant or size. Add
a new component only when existing parts cannot express the accessible behavior
without hacks. Keep one-off compositions in feature code.

### Use shadcn authoring patterns

- Use `cva` for explicit visual variants and sizes. Keep defaults and variant definitions with the component.
- Use `cn` to merge generated classes with allowed consumer classes.
- Keep component-owned padding, radius, color, typography, and motion inside the component.
- Allow layout classes only when the contract permits them.
- Preserve native elements, refs, ARIA relationships, keyboard behavior, and state attributes.
- Keep feature data and business rules outside presentational components.

Bad: `<Button className="p-[13px] rounded-[3px] bg-blue-600" />`. It restyles
owned properties and creates a second visual contract.

Good: `<Button size="lg" className="mt-4 md:w-full" />` when the component
contract allows layout changes.

### Name and maintain tokens

Name tokens by semantic role, not by a temporary color, page, or component.
Keep primitive values separate from semantic roles. Use a nested tree to explain
grouping when needed, but follow the project's existing CSS variable and Tailwind
syntax. Do not introduce a token file format or conversion step unless the task
requires it.

Bad: `gray-50`, `button-blue`, or `card-padding` scattered through components.

Good: `bg-primary`, `text-muted-foreground`, and existing spacing utilities that
resolve through the shared theme.

### Prevent decay

Design-system guidance must explain how the project catches drift. For a
Tailwind project that supports it, use `@shadcn/lint` with the existing ESLint or
Oxlint setup. Configure only the rules the contract needs, such as no raw colors,
no arbitrary values, no component restyling, static classes, or unknown classes.
Add component contracts that allow layout while protecting owned styles.

Test a real violation, an approved use, and a documented exception. Do not add a
second custom parser for a rule the project's linter already provides.

### Keep motion purposeful

Before adding animation, state its purpose, frequency, and effect on the next
action. Use instant feedback for repeated keyboard and list interactions. Keep
ordinary UI motion fast, preserve focus and state during interruption, and check
reduced motion. A rare orientation or confirmation transition can justify motion;
an animation with no user-facing purpose should be removed.

## 5. Write README and index entries

Put human-facing guidance in `skills/<category>/<skill-name>/README.md`. It should
explain what the skill does, when to choose it, useful request examples, and what
a successful result looks like. Keep the agent procedure in `SKILL.md`.

Update the root README and category README when adding, renaming, moving, or
changing a skill's trigger. Use local links and one-line descriptions. Do not add
source lists, research histories, or external skill references to these indexes.

If a skill moves, update every affected local link and remove the old path.

## 6. Validate the package

### Review the documents first

Check every changed `SKILL.md`, reference, README, and example:

1. The opening names the first action and the result.
2. The entry point maps the workflow and branch references without duplicating them.
3. Each rule has a default, an exception when needed, and a completion check.
4. Important decisions have clear `Bad`/`Good` examples.
5. The text contains no unrelated skill dependencies, source appendix, stale background material, or unnecessary external material.

### Run repository checks

1. Run `pnpm check`.
2. For skill additions or packaging changes, run `pnpm dlx skills add . --list`.
3. Verify every local reference link and anchor after a move or rename.
4. Exercise every changed executable helper with its meaningful behavior.
5. Test model-invoked skills with matching and nearby non-matching requests. Test explicit invocation separately when it has a different path.

Formatting and discovery checks do not prove that instructions are useful. A
forced invocation does not prove automatic selection. Record which checks passed
and which remain unverified.

### Keep the smallest useful evaluation

For a behavior change, collect a few routine requests, one ambiguous request, one
nearby request that should not trigger the skill, and the affected recovery path.
Reserve some cases for evaluation instead of tuning every example against every
case. Compare the result against the previous version when one exists.

Grade the artifact and actual state for:

- task success and critical failures
- correct and incorrect activations
- required process and scope
- human intervention
- time and token cost when measurement is available

Keep critical failures visible. Prefer the smallest version that meets the
completion criteria.
