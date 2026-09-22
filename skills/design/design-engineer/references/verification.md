# Review and validation

Inspect the requested component or area and record the evidence before reporting
a finding. Use the diagnosis order below to prioritize repairs.

## Inspect to the requested depth

1. Set the inspection scope. For a narrow task, inspect the component and its
   immediate context. For a wider audit, sample representative screens and
   components, then trace observed inconsistencies to their shared source.
2. Record evidence from the running UI, screenshots or recordings, and relevant
   code. Note the viewport, theme, input method, and state where a problem appears.
3. Inspect code search matches before reporting a defect. Useful searches include
   `transition`, `animate`, `@keyframes`, `useSpring`, `layout`, `setTimeout`,
   `aria-`, `data-state`, and theme tokens.

A static screenshot cannot establish timing, keyboard behavior, or request
handling. A code review can identify risks but cannot prove motion feels good.

## Diagnose in a useful order

1. Check whether people can perceive and operate the control. Inspect contrast,
   affordance, target, focus, and alternative input.
2. Inspect static hierarchy through relative emphasis, grouping, readability,
   and density.
3. Trace triggers, rules, feedback, loops, and modes. Check whether behavior matches
   appearance and intent.
4. Assess whether motion helps. Inspect cause, frequency, timing, direction,
   origin, and interruption.
5. Check consistency and efficiency. Compare shared tokens, geometry, state
   patterns, and runtime cost.

After these checks, propose expressive effects only when the request asks for
product character or an identified event needs more visible feedback.

### Classify and prioritize findings

- A defect is an observed usability, accessibility, state, or rendering problem.
- A risk has credible code evidence but has not been reproduced.
- A preference is a design improvement with a contextual tradeoff.

Prioritize blocked operation, misleading outcomes, lost input, and inaccessible
controls above subtle easing preferences. A 320ms drawer is not automatically more
serious than a missing focus indicator. Do not claim a low frame rate from a
property name alone.

Assign priority separately from evidence:

| Priority | Use for                                                                                               |
| -------- | ----------------------------------------------------------------------------------------------------- |
| High     | Blocked actions, lost input, misleading operation results, inaccessible controls.                     |
| Medium   | Repeated confusion, broken hierarchy, clipping or inconsistent state cues that do not block the task. |
| Low      | Isolated visual or timing polish after the task works.                                                |

A code-supported risk can have high impact. Label it a risk until reproduced;
do not downgrade its potential impact or claim it happened.

## Make findings implementable

Use one row per root cause, ordered by priority. Include all affected locations in
that row, with `path/to/file:line` when code is available. For a single finding,
the same fields can be a short paragraph.

| Location/state        | Before                              | After                               | Why                           | Priority/evidence            |
| --------------------- | ----------------------------------- | ----------------------------------- | ----------------------------- | ---------------------------- |
| Filter panel, opening | Focus waits for entrance            | Focus on open; visual layer follows | Keyboard use stays responsive | High; reproduced             |
| Summary card, default | Label competes with value           | Use supporting label role           | Clarifies the scan order      | Medium; screenshot           |
| Menu, reversal        | Exit callback removes reopened menu | Cancel obsolete removal             | Reopened menu stays open      | High; code risk until tested |

- Use actual project locations and values in a real audit.
- Avoid claiming "before" behavior that was not observed.
- Deduplicate findings with a shared root cause. Leave well-working areas alone.

| Bad finding                                       | Good finding                                                                                                                            |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| "The drawer feels slow. Use a faster spring."     | "Opening waits 300ms before moving focus. Move focus on open; keep the visual entrance separate. High, reproduced with keyboard input." |
| "The animation uses blur, so performance is bad." | "Blur is a possible paint cost. Performance is Not verified; profile the observed stutter before changing it."                          |

## Verify relevant dimensions

For an orchestrated interface, combine companion criteria before testing:

| Concern       | Verify when it changes                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UX            | Re-run entry through completion, plus relevant failure, backtracking, recovery, and return paths. Confirm the implemented flow matches its action contract.                           |
| Design system | Use canonical tokens/components, check changed consumers, and update affected system documentation or enforcement.                                                                    |
| UI            | Inspect the selected treatment with real content, supported themes, responsive widths, and accessible state cues.                                                                     |
| UX copy       | Inspect final strings in their rendered states, including variables, localization, accessible names, and actual consequences. No placeholder or unsupported recovery promise remains. |

