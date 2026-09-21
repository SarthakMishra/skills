# Design review

Inspect the requested screen and its surrounding context. Report a visible defect,
an evidence-supported risk, or a design preference, with a concrete treatment.
This reference evaluates design; it does not define an implementation test suite.

## Inspect in order

1. Check whether the primary information and action are recognizable. Inspect
   hierarchy, grouping, density, and the relationship between content and controls.
2. Check real text and imagery: long labels, large values, wrapping, missing images,
   and empty or error states. Use [layout](layout.md) and [typography](typography.md).
3. Measure changed color pairs using [color](color.md#measure-contrast). Inspect
   selected and focus cues in both themes and forced colors when available.
4. Inspect feedback and recovery expectations with [interaction design](interaction-design.md).
   Judge [motion](motion-design.md) at normal speed and after repeated use.
5. Finish with [polish](polish.md), including [icons](iconography.md) and
   [surfaces](surfaces.md), after the task and hierarchy are clear.

Use screenshots for appearance and a running prototype for dynamic behavior when
available. A screenshot cannot prove keyboard operation, request handling, or
animation quality. Name the evidence and any limits.

## Check usability constraints

- Inspect narrow and wide layouts, long content, supported themes, and 200% zoom.
  Controls and essential information must remain reachable and readable.
- Keep visible labels, recognizable actions, and non-color state cues. Focus and
  selection must remain distinguishable.
- Default new touch-oriented controls to at least 44×44 CSS px hit targets. Preserve
  established compact controls only after checking spacing and operability.
- WCAG 2.2 AA's target-size criterion is 24×24 CSS px with specified exceptions,
  not a blanket 44px minimum. Consult the [criterion](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

Keep feedback understandable under reduced motion. Where automatic motion is used,
check the need for pause/stop controls. Avoid flashing effects; a warning does not
make an unsafe effect acceptable. These checks do not certify the entire app.

## Make the critique actionable

| Classification | Meaning                                                         |
| -------------- | --------------------------------------------------------------- |
| Defect         | Observed usability, accessibility, state, or rendering problem. |
| Risk           | Credible evidence, but the outcome has not been reproduced.     |
| Preference     | A design alternative with a stated tradeoff.                    |

Prioritize blocked operation, misleading outcomes, lost input, and inaccessible
controls before hierarchy inconsistencies and isolated polish. A longer duration
is not automatically a more serious issue than an absent focus cue.

Use one row per root cause, listing each affected location. For one finding, a
short paragraph with the same fields is enough.

| Location/state   | Before                                    | After                                             | Why / evidence                                       |
| ---------------- | ----------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| Settings actions | Save, Cancel, and Delete compete equally. | Emphasize Save and separate Delete.               | Makes the preferred action identifiable; screenshot. |
| Search status    | An error is shown only by a red border.   | Add a persistent explanation and recovery action. | Meaning remains clear without color; observed.       |
| Panel opening    | Focus timing has not been inspected.      | Require immediate access during entrance.         | Proposed behavior, not a reproduced defect.          |

Bad: "The panel feels wrong; make it modern."
Good: "Labels and inputs have the same gap as separate field groups. Use 8px
within groups and 24px between them, or the equivalent project tokens."

## Finish with evidence

Show the selected treatment, why it helps, and checks actually performed. Use
`Verified` for inspected evidence, `Not verified` for missing checks, and
`Proposed` for an acceptance criterion. Leave working areas alone and avoid blanket
approval of uninspected states. When real-user testing is requested, observe an
unaided task before asking about expectations; informal reactions do not establish
causal improvement or statistical significance.
