# React component factory

A library of factory methods that inject selector and state hook dependencies into state-managed components. Currently in the earliest development stages.

This library enables you to write React components that depend only on the derived state that they consume. The component should no longer concern itself with how the root state is managed, or how the component state is derived from the root state.

In the example, a dependency injection container for a React component, called a 'shell', encases a component that doesn't know which state management library it's using, or where the state comes from.

```typescript
const stringShell = (stateHook: SelectorHook) => function <TRoot>(selector: Selector<TRoot, string>) {
  return function StringComponent() {
    const state = stateHook(selector);
    return <>{state}</>
  }
}
```

We configure a Redux store, though any state management library that allows us to craft some selector hook will do. We pass the Redux 'useSelector' hook to the component factory.


```typescript
const reduxStore = configureStore<ExampleVm>({
  reducer: (state, action) => state ?? { well: 'well', wellWell: 'well well' }
})

const reduxFactory = componentFactory(useSelector);
```

The resulting Redux-managed component factory will accept any component shell and inject it with the Redux state hook. 

We can now pass a function that allows a component to derive its viewmodel from the root state as well as the state of its model. This allows the component to derive a viewmodel from some model in the state tree, without knowing the exact shape of that model. In effect, different instances of the same component can be configured to derive their viewmodel from entirely different state selectors.

However, in this simple example the viewmodel is the same as the model, a string.

```typescript
const reduxStringView = reduxStringFactory((root: ExampleVm, model: string) => model);
```

Another factory method is now ready to receive the Redux string ViewShell ('reduxStringView'). It will use it to pass selectors to the appropriate components for each of its model's properties. The resulting component contains stateful elements yet does not have any state of its own. The configurable structure of the component is determined entirely before the component renders. Because it doesn't use any state, the component also doesn't need to be aware of the state management utilities.

```typescript
const ReduxExample = modelComponentFactory<ExampleVm>({
  well: reduxStringView,
  wellWell: reduxStringView
})((root: ExampleVm) => root);

export const ReduxProvider = () => (
  <Provider store={reduxStore}>
    <ReduxExample />
  </Provider>
);
```

The result is a well-structured and safely typed example application, with minimal configuration and maximally reusable components.
