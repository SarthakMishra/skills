# Establish conventions

Establish architecture and engineering conventions from an agreed project basis.
The result is a custom skill for the repository, usually named
`code-conventions`, that agents use during coding and review and update when
conventions change.

The workflow interviews you about unresolved decisions, researches the actual
stack, compares alternatives, and verifies uncertain choices. It covers code
organization, complexity, language patterns, documentation, testing, tooling,
libraries, and when a custom implementation is justified.

## When to use it

The agent can select this skill when establishing or revising conventions, during
bootstrap, or for a tool or library decision that changes shared patterns. Invoke
it with `$establish-conventions` in Codex or `/establish-conventions` in Claude Code.

```text
Establish conventions from SPEC.md and the decisions from our wayfinder session.
Research unresolved architecture and testing choices, interview me about tradeoffs,
and create the project-specific coding skill.
```

```text
Our existing rust-code-style skill no longer covers the accepted async design.
Use SPEC.md and the ADRs to research and revise that branch. Preserve other rules.
```

```text
Compare a library with our custom parser against these requirements. Research
compatibility and maintenance, test the uncertain cases, and propose a decision
before installing anything.
```

Bring an existing PRD, spec, or architecture document and decisions from
`wayfinder`, `grill-me`, or an equivalent discussion. If no adequate basis
exists, the skill grills the missing requirements and writes the appropriate
document with you before making dependent choices. It does not invent answers or
restart settled decisions. A later revision uses the existing basis and the new
requirement or evidence. Routine coding uses the generated local skill.

Callers such as bootstrap or design-system can request only this discovery
stage. It returns the accepted document and remaining questions; custom skill
creation remains a separate stage to resume when requested.

## What you get

- A repo-specific, model-invoked skill with core rules, relevant reference routing,
  canonical examples, checks, and maintenance instructions.
- Architecture and significant decisions documented in the project's existing
  layout, with current and planned behavior distinguished.
- Research supporting consequential choices, including alternatives, version
  constraints, experiments, and uncertainties.
- Agreed tooling and enforcement within the requested scope, with an adoption
  plan for existing code and a record of what was verified.
- Agent instructions and contributor links that make the same rules discoverable.

The skill works across languages and project types. It preserves an existing
convention skill's name and ownership. It does not require a universal folder
structure, a particular architecture pattern, or a new dependency.

## During bootstrap

[`bootstrap`](../bootstrap/README.md) uses this skill before scaffolding to
resolve architecture and convention gaps, establishing the project basis first
if needed. It passes the document and decisions already made, then uses the
accepted result for setup. After companion setup chooses the agent and
domain-document layout, the workflow writes or updates the custom skill and
verifies it against the foundation. This does not expand bootstrap into product
implementation or change its supported languages.

## Maintenance and checks

When an accepted convention changes, update the local skill, examples, references,
configuration, and affected checks in the same change. Substantial new tradeoffs
return to research and grilling. Repeated exceptions prompt review rather than
silently redefining the rules. No scheduled automation is required.

A useful result can guide a representative coding task and identify a violation.
Checks should exercise the rule and its exceptions. Skill discovery and formatting
alone do not demonstrate that an agent follows the conventions. Missing tools,
source access, or agent trials must be reported as verification limits.

See [sources and adaptations](references/sources.md) for the local examples and
primary sources informing the workflow.
