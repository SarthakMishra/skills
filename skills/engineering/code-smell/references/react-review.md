# React review

Read this when reviewing React components, hooks, or their framework boundaries.
Use the installed React version, JSX runtime, framework, and compiler settings
to decide which patterns apply. These checks add to the general code review.

## State and Effects

- Find duplicated server/cache state, mirrored props, derived values stored in
  state, contradictory boolean flags, and state owned too far above its users.
  Trace the update that can leave copies inconsistent. Suggest deriving during
  render, using the existing cache, or representing valid states explicitly.
  A deliberate editable snapshot can differ from its source; inspect reset and
  reconciliation rules before flagging it.
- Trace Effects to the external system they synchronize. Inspect missing or
  unstable dependencies, stale closures, subscription/timer cleanup, and request
  races during prop changes or unmount. Suggest derivation for computed values,
  an event handler for user actions, or a focused synchronization Effect with
  cleanup. Fetching in an Effect can be valid; check the existing data-loading
  architecture before proposing a migration.
- Check render purity, mutation of props/state, conditional hook calls, and
  nested component definitions that reset child state. Account for React's
  version-specific APIs: React 19's `use` can be called conditionally, unlike
  ordinary hooks. A callback name beginning with `use` alone proves nothing.

Conceptual React 18+ example, TSX with Hooks inside a component; imports, props,
and JSX omitted. Assume `items` and `query` already determine the displayed list:

```tsx
// Bad: a second state value lags its source until the Effect runs.
const [visible, setVisible] = useState(items);
useEffect(() => {
  setVisible(items.filter((item) => item.name.includes(query)));
}, [items, query]);

// Good: one source of truth for this render.
const visible = items.filter((item) => item.name.includes(query));
```

Accept the suggestion when changing `items` or `query` immediately determines
the rendered list without synchronizing a second state value. If profiling
shows the filtering is costly, assess memoization separately. See React's
[Effect guidance](https://react.dev/learn/you-might-not-need-an-effect) for cases
where synchronization is still necessary.

## Identity and rendering

- Trace keys through reorder, insertion, filtering, and editing. An index key
  is a finding when it can attach local state to a different item; static lists
  do not establish that failure. Suggest stable domain identity where needed.
- Inspect context values, broad store subscriptions, and expensive repeated work
  along a real interaction. Follow props to memoized consumers before treating
  identity churn as a problem. Use traces or profiling for claims about observed
  slowness; source alone can establish repeated work, not its measured latency.
- Review `memo`, `useMemo`, and `useCallback` against their actual consumers,
  dependency stability, and compiler configuration. Their presence or absence
  alone is not a smell. Suggest removing ineffective caching or narrowing state
  ownership before adding memoization everywhere.

Bad: report every inline callback as slow.
Good: show an unstable subscription dependency repeatedly reconnecting to a
service, or name a suspected rendering cost and the interaction to profile.

## Composition and boundaries

- Inspect components and hooks with unrelated data loading, business policy,
  interaction state, and rendering responsibilities. Trace boolean prop modes
  to invalid combinations. Suggest focused composition or explicit variants;
  keep cohesive JSX together even when it is long.
- When the framework supports server/client boundaries, trace client entry
  imports, server-only dependencies, browser APIs used during server rendering,
  and values crossing the boundary. Verify the framework version and contract
  before suggesting a move. Suggest keeping server work with its owner and
  making the client boundary as focused as the interaction allows.
- Trace async controls through pending, failure, retry, and cancellation paths.
  Check duplicate submissions and inaccessible custom controls, missing labels,
  focus loss, and keyboard behavior. Native controls or existing accessible
  components are the default alternatives to ad hoc interaction handlers.

Bad: replace a clickable `div` with a `button` but discard its accessible name or
the submission behavior its form needs.
Good: suggest the existing button component with its label, keyboard behavior,
and explicit form role preserved; verify the interaction in its containing form.

Finish this branch with source-backed findings or named uncertainties for each
applicable area. Mark rendering or accessibility behavior that needs a browser
as unverified if it was inspected only in source.
