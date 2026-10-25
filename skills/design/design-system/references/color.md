# Choose and measure color roles

Read this file when changing color use, theme roles, state colors, or contrast,
even when no new token is needed. Inspect the installed theme and actual consumers
first. Finish with correctly mapped roles and measured evidence for the affected
pairs and supported appearances.

## Use the role that owns the meaning

Keep shadcn's existing names and theme mechanism, including its configured
Tailwind mapping. Use each semantic role for its intended job. Add a role only
for a repeated meaning or independently supported theme choice, as described in
[foundations](foundations.md).

Bad: color secondary text with the border token because the values happen to
match today. Good: use the existing secondary-text role and check its actual
background in each supported theme. A later border change must not alter text.

Keep state understandable through a label, shape, icon, or other visible cue as
well as color, with the appropriate semantics. Retain the established action
hierarchy; several status colors do not automatically mean competing actions.

## Measure the actual pair

1. Identify the foreground, its rendered background, theme, component state, and
   applicable requirement. Include nested surfaces, portals, opacity, and overlays.
2. Resolve transparency against the real backdrop. For gradients or images,
   inspect the backgrounds under the text, including the weakest relevant area;
   a single page-background sample cannot establish the whole pair.
3. Use the project's contrast tooling and record the pair, ratio, threshold,
   measurement method, and state. Distinguish a calculation from declared tokens
   from a check of the rendered consumer. Do not invent a ratio or round a failing
   value up to the threshold.
4. For an authorized repair, change the owning role or component treatment and
   remeasure affected consumers. For an audit-only request, report the proposed
   repair and leave files unchanged.

For WCAG 2.2 AA text checks, ordinary text needs 4.5:1 and large text needs 3:1,
subject to the criterion's exceptions. Determine large-text eligibility from the
actual size and weight; see [contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
Use the applicable [non-text contrast criterion](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
for required control and graphical cues. Decorative separators are not equivalent
to boundaries needed to identify controls. Alternative perceptual metrics may
inform design but do not replace the required conformance calculation.

Bad: declare a translucent label readable after testing its opaque token against
the page background. Good: compute the composited pair on the actual panel,
verify the rendered state, and record the method. If the backdrop cannot be
inspected, mark rendered contrast `Not verified`.

## Check each appearance and state

Test the changed roles in supported themes and relevant default, hover, focus,
selected, pending, error, and disabled states. Apply each state's actual criteria
rather than assuming every disabled or decorative element has the same threshold.
Check forced-colors behavior separately; an ordinary palette calculation does
not prove that system-color overrides preserve boundaries or selection.

Bad: reverse the light ramp and assume the dark theme passes. Good: choose dark
surface, text, and action pairs by their roles and remeasure them in consumers.
When a brand color cannot serve as a readable action fill, retain the brand use
and choose a tested action treatment rather than changing all brand instances.

## Generate palette values only when needed

For an authorized new theme or missing ramp, use existing color tooling and the
project's notation. Define only steps consumed by real roles; check gamut and
the actual foreground/background pairs. Perceptual color spaces can help tune a
ramp, but a hue-distance rule or a palette step number cannot establish contrast
or distinguishability. Keep the existing theme-switching owner.

Bad: replace a consistent palette with OKLCH literals scattered through components.
Good: adjust the necessary theme values in their existing source and keep
consumers on semantic roles. Compare the changed states in both real compositions
required by the foundation workflow.

Done means every changed role has a justified consumer, the applicable pairs have
recorded measurements, and unavailable rendered checks are explicit. A passing
pair does not establish accessibility of the entire interface.
