---
name: establish-conventions
description: Establish or revise project architecture and engineering conventions through grilling and primary-source research. Use an existing PRD, spec, or architecture basis, or establish the missing document through a scoped interview. Create or maintain a repo-specific coding skill covering organization, documentation, complexity, code patterns, testing, and tooling. Use during bootstrap, when conventions are missing or inconsistent, or when a tool or library changes shared rules. Excludes unrelated product brainstorming and routine coding already covered by local conventions.
---

# Establish project conventions

Read the agreed PRD, spec, or architecture basis. Establish missing requirements
through a scoped interview before choosing dependent conventions.

Produce architecture decisions, enforceable conventions, and a custom skill for
the repository. Use the project's language,
constraints, and existing decisions. Do not copy another project's stack or
domain rules.

The output is a model-invoked project skill, usually `code-conventions`, that
agents read while coding and reviewing. This workflow establishes and revises
those rules. Routine work uses the resulting skill without restarting the
interview or researching the whole architecture.

## 1. Establish the basis and scope

Read the PRD, spec, or architecture basis, its settled decisions from
`wayfinder`, `grill-me`, or the equivalent earlier discussion, and relevant
project instructions. Inspect existing architecture docs, ADRs, domain
vocabulary, local skills, source, dependencies, toolchain pins, tests, CI, and
the current Git state. Existing code is evidence of practice, not proof that a
convention is correct.

For initial establishment, use a document that identifies the product's job,
supported users or consumers, behavior, exclusions, and constraints. If it is
missing or incomplete, read [project-basis.md](references/project-basis.md),
grill the unresolved requirements, and draft the appropriate PRD, spec, or
architecture document. Review its decisions with the user before dependent
implementation. Do not require a separate user-invoked discovery workflow or
invent answers.

For a later convention change, use the existing basis and accepted decisions as
the baseline. Obtain only the new requirement or evidence that justifies the
change. Do not require a fresh discovery session for each revision.

Record the requested result and permitted changes. Distinguish initial setup,
adoption in an existing repo, a targeted convention revision, and an options-only
review. An options-only request produces a proposal and leaves project files
unchanged. Work inside bootstrap stays within its foundation scope.

### Handle basis-only and bootstrap requests

When a caller requests only the missing project basis, follow the project-basis
reference and return the agreed document without generating conventions yet.
When bootstrap calls this workflow during planning, complete the interview,
research, and proposal first. Return those decisions to its shared plan and mark
the custom skill and enforcement as pending. Resume their creation and
verification after scaffolding and companion setup establish the target files
and docs layout. Do not claim this workflow complete at the planning handoff.

Finish with a map of requirements, current practices, settled decisions, gaps,
and conflicts. Identify the existing local skill to update before choosing a new
name or location.

## 2. Grill the unresolved decisions

Use the model-invoked `grilling` skill when available. Otherwise use this process.
If the full interview workflow is required, ask the user to install it with
`npx skills add mattpocock/skills --skill grilling` before dependent work.
Group decisions by dependency and ask independent questions in manageable rounds.
For each question, explain the consequence, viable choices, and a recommendation
with its evidence. Wait for answers before asking questions that depend on them.
Read facts from the repo or research them; do not ask the user to perform lookups.

Read [decision-areas.md](references/decision-areas.md) and account for every area
that applies. Challenge contradictions between the spec, existing decisions, and
the proposed implementation. Ask what must remain simple, which changes are likely,
who maintains the code, what failures are unacceptable, and what the team will
actually test and document. Avoid a generic questionnaire about every technology.

Research and interviewing are iterative. Use initial findings to frame questions,
then investigate decisions that the answers make relevant. Reuse prior answers
from bootstrap or discovery. Resolve consequential conflicts with the user rather
than silently replacing an accepted stack, compatibility promise, or constraint.

### Close the decision round

Keep a decision record with the question, alternatives, evidence, answer, remaining
uncertainty, and affected rules. Mark an area not applicable with its reason rather
than inventing a policy for it. End when applicable decisions are settled or have
an explicit deferral with an owner and revisit condition. Confirm shared
understanding of the concrete proposal; prior approval covering it still counts.

## 3. Research and test the choices

Read [research-and-adoption.md](references/research-and-adoption.md). Do substantive
research for each consequential architecture, language-pattern, test, or tooling
choice. Use current official documentation, specifications, source, release notes,
and evidence from the installed versions. Read relevant sources in depth rather
than collecting search-result links. The [source guide](references/sources.md)
provides starting points, not a universal policy.

