# Sources and adaptations

Choose the source category matching the decision you need to research or explain.
Use the project's spec, constraints, and actual versions to decide which guidance
applies. These sources inform the workflow, not universal conventions.

Primary-source review completed on 2026-09-20.

## Architecture and maintainability

- Michael Nygard, [Documenting architecture decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
  Supports short records of significant decisions, their context, status, and
  consequences. Preserve superseded decisions and link replacements. This does
  not require an ADR for every local style choice.
- Simon Brown, [C4 diagrams](https://c4model.com/diagrams) and the
  [diagram checklist](https://c4model.com/diagrams/checklist).
  Select views for their audience and purpose. Explain responsibilities and
  relationships. The workflow does not require every C4 level or equate a folder
  tree with an architecture.
- Google, [What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html).
  Informs complexity review, useful tests, comments that explain reasons, and
  updating documentation when build, test, use, or release behavior changes.
  Maintaining the local conventions skill in the same change is this workflow's
  application of that guidance.
- Google, [The standard of code review](https://google.github.io/eng-practices/review/reviewer/standard.html).
  Informs distinguishing facts from preferences and improving code health without
  demanding unrelated perfection. Use scoped adoption rather than treating a new
  convention as permission to rewrite the entire repo.

## Testing and language guidance

- Google, [Software engineering at Google, chapter 11](https://abseil.io/resources/swe-book/html/ch11.html).
  Informs control of test resources, environment, order, and nondeterminism. Its
  organizational categories and test proportions are not universal requirements.
- [Chapter 12](https://abseil.io/resources/swe-book/html/ch12.html) informs tests of
  observable behavior through meaningful interfaces. The consumer's contract is
  not necessarily identical to a language's public visibility modifier. Internal
  invariants and valid interaction assertions can still need tests.
- Python maintainers, [PEP 8](https://peps.python.org/pep-0008/).
  Illustrates an official language baseline that allows project-specific guidance
  and protects compatibility. Apply it to Python, not to unrelated languages.
- Rust project, [API guidelines checklist](https://rust-lang.github.io/api-guidelines/checklist.html).
  Provides research categories for naming, types, errors, validation, safety, and
  caller documentation. Verify against the actual compiler, edition, library,
  and lint versions. Do not copy Rust patterns into another runtime.

For other languages, find their official language and standard-library manuals,
formatter and linter documentation, API guidelines, and the chosen framework's
versioned documentation. A language-specific rule needs language-specific evidence.

## Dependency evaluation

- OpenSSF, [Concise guide for evaluating open source software](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Concise-Guide-for-Evaluating-Open-Source-Software.md).
  Informs checking existing solutions, authenticity, maintenance, compatibility,
  advisories, licensing, indirect dependencies, and isolated trials. Activity and
  release age are signals, not automatic rejection thresholds. Comparing a custom
  implementation's full maintenance cost is a workflow requirement here.

## User-supplied project examples

The user supplied these local skills as examples of the desired output. This
workflow adapts their core-invariants, cumulative-routing, and completion-check
structure. It does not import their domain rules, stacks, private APIs, or pinned
versions as defaults.

- wekeep's [`code-conventions`](https://github.com/wekeep-in/wekeep/blob/a5a5ac8e1498b6ef532fdf559db3954db9c5b84e/.agents/skills/code-conventions/SKILL.md),
  authored by wekeep. Illustrates shared invariants and references for different
  areas of a TypeScript application.
- ts-native's `.agents/skills/rust-code-style/SKILL.md`, local revision
  `4dbbb65e07982da108f37330e3076f40cdbd68fb`. Illustrates language-specific
  requirements, preferred defaults, documentation, and test guidance. No origin
  remote was configured in the supplied checkout, so no source URL is invented.
- My Next Filing's [`code-conventions`](https://github.com/wekeep-in/my-next-filing/blob/f580ebd937a6e155698e40094031b8aa416eb209/.agents/skills/code-conventions/SKILL.md).
  Illustrates a compact skill grounded in a narrow product spec and explicit
  boundaries. Small projects need not reproduce the larger examples' structure.

The supplied skill files contained no separate license notices. Research and
interview procedure also draws on Matt Pocock's
[skills collection](https://github.com/mattpocock/skills). Those companion skills
are optional; the required process is described within this skill.
