import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";

import { StateFactory, componentFactory } from "./componentFactory";
import classComponentFactory from "./classComponentFactory";

const stringShell = (stateHook: SelectorHook) => function <TRoot>(selector: Selector<TRoot, string>) {
  return function StringComponent() {
    const state = stateHook(selector);
    return <>{state}</>
  }
}

export interface ExampleVm {
  well: string,
  wellWell: string
}

const reduxStore = configureStore<ExampleVm>({
  reducer: (state, action) => state ?? { well: 'well', wellWell: 'well well' }
})

const reduxFactory = componentFactory(useSelector);
const factory = new StateFactory(useSelector);

const reduxStringFactory = reduxFactory(stringShell);
const cmp = factory.createViewFactory(stringShell);

const reduxStringView = reduxStringFactory((root: ExampleVm, model: string) => model);
const view = cmp.createComponentFactory((root: ExampleVm, model: string) => model)

const Example = classComponentFactory<ExampleVm>({
  well: view,
  wellWell: view
})((root: ExampleVm) => root)

export const ReduxProvider = () => (
  <Provider store={reduxStore}>
    <Example />
  </Provider>
);
