# Create and maintain the project skill

Find the existing project skill before creating one. Use this reference to write,
install, validate, or revise that repository-specific, model-invoked skill.
Architecture notes and research support the skill; they do not replace it.

## Choose the existing owner first

Inspect project skills and agent instructions before adding files. Update an
existing `code-conventions`, `rust-code-style`, or equivalent owner instead of
creating competing rules. For several languages, use one core skill with scoped
references unless independent triggers or ownership justify separate skills.
Do not rename a working local skill merely to match this workflow's default.

For a new skill, use `code-conventions` and a description naming the actual
languages, paths, and relevant tasks. Omit `disable-model-invocation` or keep it
false, and keep Codex `allow_implicit_invocation` enabled when that metadata exists.
Do not inherit explicit-only controls from a source template.

### Expose one canonical copy to each agent

Use the selected agents' supported project skill locations. A common shared
source is `.agents/skills/code-conventions/` for Codex, with Claude discovery under
`.claude/skills/`. Verify the installed agents' support and reuse the project's
installer or existing link arrangement to expose one canonical copy. A Claude
import of `AGENTS.md` alone is not proof of native skill discovery. Preserve user
edits and resolve name conflicts before installation. Avoid global changes.

## Write the operative rules

Keep the local entry point small enough to read on every matching task. Include:

1. The project and spec it governs, supported language or toolchain references,
   and which requirements are mandatory versus preferred defaults.
2. A procedure to classify touched paths, read every matching reference, apply
   core invariants, and check each changed area before finishing.
3. A small set of project-wide invariants derived from accepted requirements.
   Keep branch-specific details beside their applicable rules.
4. A routing table with concrete path or task conditions and the corresponding
   references. Rows are cumulative, not mutually exclusive.
5. Canonical implementations and authoritative configuration paths where they
   exist, plus completion checks appropriate to each kind of change.

Include the maintenance procedure below. It must explain when to return to
research and grilling instead of changing a convention unilaterally.

For example, an async API change may require the error, concurrency, and test
references together. Documentation work needs its own trigger. A small CLI may
fit all its rules in `SKILL.md` and need no references. Create files only for
decisions the project actually has.

For each rule, distinguish:

| Kind      | Meaning                                                        | Example form                                                               |
| --------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Required  | A correctness contract, accepted constraint, or enforced check | Validate external input before creating the domain value.                  |
| Preferred | The normal choice with a reasoned exception                    | Keep a short one-use helper local unless sharing it protects an invariant. |
| Exception | A bounded departure from a named rule                          | This adapter accepts a legacy format until the named consumer migrates.    |

Replace the examples with the project's real types and operations. Record the
scope, reason, verification, and review condition for exceptions. Do not turn an
isolated workaround into a project-wide rule or treat every existing pattern as
approved. Keep examples aligned with the current code and compile them when useful.

## Keep one source for each decision

Keep core conventions in the local skill and longer rules in its references.
If existing contributor docs already own a detailed rule, preserve that ownership
and have the local skill direct readers there. Do not maintain two copies.

Keep packaged references within the skill. References to the target repository's
spec, configuration, or code should name real paths resolved from the repo root,
not the author's home directory. Make that distinction explicit in the generated
skill. It is a skill for this repository, not a promise that its project paths
will work when copied into an unrelated repo.

Use existing architecture and domain documentation. If none exists, a focused
`docs/architecture.md` can describe the accepted structure; put significant
decisions in the project's chosen ADR layout. During bootstrap, coordinate this
layout with companion setup before creating files. Keep the source spec linked,
and distinguish current implementation from agreed but unimplemented design.

Architecture docs own system structure and the reasons for major decisions.
The local skill owns instructions for applying those decisions during changes.
Configuration owns executable values. Research supports claims and alternatives.
Link between these instead of copying lists of lints, commands, or packages into
every document. Keep mandatory check commands discoverable from the local skill.

### Connect agent instructions and contributor docs

Add a short pointer in the selected agent instruction file. Adapt this example
to the real skill name and supported scope:

```markdown
## Engineering conventions

Before changing or reviewing project code, tests, tooling, or technical docs,
use the `code-conventions` skill and read every reference matching the work.
Follow the spec and architecture decisions it identifies. When an accepted
convention changes, update that skill, its examples, and affected checks in
the same change. Propose unresolved convention changes before applying them.
```

Link the local skill from the README or contributor guide for human readers.
For multiple agents, verify each can find the same instructions and skill. Reuse
existing entry files and preserve unrelated guidance, including commit policy.
Installing a conventions skill must not enable automatic commits or publication.

## Make enforcement concrete

Map each required rule to a compiler, formatter, linter, test, or explicit review
check. Name the command or evidence needed to finish. A rule can require human
judgment; do not invent a fragile regex merely to call it automated.

Prefer supported configuration to custom tools. If a custom check is necessary,
test a violation and a valid case through the command contributors or CI run.
Test documented exceptions too. Preserve generated-file exclusions and legitimate
language-specific patterns. Existing violations need a bounded migration plan.

### Exercise the skill, not just its format

For representative skill trials, verify the agent uses actual local rules rather
than restating this establishment workflow. Include a cross-cutting change and
a nearby task outside the trigger. Check that it can locate canonical examples,
explain an exception, and name required verification. A passing formatter or a
well-formed `SKILL.md` cannot prove that the agent follows it.

## Update when conventions change

Include these instructions in the generated skill:

- Revisit affected rules when an accepted architecture decision, toolchain,
  dependency, testing approach, documentation practice, or canonical implementation
  changes. Also investigate repeated exceptions or evidence that a rule causes
  defects or unnecessary complexity.
- Compare the change with the spec and existing decisions. For a settled change,
  update rules, routing, examples, source links, checks, and agent pointers in the
  same change. For unresolved tradeoffs, return to `establish-conventions` when
  available, or research and discuss the decision directly.
- Distinguish a code violation from a deliberate convention revision. Fix the
  violation under the existing rule; do not weaken the rule just to pass a check.
- Preserve the history of significant decisions by marking old ADRs superseded
  and linking replacements. Remove obsolete operative guidance and dead paths.
  Keep migration exceptions visible until affected consumers are accounted for.
- Revalidate the affected skill branches and enforcement. Report stale assumptions,
  unavailable evidence, and remaining migration work rather than silently treating
  current code as the new standard.

Use these change events rather than a mandatory schedule or background task.
An explicit periodic review can inspect drift, but the skill should not create
an automation or reread every source during ordinary coding.
