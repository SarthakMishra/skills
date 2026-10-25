# React decomposition research

Recommend targeted additions to `react-guide` that clarify state ownership,
subscription boundaries, and asynchronous workflows; success means extraction
preserves behavior and the resulting boundaries are exercised.

Research date: 2026-10-25. This note records recommendations separately from
installed skill instructions. Adoption decisions are engineering judgments;
linked primary sources establish the React and framework behavior behind them.

## Decisions on the supplied patterns

| Pattern                                | Decision for the skill                                                                                                                         |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless controllers and prop getters  | Adopt cohesive behavior hooks with explicit event/ref/prop merging contracts. Do not extract every component into a controller.                |
| State colocation and render isolation  | Strengthen existing ownership guidance: a Hook extraction is not a render boundary. Move local state into the component that owns it.          |
| Compound components and scoped context | Already covered. Add subscription and accessibility limits rather than another pattern example.                                                |
| Discriminated-union state machines     | Adopt state-dependent transitions and stale-operation checks. A union alone does not enforce legal event sequences.                            |
| Elm-style commands and effects         | Keep reducers pure. Reserve command interpreters for a demonstrated workflow need; do not introduce an Effect-driven command queue by default. |
| External stores and selectors          | Adopt the subscription contract and use an installed store's selectors; avoid prescribing a new store dependency.                              |
| Slots and dependency inversion         | Already covered by children and render props. Clarify that named ReactNode slots are valid and do not require compound components.             |
| Route-level features and URL state     | Adopt ownership of shareable URL state and correct loader environment assumptions; omit mandatory directory layouts.                           |
| Controlled/uncontrolled duality        | Adopt stable ownership and explicit default/change semantics. Avoid a universal generic controllable-state Hook.                               |
| Algebraic prop APIs and polymorphism   | Adopt unions for genuinely exclusive modes. Keep advanced polymorphism conditional on actual consumers and preserve element/ref semantics.     |
| Effects split by synchronization       | Strengthen existing guidance: split independent processes, preserve cohesive setup/cleanup, and test dependency changes.                       |

## Important corrections and limits

### Extraction does not define state or subscription boundaries

Custom Hooks reuse logic; each call gets its own Hook state, and Hook code runs
as part of its calling component. Moving `useState` into `useEditor` does not
isolate rerenders of the caller. Shared state still needs a common owner or
shared source. See [React custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-let-you-share-stateful-logic-not-state-itself).

React associates state with component type, position, and key. Nesting component
definitions inside a rendering component can reset state. Colocation should
move state into a stable component definition, preserving deliberate keys and
identity. See [preserving state](https://react.dev/learn/preserving-and-resetting-state).

Reading one field from a context object does not subscribe only to that field.
Context consumers update when the provider value changes by `Object.is`; `memo`
does not block fresh context. Split independent context values when useful,
then measure before adding a selector store. See [useContext](https://react.dev/reference/react/useContext#caveats).

For external stores, `getSnapshot` must return the same immutable snapshot until
the underlying data changes; server and hydration snapshots must agree.
Creating a fresh object for every snapshot can loop. Prefer an existing store's
React binding over rebuilding this protocol. See [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore).
TanStack Query's `select` narrows the observed data; it operates on successfully
cached data and is not the place to validate a query by throwing. See
[Query render optimizations](https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations#select).

### Model event sequences and asynchronous completion separately

A reducer must be pure; development Strict Mode may invoke it twice. Keep
requests and notifications in handlers, Actions, or explicit interpreters,
not in the reducer or updater. See [useReducer](https://react.dev/reference/react/useReducer#caveats)
and [useState](https://react.dev/reference/react/useState#setstate).

Recommendation: for each reducer event, define allowed source states and what
an unexpected event does. For overlapping requests, match completion to the
active request ID or another explicit ordering rule. A discriminated union can
prevent malformed state objects while a reducer still accepts a stale success
event. These runtime checks follow from the application's workflow contract.
React's [Transition documentation](https://react.dev/reference/react/useTransition#my-state-updates-in-transitions-are-out-of-order)
confirms that custom async transitions need their own ordering; higher-level
form Actions and `useActionState` handle common ordering needs.

### Controlled inputs need one owner

DOM inputs must not switch between controlled and uncontrolled ownership, and
controlled inputs need synchronous backing-value updates. An initial default
does not become a second synchronized source of truth. See
[input caveats](https://react.dev/reference/react-dom/components/input#caveats).
For reusable controls, define whether `undefined` is an actual value before
using it as an ownership sentinel. Specify callback and functional-update
semantics rather than promising `useState` compatibility from a small helper.
Test parent updates, defaults, repeated updates, and ownership violations.

### Composition still owns DOM behavior

A headless prop getter needs defined precedence for caller handlers, disabled
behavior, refs, IDs, and ARIA attributes. Blind object spreads can overwrite
required behavior. This is a recommendation for preserving observable component
contracts, not a new React primitive. Prefer explicit props, slots, or render
props over hidden element rewriting: React documents [cloneElement](https://react.dev/reference/react/cloneElement)
as fragile and offers those alternatives.

The existing tabs example demonstrates sharing state, not a complete tabs
widget. Production tabs also need keyboard behavior, roles, panel relationships,
and focus management. Reuse an accessible primitive or explicitly label an
example's omissions. See the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

### Route loaders are not necessarily server-only

TanStack Start loaders can execute on both server and client. Put secrets and
database work behind the framework's server-function boundary; moving fetching
to a loader does not itself make it server-only. See [Start execution model](https://tanstack.com/start/latest/docs/framework/react/guide/execution-model#incorrect-loader-assumptions).

Use validated URL search parameters for shareable filters or pagination and
include relevant values in `loaderDeps`; pass the loader's abort signal to
cancellable work. Keep transient editing state local unless navigation must
preserve it. See [Router search parameters](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
and [data loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading).

Split Effects when each represents an independent synchronization process.
Separate setup and cleanup belonging to one connection should remain together.
Splitting purely to shorten code can make lifecycle behavior harder to maintain.
See [Effect lifecycle](https://react.dev/learn/lifecycle-of-reactive-effects#each-effect-represents-a-separate-synchronization-process).

## Modern API verification

The official [version page](https://react.dev/versions) identifies React 19.3 as
the current release, and the [19.3 release announcement](https://react.dev/blog/2026/09/09/react-19-3)
confirms stable View Transitions, Fragment refs, and `browser()`. Preserve the
skill's installed-version checks rather than reverting these APIs to Canary.
React 19 also supports a rendered document `<title>`, so adopt that or the
framework metadata owner before extracting a document-title Effect. Keep only
one active document title; see [React title](https://react.dev/reference/react-dom/components/title).

The same release permits Server Components to render a Context imported from a
`'use client'` module without an otherwise empty provider wrapper. This does not
enable creating or reading Context in Server Components. This is useful when changing an RSC provider boundary, but does not require
expanding this decomposition update.

## Acceptance checks for the update

- Verify hook extraction preserves independent instances and that render
  isolation is measured at an actual component or subscription boundary.
- Exercise invalid reducer events and stale request completion after retry.
- Check controlled parent updates, uncontrolled defaults, prop merging, keyboard
  behavior, and nested provider independence where applicable.
- Verify URL back/forward behavior, loader dependencies, cancellation, and the
  server-only boundary in the actual framework.
- Run `pnpm check`; distinguish executable examples from conceptual snippets
  and leave automatic skill-selection claims unverified without evaluation.
