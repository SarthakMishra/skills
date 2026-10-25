# State ownership and workflows

Before splitting a component, identify each state's owner, consumers, and reset
condition. Preserve those contracts when extracting Hooks or moving JSX.

## Choose lifetime before location

Keep temporary interaction state near its consumers; lift only what must be
coordinated. Keep server records in the existing resource cache and navigable
filters in the router when they should survive refresh or browser navigation.
An editable draft is intentionally different from its server record: define when
it resets and how refetches interact with unsaved edits.

Bad: lift a note draft to the page just because a table also lives there, or copy
every query update into the draft. Good: let the editor own its draft, share it
only with its preview, and reset on an intentional record change. Verify whether
navigation away should discard, preserve, or block that draft.

React preserves state by component type, position, and key. Define extracted
components at module scope; defining them during render changes their identity.
A key resets a subtree rather than persisting it. If a draft must survive
unmounting, choose an owner or persistence mechanism that outlives the editor.

Passing caller-created children through a stateful wrapper can avoid rerendering
that content for the wrapper's own updates. Merely splitting files or recreating
all child elements inside the changing owner does not establish that boundary.
Verify the interaction with the profiler instead of promising zero renders.

## Extract cohesive behavior, not a second component monolith

A custom Hook shares logic; each call has its own state and updates its calling
component. It does not create a state-sharing mechanism or render boundary.

Bad: move the entire page into `useInvoicePage()` and spread its large result into
every view. Good: extract selection behavior used by desktop and mobile views,
keep calculations as plain functions, and pass each view the state and actions
it consumes. If two views must share selection, call the Hook once in their
common owner. Check independent instances and intentionally shared instances.

For headless interactions, reuse existing accessible primitives before creating
prop getters. If a getter is justified, define event ordering, whether
`preventDefault` cancels internal behavior, ref composition and cleanup, and who
owns IDs and ARIA relationships. Bad: spread consumer props last and overwrite
the internal handler. Good: compose supported handlers according to the declared
contract and verify keyboard, focus, and disabled behavior in the consuming view.

## Model transitions and async identity separately

Use a discriminated union when modes require different data, and a pure reducer
when related updates need one transition. Keep independent state independent.
A union prevents invalid shapes; ordinary reducer dispatch still accepts events
in every state, so guard transitions at runtime.

Bad: accept any save completion whenever status is saving. An old request can
then finish during a newer save. Good: match the completion to the active request
as well as the state. Generate IDs outside the reducer and do not reuse them
while older work can complete.

Independent runnable reducer fragment, TS 4.9+, `strict`; it models completion
of an already-started request, not the whole editor or network runner:

```ts
type SaveState =
  | { status: 'editing'; draft: string }
  | { status: 'saving'; draft: string; requestId: number }
  | { status: 'error'; draft: string; message: string }
  | { status: 'saved'; text: string };
type Completion =
  | { type: 'saved'; requestId: number; text: string }
  | { type: 'failed'; requestId: number; message: string };

function complete(state: SaveState, event: Completion): SaveState {
  if (state.status !== 'saving' || state.requestId !== event.requestId) {
    return state;
  }
  switch (event.type) {
    case 'saved':
      return { status: 'saved', text: event.text };
    case 'failed':
      return { status: 'error', draft: state.draft, message: event.message };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

const current: SaveState = { status: 'saving', draft: 'New', requestId: 2 };
const stale = complete(current, { type: 'saved', requestId: 1, text: 'Old' });
if (stale !== current) throw new Error('Stale completion changed the editor');
const failed = complete(current, {
  type: 'failed',
  requestId: 2,
  message: 'Retry',
});
if (failed.status !== 'error' || failed.draft !== 'New') {
  throw new Error('Failure lost the draft');
}
```

Keep mutations in the existing Action, mutation layer, or event handler; keep
reducers and updater functions pure. UI cancellation or ignoring a completion
does not undo a server write. Exercise retries, cancellation, record changes,
and out-of-order responses through the real integration as well as the reducer.

Only add a command interpreter when planning, replay, or offline coordination
is an actual requirement. A command list is not an execution guarantee. Use an
established runtime or define ordering, acknowledgement, retries, and idempotency;
verify remounts and Strict Mode cannot duplicate writes. Do not execute commands
in a reducer or turn pending commands in React state into an unchecked Effect
queue. Keep ordinary submissions on the simpler existing mutation path.
