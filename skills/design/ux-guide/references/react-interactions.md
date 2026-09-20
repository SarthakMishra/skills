# React interaction contracts

Specify the behavior first, then use the installed stack's components and APIs. Inspect versions and established router, data, and form conventions before choosing APIs. These are engineering applications of the UX principles, not book prescriptions.

## State ownership and lifetime

| State                                 | Typical owner                            | Required decision                                    |
| ------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| Committed records and job status      | Server plus existing data layer          | What is authoritative, stale, pending, or unknown?   |
| Shareable view/filter state           | Router or URL, where appropriate         | Should refresh, sharing, and Back reproduce it?      |
| Unsaved values                        | Form/component or deliberate draft store | What survives panels, steps, navigation, and reload? |
| Focus, expansion, temporary selection | Local interaction state                  | What event resets or restores it?                    |
| Reusable preferences                  | Existing persistence                     | Is scope person, device, or workspace?               |

Derive values where possible; avoid competing sources of truth. Scope persistence to the correct account and workspace. Do not store sensitive drafts in browser storage by default. Define reset on sign-out, account switching, successful completion, and starting another object.

React state follows component identity and tree position. Keep identity stable within the same task and reset deliberately for another object. Unstable keys or changing component types can discard drafts or put state on the wrong row. Do not overwrite dirty form values on background refetch. See [React: preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state).

## Async behavior

### Keep input and results current

- Track pending work at its real scope; saving one row should not automatically freeze the whole page.
- Keep controlled input immediate. Defer expensive rendering or debounce network work when appropriate, not the visible keystroke.
- Associate results with request inputs. Abort obsolete requests or ignore obsolete responses; test out-of-order completion.
- Do not present prior-query results as matches for the latest query. Decide whether stale content is safe to use and make that state perceivable when it matters.

### Preserve mutation correctness

- Tie save responses to the submitted version. Older acknowledgments must not mark newer edits saved or erase them. Serialize or reconcile overlapping mutations using the actual server version contract.
- Prevent duplicate consequential effects in both interaction and server semantics. Disabling a button does not guarantee exactly-once behavior.
- Reconcile uncertain results before retrying operations that may already have happened.

A transition may keep rendering responsive; it does not establish durable persistence or server ordering. Verify supported React/data-layer APIs before implementation. See [React: useTransition](https://react.dev/reference/react/useTransition).

## Optimism and completion

Use optimistic UI for low-risk, likely-successful actions with reliable reconciliation. Define pending state, failure handling, and repeated input before implementation. Rollback must preserve newer user intent rather than restoring an obsolete whole-object snapshot.

Wait for authoritative confirmation before claiming payments, publication, invitations, or consequential bulk changes completed. Give immediate acknowledgment while distinguishing request acceptance from completed outcome. A frontend-only simulation must not imply backend guarantees.

For a reversible saved-item toggle, show the intended selection. Combine repeated changes into the latest requested value or process them in order. Reconcile with the authoritative state and provide recovery without losing focus. If another operation supersedes it, an old response must not replace the latest intent.

## Browser behavior and focus

Use links for destinations and buttons for actions. Preserve modified clicks, new tabs, native forms, and expected keyboard activation. Coordinate focus, title, and scroll restoration with the router. Substantive navigation needs an appropriate page orientation strategy; a local fetch should not repeatedly reset focus to the top.

For modal interactions, use an existing accessible component when available. Check initial focus, keyboard containment, a keyboard exit, a noninteractive background, and focus restoration to the trigger or a sensible successor. Verify the [WAI-ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) when building custom behavior.

After deleting a focused row, focus a sensible neighboring item or list action. After invalid submission, expose the relevant field or error summary. Announce meaningful asynchronous status without narrating every render. Preserve a visible or programmatic connection between controls, errors, and outcomes. Reuse accessible controls before creating custom ARIA widgets.

## Translate maps into verification

For each changed transition, identify the user-visible invariant and relevant failure mode. Examples:

- `F03/N04`: the results still correspond to the newest query when responses finish out of order.
- `F02/N05`: a timeout after a successful invitation does not cause a duplicate resend.
- `F04/N02`: moving between wizard steps preserves entered values and restores a meaningful focus position.
- `F01/N06`: closing a panel returns focus while preserving the draft according to its stated lifetime.

Choose checks that resolve actual risks. Use existing project commands and test entry points. Do not install a state machine, router, data cache, or test library just to conform to this reference. Report browser and assistive-technology checks as unverified when only code inspection was possible.
