# Component patterns

Contents: controls; forms; overlays; tooltips; lists and data; gestures; loading.

Read the relevant pattern, then adapt it to the existing accessible component and the product's design language.

## Buttons and toggles

Use semantic buttons for actions and links for navigation. Preserve native keyboard behavior. Give the primary action emphasis by importance; danger styling does not require every delete action to dominate the screen.

Define default, hover, focus-visible, pressed, selected where applicable, pending, and unavailable states. Press response can be a small color/shadow change or subtle scale; scaling is optional. Keep the outer target stable and avoid scaling entire rows or dense text. Focus indication must appear immediately and survive keyboard use and forced colors.

For an async action, keep label/indicator dimensions stable and show pending status. Do not make the entire button inaccessible to assistive technology just to hide duplicate animation layers. Decorative outgoing layers should be noninteractive and hidden from the accessibility tree.

Use native `disabled` when removal from interaction and tab order is appropriate. If discoverability/focus retention requires `aria-disabled`, explicitly guard activation; ARIA alone does not stop clicks or submissions. Explain meaningful prerequisites near the control rather than solely in a tooltip. Disable for a real state constraint, not while a cosmetic transition runs.

A toggle's persistent selected state must remain clear without motion. A knob position plus color and semantic state is stronger than color alone.

## Inputs and form presentation

Preserve visible labels, hints and errors associated with their fields. Match expected input width where helpful, while allowing realistic content and responsive reflow. A single column is a useful default; tightly related fields can share a row if their order remains clear.

Maintain distinct focus and invalid states; an error must not erase the focus indicator. Avoid shifting all fields when a short hint or validation message appears. Reserve space where practical, but allow longer content to expand.

Do not display an error for an incomplete value on its first keystroke. Follow existing validation conventions; submit or meaningful blur are useful initial validation points, while correction feedback can update after an error is shown. State the information feedback must communicate, without imposing a new writing style.

If adding an animated reveal, preserve labels, associations, and keyboard order. Hidden fields must not remain focusable. On collapse, move focus safely if it was inside the collapsing content. Reduced motion should make the reveal immediate.

## Menus, popovers, dialogs, and drawers

Use the project's established accessible component before building overlay mechanics. Verify which contract it supplies: placement, portal, keyboard navigation, Escape, outside interaction, focus restoration, inert background, and scroll management. A generic popover is not automatically a menu or dialog.

- Start an anchored overlay's animation at its trigger. Check placement near viewport edges and after collision flipping.
- Set focus or selection immediately according to the component pattern; do not wait for the visual entrance.
- Support close or reversal during entrance. A closing animation must not later remove a newly reopened instance.
- Keep exiting presentation inert and absent from the tab order. Avoid duplicate active dialogs or invisible layers that intercept clicks.
- Coordinate modal focus and background inertness through close. Either keep the modal contract until visual removal, or return focus when closing and retain only a nonblocking decorative exit. Do not leave an invisible active focus trap.
- Make scroll lock, focus return, listeners, and portal cleanup independent of a single animation event. Handle canceled motion and zero-duration variants.
- For drawers, distinguish content scrolling from drawer dragging. Account for browser navigation gestures, the on-screen keyboard, safe areas, and viewport changes.
- A modal should not become a hover card on small screens just to fit. Preserve the interaction model when changing geometry.

Favor small shifts/fades for ordinary overlays. A large drawer may use more travel because its off-screen position explains its role.

## Tooltips and hover content

A tooltip supplements an already understandable control; do not hide critical instructions or the only accessible name there. Show it on keyboard focus as well as hover. Use a modest initial hover delay to avoid incidental activation, with a short grace period for neighboring tooltips if the component supports it. Keyboard feedback should not inherit a frustrating pointer delay.

Keep transient hover content dismissible and reachable where applicable. Content with links or controls needs an appropriate interactive popover pattern, not a tooltip. Touch users need a visible or explicit alternative for essential information.

Gate hover-only visual effects by actual hover capability. Hybrid devices may support both touch and mouse; do not infer the input model from screen width.

## Lists, tabs, and changing data

Preserve stable item identity during insertion, removal, and reorder. Keep scroll position and keyboard focus meaningful. If the focused item is removed, choose the next appropriate focus destination.

Animate displacement when it helps track a user's action. Do not replay the whole list entrance on every filter change or data refresh. Virtualized lists need special care because DOM nodes are recycled; skip motion when identity or measurement cannot be guaranteed.

For tabs, distinguish selected state from keyboard focus. Update semantics and content according to the established activation model immediately. The underline or highlight can move independently; keep its target measured from actual tabs, including wrapping and localization.

For async search or filtering, keep input responsive and indicate when results are stale or loading. Do not show an old response as the result of a new query. A transition cannot repair a request race.

For counters and financial/operational data, show the actual value directly. If highlighting an update, use a restrained local indicator rather than cycling through fabricated values. Respect users selecting or comparing text.

## Dragging and direct manipulation

Expose what is draggable and where it can go. During drag, separate the active item visually, indicate a destination, and preserve the relationship to its source.

Keep the grabbed object under the pointer. Use pointer capture and clean up on release, cancellation, lost capture, unmount, or Escape where relevant. Track the initiating pointer; ignore additional pointers. Prevent an accidental click after a genuine drag. Avoid disabling native scrolling beyond the necessary gesture axis.

Use distance and recent directional velocity for dismissal. Specify units, such as CSS pixels per millisecond, and tune the thresholds for the component size. A single average velocity since pointer-down can misread a pause or reversal. Do not copy an unexplained threshold between components. Return the component to its starting position when the gesture falls below the dismissal threshold.

Offer equivalent keyboard controls and a single-pointer alternative that does not require dragging, such as move-up/down buttons or a destination menu. Keyboard support alone does not provide the non-dragging pointer alternative required by [W3C dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html).

## Loading, empty, error, and completion states

Use skeletons when the expected structure is known and they meaningfully preserve layout. Keep them noninteractive and hide decorative skeleton details from assistive technology. Prefer static skeletons for reduced motion. Never show endless shimmering when a request has failed.

Use a spinner for unknown progress with a meaningful persistent status. Use a progress bar for actual measured progress. For long work, consider cancel/retry or background continuation when supported. The operation's real state controls completion.

Maintain layout continuity across empty, populated, error, and loaded states. Give errors a stable recovery path. Preserve filter controls when they caused an empty result.

For transient notifications, use the existing notification system. Keep important outcomes and recovery actions available after a toast vanishes. Respect its timing controls and pause behavior; do not make a fleeting toast the only way to undo a consequential action. Do not animate focused notifications away before the interaction completes.
