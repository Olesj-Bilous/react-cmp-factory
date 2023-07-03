import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";

import { componentFactory } from "./componentFactory";
import modelComponentFactory from "./modelComponentShell";

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

const reduxStringFactory = reduxFactory(stringShell);

const reduxStringView = reduxStringFactory((root: ExampleVm, model: string) => model);

const ReduxExample = modelComponentFactory<ExampleVm>({
  well: reduxStringView,
  wellWell: reduxStringView
})((root: ExampleVm) => root);

export const ReduxProvider = () => (
  <Provider store={reduxStore}>
    <ReduxExample />
  </Provider>
);
