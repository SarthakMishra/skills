# Report format

Use this format for every audit, including an empty or incomplete result. Keep
the four sections in this order. Replace placeholders with facts; use `None`
for empty lists and `Unknown` for unavailable evidence. Return the report to the
user; save a report file only when requested.

## Priority and evidence

| Priority | Meaning                                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | Demonstrated immediate risk of severe data loss, exposure, or a broadly unusable critical path. Needs urgent attention; reserve it for evidence of that impact. |
| P1       | A supported failure on a normal important path or a central design problem with substantial impact across consumers.                                            |
| P2       | A localized behavior risk or concrete recurring maintenance burden.                                                                                             |
| P3       | A bounded clarity or simplification issue with a named cost. Formatting preferences alone do not qualify.                                                       |

Use the category names from `SKILL.md`. Assign priority independently of a
scanner's warning/error label. Sort by priority, then impact, then path and line
for ties. Assign `CS-001`, `CS-002`, and so on after sorting; use the same IDs
throughout this report.

**Confidence** is `High` when the source contract and impact are directly
supported, or `Medium` when the source problem is supported but its extent depends
on a stated assumption. An unproven problem belongs in **Needs verification**.
**Validation** is `Source-traced`, `Exercised`, or `Measured`; name the actual
check when exercised or measured. Source inspection does not imply a runtime
test passed.

## Required template

```markdown
# Code smell report

## Scope and coverage

- Target: <repository, requested paths or diff, revision and dirty-state note>
- Baseline: <verified ref for a diff; Not applicable for a codebase audit>
- Environment: <relevant TypeScript, React/framework, Node, and package-manager versions>
- Exclusions: <paths and reasons>

| Area/path            | Manual review                                      | Tool coverage            | Gaps                                                   |
| -------------------- | -------------------------------------------------- | ------------------------ | ------------------------------------------------------ |
| <package or feature> | <files/flows read; Full, Sampled, or Not reviewed> | <tools and actual scope> | <unread paths or unsupported checks; None if complete> |

## Findings

Confirmed: <total>; P0: <n>, P1: <n>, P2: <n>, P3: <n>.
Counts represent distinct root causes, not repeated occurrences or tool alerts.

### CS-001 [P2] <specific problem title>

- Category: <one category>
- Location: <clickable repo path with line, plus symbol name>
- Also affects: <all other confirmed occurrences with paths and lines; None if unique>
- Confidence: <High or Medium; state any assumption>
- Evidence: <short source excerpt or precise control/data-flow explanation; tool/version/rule if applicable, or Manual>
- Impact: <trigger, affected consumer, and behavior or maintenance cost>
- Suggestion: <one or two sentences describing a concrete alternative>
- Validation: <Source-traced, Exercised, or Measured; check/result when run>
- Next check: <smallest useful check that would verify a future change>

<Repeat for every confirmed root cause.>

## Needs verification

| Candidate                                         | Location    | Missing evidence           | Next check          |
| ------------------------------------------------- | ----------- | -------------------------- | ------------------- |
| <plausible issue, excluded from confirmed totals> | <path:line> | <specific unresolved fact> | <how to resolve it> |

## Checks and limitations

| Check/version             | Command and working directory | Scope/configuration                   | Outcome                                                                                                         |
| ------------------------- | ----------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| <tool or existing script> | <exact invocation and cwd>    | <paths, enabled coverage, exclusions> | <Completed with findings, Completed without findings, Failed, Partial, or Skipped; exit code if run and reason> |

- Artifacts: <external temporary report paths, if any; None otherwise>
- Remaining limits: <unverified runtime behavior, unavailable dependencies/tools, unresolved baseline, or unfinished review areas>
- Working tree: <whether the audit changed it; explain any difference from its initial state>
```

## Reporting rules

- Use exact source lines from the reviewed revision and links supported by the
  host. If a tool reports only a file, find the responsible declaration yourself.
  For file-level findings use line 1 and say it is file-level. For a missing
  declaration, point to the existing boundary that should enforce it; do not
  invent a source location.
- Every finding needs all fields, including **Suggestion** and **Next check**.
  Describe the alternative without writing a complete fix. If no code change is
  needed, explain why the candidate was discarded rather than retaining it as a
  finding.
- Report every supported issue in scope. Group repeated occurrences only when
  they share a root cause and remedy; list each confirmed location. If the list
  is too large for chat, provide the complete requested report artifact and link
  it, or continue the report in batches. Do not silently truncate it.
- For a diff, mark each finding's relationship to the baseline in **Evidence**:
  `Introduced` or `Existing`. If the base cannot be inspected, use `Unknown` and
  state the limitation instead of calling it introduced.
- Keep unresolved candidates out of confirmed totals. Summarize refuted tool
  alerts only when their exclusion explains an important limitation or exception.
  Do not reproduce raw tool output as a substitute for findings.
- With no confirmed findings, write **No confirmed code smells in the reviewed
  scope** under **Findings** and keep zero counts. Keep **Needs verification**
  and **Checks and limitations** visible, even if their contents are `None`.
  An incomplete audit cannot claim the codebase has no issues.

Bad: “Score 94/100. Clean. Consider memoization.”
Good: “No confirmed code smells in the reviewed scope. The request race remains
unverified because the integration environment is unavailable; check overlapping
requests for A then B completing in reverse order.”

Conceptual finding excerpt, assuming the cited source and callers were read:

```markdown
### CS-001 [P2] Discount policy has two independent copies

- Category: Duplication
- Location: src/cart/totals.ts:18, calculateTotal
- Also affects: src/checkout/summary.ts:42, summarizeTotal
- Confidence: High
- Evidence: Manual; both implementations clamp the same discount and calculate the same cart total for the same item type.
- Impact: A discount-policy change needs coordinated edits in cart and checkout; one missed copy makes their totals disagree.
- Suggestion: Move the discount calculation to its existing domain owner and call it from both paths. Keep presentation logic local.
- Validation: Source-traced; runtime tests were not run.
- Next check: Exercise both callers with discounted and undiscounted items and compare totals.
```