Compare existing code, the standard library or platform, installed dependencies,
new libraries or tools, and a custom implementation where they could meet the
requirement. Justify the choice with its complete maintenance cost. Prefer the
smallest option that meets the contract; neither fewer dependencies nor a popular
library is sufficient evidence by itself.

Keep a cited research note using the project's convention, or a task-scoped
temporary note when none exists. Record versions, dates, limitations, and the
tests performed. When research delegation is available and permitted, delegate
independent questions while continuing local inspection and interviews. Otherwise
research them directly. Required evidence does not depend on a companion skill.

### Test consequential assumptions

Exercise uncertain claims in a small, disposable experiment when they affect the
decision. Use realistic inputs and relevant failure cases. Report unavailable
evidence and defer dependent choices; do not label an unverified assumption as
researched. Stop when each consequential choice has supporting evidence, a tested
compatibility assumption where needed, and a reason for rejecting viable alternatives.

## 4. Define the architecture and rules

Map the agreed requirements to modules, entry points, dependency direction, data
ownership, and external boundaries. Trace a representative operation through
success and failure. For multiple processes, describe deployment and communication;
for one library or CLI, a module diagram and caller contract may be sufficient.
Use domain vocabulary and record measurable constraints only when supported.

Define documentation, complexity, code patterns, testing, and tool adoption rules
using the decision areas. Each rule needs a scope, a reason tied to the project,
an example or canonical implementation where useful, and a way to check it.
Separate correctness requirements from preferred defaults and permitted exceptions.
Let configuration own mechanical formatting and compiler settings.

### Plan adoption and resolve open decisions

For an existing repo, inventory conflicting patterns and affected consumers.
Choose what to retain, migrate, retire, or defer. Preserve compatibility unless
the accepted task changes it. Record the migration order and verification for
each affected group. A documented target is not an implemented migration.

Present the proposed architecture, convention decisions, tool choices, affected
files, migration scope, and verification together. Resolve material open decisions
before implementing their dependent changes. Continue reversible work already
authorized; do not add an approval round for every formatting or naming choice.

## 5. Create or update the repo-specific skill

Read [project-skill.md](references/project-skill.md) for the output structure,
documentation ownership, agent setup, and maintenance rules. Create or update the
actual project skill, not just an architecture essay or a list of recommendations.
Keep an existing name such as `rust-code-style` when it already owns these rules.
Use `code-conventions` for a new shared skill unless that name conflicts locally.

Give the local skill automatic triggers for the project's real languages, paths,
and work types. Include core invariants, cumulative reference routing, canonical
implementations, required checks, and the procedure for updating conventions.
Ensure both code and documentation work can reach the relevant guidance.

Record architecture and durable decisions in the project's existing documentation
and ADR layout. Link their reasons to the operative rules without copying them
into several files. Add a short pointer in the selected `AGENTS.md` or `CLAUDE.md`
and make the same canonical skill available to every selected coding agent.
Use unslop when available while drafting Markdown. Preserve source attribution.

### Implement the agreed enforcement

Apply agreed configuration, examples, and migrations only within the task's scope.
Reuse existing formatter, compiler, linter, and test facilities before adding
custom checks. Exercise new enforcement with a valid example, a violation, and
a legitimate exception when the rule has one. Do not enable broad lint sets or
install a framework just to make the conventions look comprehensive.

## 6. Verify and maintain

Verify the generated skill's format, automatic invocation controls, links, paths,
and commands. Exercise a representative coding task against it in a temporary
workspace. Inspect which references the agent reads, whether its result follows
the rules, and whether the relevant checks catch a violation. Include a nearby
task that should not trigger it and a change that requires multiple references.

Verify each intended agent's discovery when available. Report configuration
inspection separately from a fresh-session trial. During bootstrap, use the
minimal entry point or a disposable example; do not implement product features
solely to test the skill. Run the repo's required checks for actual changes.

Report the result in these groups:

- Custom skill path and established decisions.
- Research evidence and implemented checks.
- Migration status and remaining dependencies.
- Verification limits.

Do not claim full adoption while dependencies remain.

Whenever an accepted convention changes, update the local skill, affected
references, examples, configuration, and checks in the same change. Supersede
relevant ADRs and remove stale rules. Routine use should flag drift against the
spec, toolchain, and actual code; substantial new tradeoffs return to this workflow.