Keep one set of checks when the same observation proves several criteria. Follow
the [orchestration workflow](orchestration.md) to return a failure to its owning
concern and reconcile the implementation before repeating the affected check.

For React changes, also run the applicable completion check from
the `react-guide` skill.

Run the checks in the matching rows, using the detailed instructions below:

| Change                           | Required checks                                                                                                                                     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spacing, type, color, or surface | Inspect surrounding layout, long content, narrow and wide widths, 200% zoom, and supported themes. Measure affected contrast pairs.                 |
| Control, form, or overlay        | Exercise pointer and keyboard activation, focus, unavailable states, and relevant touch alternatives.                                               |
| Async behavior                   | Exercise slow success, known failure, retry, duplicate input, stale responses, and unmount; check unknown outcomes when the operation permits them. |
| Animation or gesture             | Exercise reversal, repetition, normal speed, reduced motion, and no animation; verify a non-dragging alternative for drag actions.                  |

For proposals, list these as acceptance checks. For implementations, run them when
the environment supports them and mark unavailable checks `Not verified`.
After the required checks pass, stop unless a new change, failure, or unresolved
concern requires another check.

### Check layout and content

Use `design-system`'s foundation and component references for layout, typography,
iconography, surfaces, and color
for the visual acceptance criteria. Verify their approved treatment in the working
component; do not create another catalog of design defaults.

- Inspect default and changed states with narrow and wide content, long strings
  and numbers, and supported themes.
- Check 200% zoom and reflow, clear focus and selection, clipping, alignment,
  overflow, and layout stability.

### Exercise state changes and motion

1. Test pointer and keyboard activation, rapid double input, repeated opening and
   closing, and interrupted transitions.
2. Check focus restoration, disabled and pending behavior, and slow success,
   errors, and retry where relevant. Unmount during pending work.
3. Judge motion at normal speed. Use slow playback to diagnose problems, then
   verify behavior without animation.
4. Check origins, destinations, total duration, and accidental replay. Cosmetic
   animation must not delay input or completion.

### Check accessibility

- Check accessible names, roles, states, and logical focus order.
- Keep essential information available and convey status without relying on color.
- Test reduced motion and alternatives to hover-only or drag-only actions.
- For autoplaying motion, verify applicable pause and stop controls. Avoid flashing
  effects; a warning does not make an unsafe animation acceptable.

Default new touch-oriented controls to at least 44×44 CSS px hit targets. Preserve
an established compact control only after checking target spacing and operability.
WCAG 2.2 AA's target-size criterion is 24×24 CSS px with specified exceptions, not
a blanket 44px minimum. See
[target-size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

A component passing these checks does not prove the entire app meets an
accessibility standard.

### Check performance

1. Profile when changes or observed stutter warrant it. Use realistic content and
   concurrent work.
2. Distinguish layout and paint cost, slow React renders, main-thread contention,
   and memory-heavy compositing before prescribing a fix.

## Test behavior where it matters

Reuse project checks and browser tooling. Add a focused test for meaningful
regression risks, such as stale responses overwriting current state, repeated
submission, lost focus, or an exit callback deleting a reopened element. Small
visual token changes normally need inspection, not bespoke unit tests.

State when browser, physical-device, screen-reader, or performance testing was
unavailable. A static snapshot cannot validate interruption or settling. An
end-to-end test can verify state and focus but may still miss unpleasant motion.

### When real-user testing is requested

1. Observe an unaided task.
2. Ask what the person expected and understood.
3. Check confidence, timing, and repeated use as well as completion.

Do not claim causal improvement or statistical significance from a few informal
reactions.

## Finish with evidence

Compare the delivered changes with the agreed mode, target, intervention approach,
exclusions, and completion checks. Unrelated improvements do not count as finishing
the scoped task. If essential work needs a broader change, report that dependency
and request a scope decision rather than silently expanding the patch.

After behavior checks, use `design-system`'s foundation and component guidance for
a final consistency pass. It does not replace the state, accessibility, or
performance checks above.

- For implemented work, report the changed behavior, why it helps, what was
  verified, and any material limit.
- For an audit, report the highest-impact findings and a concrete next action.
- Keep unresolved visual preferences separate from functional defects.

Use explicit verification labels: `Verified` for an exercised check, `Not verified`
for an unavailable or unrun check, and `Proposed` for a future acceptance check.
Do not issue a blanket approval for states or devices that were not inspected.

Done means every applicable check has one of those labels, and each audit finding
has a location, evidence level, priority, and concrete next action.
