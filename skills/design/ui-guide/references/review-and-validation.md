# Review and validation

Contents: inspect; diagnose; report; verify; finish.

## Inspect to the requested depth

For a narrow task, inspect the component and its immediate context. For a wider audit, sample representative screens and components and then follow observed inconsistencies to their shared source.

Record evidence from the running UI, screenshots/recordings, and relevant code. Note the viewport, theme, input method, and state where a problem appears. A static screenshot cannot establish timing, keyboard behavior, or request handling. A code review can identify risks but cannot prove motion feels good.

Useful code searches include `transition`, `animate`, `@keyframes`, `useSpring`, `layout`, `setTimeout`, `aria-`, `data-state`, and theme tokens. Inspect search matches before reporting a defect.

## Diagnose in a useful order

1. Can people perceive and operate the control? Check contrast, affordance, target, focus, and alternative input.
2. Is the static hierarchy correct? Inspect relative emphasis, grouping, readability, and density.
3. Does behavior match appearance and intent? Trace trigger, rules, feedback, loops, and modes.
4. Does motion help? Inspect cause, frequency, timing, direction, origin, and interruption.
5. Is it cohesive and efficient? Compare shared tokens, geometry, state patterns, and runtime cost.
6. Is there a worthwhile expressive improvement? Propose it only with a reason tied to the product.

Classify separately:

- A defect is an observed usability, accessibility, state, or rendering problem.
- A risk has credible code evidence but has not been reproduced.
- An enhancement is a design improvement with a contextual tradeoff.

Prioritize blocked operation, misleading outcomes, lost input, and inaccessible controls above subtle easing preferences. A 320ms drawer is not automatically a more serious issue than a missing focus indicator. Do not claim a low frame rate from a property name alone.

## Make findings implementable

For several findings, use:

| Location/state        | Before                              | After                               | Why                           | Priority/evidence            |
| --------------------- | ----------------------------------- | ----------------------------------- | ----------------------------- | ---------------------------- |
| Filter panel, opening | Focus waits for entrance            | Focus on open; visual layer follows | Keyboard use stays responsive | High; reproduced             |
| Summary card, default | Label competes with value           | Use supporting label role           | Clarifies the scan order      | Medium; screenshot           |
| Menu, reversal        | Exit callback removes reopened menu | Cancel obsolete removal             | Reopened menu stays open      | High; code risk until tested |

Use actual project locations and values in a real audit. Avoid claiming "before" behavior that was not observed. Deduplicate shared-root-cause findings. Leave well-working areas alone.

## Verify relevant dimensions

Choose checks based on changed behavior; do not run every possible test for every small edit.

Inspect default and changed states with narrow and wide content, long strings and numbers, and supported themes. Check 200% zoom and reflow, clear focus and selection, clipping, alignment, overflow, and layout stability.

Test pointer and keyboard activation, rapid double input, opening and closing repeatedly, and interrupted transitions. Check focus restoration, disabled and pending behavior, and slow success, errors, and retry where relevant. Unmount the component during pending work.

Check motion at normal speed, use slow playback to diagnose problems, and verify behavior without animation. Check origins, destinations, total duration, and accidental replay. Cosmetic animation must not delay input or completion.

Check accessible names, roles, states, and logical focus order. Keep essential information available and convey status without relying on color. Test reduced motion and alternatives to hover-only or drag-only actions. For touch-oriented controls, aim around 44–48 CSS px targets where practical. WCAG 2.2 AA's target-size criterion is 24×24 CSS px with specified exceptions, not a blanket 44px minimum. See [target-size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

Profile performance when changes or observed stutter warrant it. Try realistic content and concurrent work. Distinguish layout/paint cost, slow React renders, main-thread contention, and memory-heavy compositing before prescribing a fix.

For autoplaying motion, verify applicable pause/stop controls. Avoid flashing effects; do not rely on a warning to make an unsafe animation acceptable. A component passing these checks is not proof the entire app meets an accessibility standard.

## Test behavior where it matters

Reuse project checks and browser tooling. Add a focused test if a meaningful regression risk exists, such as stale responses overwriting current state, repeated submission, lost focus, or an exit callback deleting a reopened element. Small visual token changes normally need inspection, not bespoke unit tests.

A static snapshot cannot validate interruption or settling. An end-to-end test can verify state/focus but may still miss unpleasant motion. State explicitly if browser, physical-device, screen-reader, or performance testing was unavailable.

When real-user testing is requested, observe an unaided task first, then ask what the person expected and understood. Check confidence, timing, and repeated use as well as completion. Do not claim causal improvement or statistical significance from a few informal reactions.

## Finish with evidence

For implemented work, report the changed behavior, why it helps, what was verified, and any material limit. For an audit, report the highest-impact findings and a concrete next action. Keep unresolved visual preferences separate from functional defects.
