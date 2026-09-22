# Compiler and memoization

Read this reference when changing memoization, enabling the React Compiler,
or maintaining a library that may be compiled by its consumers.

## Detect the actual build setting

Look for `babel-plugin-react-compiler`, a framework or bundler Compiler
setting, compiler gating, and the `eslint-plugin-react-hooks` configuration.
React 19 does not enable the Compiler by installing React. The build must
configure it.

React Compiler 1.0 is a stable build-time optimizer. It also supplies
Rules-of-React diagnostics through the current `eslint-plugin-react-hooks`
presets. Treat compiler output and lint diagnostics as build evidence, not as
a reason to relax purity.

## Default when the Compiler is enabled

Write plain, pure components and Hooks. Let the Compiler memoize ordinary
components, derived values, and callbacks.

Do not add new `useMemo`, `useCallback`, or `memo` just to prevent a
possible re-render. Keep manual memoization when:

- profiling shows a real regression without it;
- a non-React library requires referential equality;
- a public library must preserve behavior without assuming consumers compile
  the package; or
- the memoized identity is deliberately part of an Effect or external API
  contract.

Existing memoization can stay during incremental adoption. Removing it can
change compiled behavior, so measure and test that change.

## Default without the Compiler

Do not memoize by habit. First keep render pure, split an expensive subtree,
move state closer to its consumers, or use a transition for non-urgent work.
Add manual memoization only for a measured problem or a required stable
identity. Memoization is a performance hint, not a correctness fix.

## Good and bad

**Bad.**

```tsx
const visibleItems = useMemo(() => filterItems(items, query), [items, query]);

const onSelect = useCallback((id: string) => selectItem(id), [selectItem]);
```

**Good.**

```tsx
const visibleItems = filterItems(items, query);
const onSelect = (id: string) => selectItem(id);
```

Use the good version for ordinary React code when the Compiler is enabled.
Keep the bad version only when profiling or an external identity contract
shows that it is needed, and record that reason near the code.

## Library adoption

A library that supports React versions below 19 needs the configured Compiler
target and `react-compiler-runtime` when its output uses that runtime. Test
the library both with and without compilation. Do not require every consumer
to enable the Compiler unless the package contract says so.
