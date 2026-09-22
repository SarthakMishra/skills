# Composition patterns

Use this reference when a component API is accumulating structural boolean props,
render-slot props, or state that several related pieces need to share.

## Choose the lightest pattern

1. Keep ordinary components prop-driven when one component owns the behavior.
2. Use children for static structure and slots.
3. Use explicit variants when modes change structure or behavior.
4. Use compound components with a provider when related parts need shared state.
5. Lift state to the closest common owner when siblings, portals, or dialogs need
   the same state.

Do not add Context or a provider to avoid passing one prop through one component.

## Replace structural booleans with composition

Bad:

```tsx
<Composer isThread isEditing={false} showAttachments showFormatting={false} channelId={channelId} />
```

Good:

```tsx
<ThreadComposer channelId={channelId}>
  <Composer.Input />
  <Composer.Footer>
    <Composer.Formatting />
    <Composer.Submit />
  </Composer.Footer>
</ThreadComposer>
```

The variant names the use case and the caller chooses the pieces. Shared
low-level parts can still live in Composer.* components.

## Use children for structure

Use children when the parent only needs to place caller-provided UI. Use a
render prop when the parent must provide data or state to each rendered child.

Bad:

```tsx
<Panel
  renderHeader={() => <Toolbar />}
  renderBody={() => <Results />}
  renderActions={() => <SaveButton />}
/>
```

Good:

```tsx
<Panel>
  <Panel.Header>
    <Toolbar />
  </Panel.Header>
  <Panel.Body>
    <Results />
  </Panel.Body>
  <Panel.Actions>
    <SaveButton />
  </Panel.Actions>
</Panel>
```

A render prop is appropriate when the parent owns the data:

```tsx
<List
  items={items}
  renderItem={({ item, index }) => <ListRow key={item.id} item={item} index={index} />}
/>
```

## Use compound components for shared behavior

Use a compound API when several subcomponents form one unit and need the same
state or actions. Keep the context value a small contract instead of exposing
the provider's state library or implementation.

```tsx
type TabsValue = {
  state: { selectedId: string };
  actions: { select: (id: string) => void };
};

const TabsContext = createContext<TabsValue | null>(null);

function useTabs() {
  const value = use(TabsContext);
  if (!value) throw new Error("Tabs components must be inside <Tabs>");
  return value;
}

function Tabs({
  selectedId,
  onSelect,
  children,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <TabsContext value={{ state: { selectedId }, actions: { select: onSelect } }}>
      {children}
    </TabsContext>
  );
}

function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    state: { selectedId },
    actions: { select },
  } = useTabs();

  return (
    <button type="button" aria-selected={selectedId === id} onClick={() => select(id)}>
      {children}
    </button>
  );
}
```

The example uses the React 19 Context provider syntax and use(context).
useContext remains valid for ordinary top-level reads. Add a provider only
when the parts need shared behavior, not as a default wrapper.

## Lift state to the common owner

If a preview, toolbar, dialog action, or portal needs the same state as an input,
move the state to their closest common owner. Do not synchronize child state to a
parent with an Effect or expose a ref as a state channel.

Bad:

```tsx
function Composer({ onTextChange }: { onTextChange: (text: string) => void }) {
  const [text, setText] = useState("");

  useEffect(() => {
    onTextChange(text);
  }, [text, onTextChange]);

  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;
}
```

Good:

```tsx
function ComposerProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState("");

  return (
    <ComposerContext value={{ state: { text }, actions: { setText } }}>{children}</ComposerContext>
  );
}

function ComposerPreview() {
  const {
    state: { text },
  } = useComposer();
  return <output>{text}</output>;
}
```

Keep the provider responsible for state management. Compound parts consume the
contract and do not know whether the implementation uses useState, a reducer,
a store, or server synchronization.

## Name meaningful variants

When a mode changes the component's structure, give it a component name and
share the internal pieces.

Bad:

```tsx
<Composer mode="edit" isThread={false} showMentions showCancel />
```

Good:

```tsx
<EditMessageComposer messageId={messageId} />
<ThreadComposer channelId={channelId} />
```

Use one component with a prop when the structure stays the same and only a
genuine value changes. Split only when the separate names make the API or
rendered structure easier to understand.
