# Effects and data

Read this reference when code uses `useEffect`, loads data, reads a Promise
with `use`, subscribes to external stores, integrates route data, or crosses a
Server Component boundary.

## Keep Effects for external synchronization

Effects run after React commits. Keep an Effect when it synchronizes with
something React does not own, such as a DOM API, a subscription, a timer, a
browser API, or a third-party widget. Return cleanup for work that can outlive
the component.

| Goal                                       | Prefer                                             |
| ------------------------------------------ | -------------------------------------------------- |
| Derive a value from props or state         | Compute it during render.                          |
| Respond to a click, submit, or selection   | Use the event handler or an Action.                |
| Reset an entire subtree for a new identity | Change the component's `key`.                      |
| Subscribe to an external store             | Use `useSyncExternalStore`.                        |
| Keep a non-React widget synchronized       | Use an Effect with cleanup.                        |
| Read current values from an Effect event   | Use `useEffectEvent` only for the event-like part. |

**Bad.** An Effect sets `fullName` after `firstName` or `lastName`
changes.

**Good.** Render `firstName + " " + lastName` directly. There is no external
system to synchronize.

## Separate independent synchronization processes

Give each Effect one external relationship with its own dependencies and cleanup.
Keep setup and teardown for the same resource together. Extract a Hook only when
it names a cohesive synchronization contract; remove derived-state Effects first.

Bad: one Effect reloads an invoice and subscribes to unload warnings whenever
`isDirty` changes. Good: keep loading in the resource layer and attach the warning
only while dirty. Test setup, cleanup, and setup again under Strict Mode, changed
dependencies, and unmount; do not suppress replay with a run-once ref.

On React 19+, prefer the framework's metadata owner or a single rendered
`<title>{title}</title>` to a custom document-title Effect. An unload listener
also does not guard client navigation; use the router's blocker when required
and test both paths. Browser prompts are not a reliable persistence mechanism.

## Subscribe to external state deliberately

Use React state by default. Reach for the existing external-store integration
when state already lives outside React or measured subscription costs justify it.
With `useSyncExternalStore` (React 18+), require stable subscription identity,
unsubscribe cleanup, and an immutable snapshot whose identity stays unchanged
until its data changes. Cache snapshots instead of allocating during every read.

Bad: `getSnapshot: () => ({ ...store.state })` creates a fresh object even when
nothing changed; mutating and returning the same object hides real changes.
Good: expose the stored immutable snapshot and replace it when its data changes.
For SSR, provide `getServerSnapshot` with matching server and hydration data;
keep mutable user stores scoped to the request, not shared across requests.

Selecting one cell's stable snapshot can avoid rendering for other cells' updates
but does not stop a store-wide listener notification. Use the existing selector
API or per-key subscriptions when that notification cost matters. Check unchanged
snapshot identity, changed values, cleanup, and SSR hydration when supported.
External-store updates cannot be made non-blocking by wrapping them in a React
Transition; keep input responsiveness decisions explicit.

## Choose a data source before writing an Effect

Use this order:

1. Use the existing framework loader or Server Component for route-owned data.
   Confirm where it executes: client router loaders can run in the browser,
   and full-stack loaders may run on both server and client. Keep server-only
   access behind the framework's server boundary; React `cache` is for RSC.
2. In a Suspense-enabled client path, pass a cached Promise from a route loader,
   Server Component, or data library and read it with `use(promise)`.
3. If the project has no Suspense-compatible source, use a data library or a
   custom hook that handles loading, errors, cancellation, stale responses, and
   the cache behavior the product needs.

An Effect-based custom hook is valid when it is the project's data source. The
problem is the incomplete pattern below, not the `useEffect` call itself:

```tsx
// Bad: no race protection, error state, or cache.
useEffect(() => {
  fetch('/api/search?q=' + query)
    .then((response) => response.json())
    .then(setResults);
}, [query]);
```

## Let routes own navigable state and data dependencies

Keep shareable filters and record identity in validated route parameters; keep
transient interaction state local. Use the existing query cache as the owner of
server records instead of mirroring loader results into component state.

For TanStack Router v1, validate search input and select the fields that affect
loading through `loaderDeps`. Consume those dependencies in the loader, propagate
its abort signal when that loader owns the request, and use the existing Query
integration when Query owns caching and cancellation. Confirm installed APIs
before changing router behavior.

Bad: a list loader closes over an untracked filter while a page Effect maintains
a second copy of the URL. Good: derive the filter from validated search and
include it in loader dependencies and the corresponding query key. Test back,
forward, direct links, rapid filter changes, and pending/error recovery. Keep
loading and preloading read-only; they may run without a user visiting the page.

## Read cached Promises with use

```tsx
import { Suspense, use } from 'react';

function SearchResults({
  resultsPromise,
}: {
  resultsPromise: Promise<Result[]>;
}) {
  const results = use(resultsPromise);
  return results.map((result) => <ResultRow key={result.id} result={result} />);
}

function SearchPage({ resultsPromise }: Props) {
  return (
    <Suspense fallback={<p>Loading results...</p>}>
      <SearchResults resultsPromise={resultsPromise} />
    </Suspense>
  );
}
```

The Promise passed to `use` must be cached or supplied by a
Suspense-compatible framework or library. Do not create `fetch(...)` or an
uncached async call in the component that calls `use`, because each render
would create a new Promise and repeatedly suspend. Put rejection under an
Error Boundary when the UI needs a local recovery state.

`use` can read a Promise or Context and can appear in a conditional or loop.
It is not a reason to call ordinary Hooks conditionally. Reading Context with
`use(context)` is not supported in Server Components; use the framework's
supported data and context pattern there.

## Server Components and resource caches

Server Components are a framework or bundler architecture, not a rendering mode
that a client-only React app can turn on with a directive. React 19 stabilizes
the user-facing RSC behavior, but the APIs used to implement an RSC bundler or
framework do not follow normal minor-version semver. Pin the framework and
React versions the framework supports.

`cache(fn)` and `cacheSignal()` are currently Server Component APIs.
`cache(fn)` deduplicates work for a server render scope, while
`cacheSignal()` supplies an abort signal for work whose cache lifetime ends.
Do not use either as a general browser data cache.
