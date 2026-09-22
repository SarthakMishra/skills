# Effects and data

Read this reference when code uses `useEffect`, loads data, reads a Promise
with `use`, or crosses a Server Component boundary.

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

## Choose a data source before writing an Effect

Use this order:

1. In a Server Component or framework loader, fetch or await data on the
   server. Use the framework's cache or React `cache` where its contract
   applies.
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
  fetch("/api/search?q=" + query)
    .then((response) => response.json())
    .then(setResults);
}, [query]);
```

## Read cached Promises with use

```tsx
import { Suspense, use } from "react";

function SearchResults({ resultsPromise }: { resultsPromise: Promise<Result[]> }) {
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
