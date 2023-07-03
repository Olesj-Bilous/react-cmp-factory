import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";

import { StateFactory } from "./componentFactory";
import { ClassComponentFactory } from "./classComponentFactory";

const stringShell : Wayang<string, {}> = function<TRoot>(stateTools: IStateTools<TRoot, string>) {
  return function StringComponent() {
    const state = stateTools.stateHook(stateTools.selector);
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

const reduxFactory = new StateFactory(useSelector);

const viewFactory = reduxFactory.createViewFactory(stringShell);

const componentFactory = viewFactory.createComponentFactory((root: ExampleVm, model: string) => model);

const classComponentFactory = new ClassComponentFactory<ExampleVm, ExampleVm>({
  well: componentFactory,
  wellWell: componentFactory
});

const Example = classComponentFactory.createComponent((root: ExampleVm) => root);

export const ReduxProvider = () => (
  <Provider store={reduxStore}>
    <Example />
  </Provider>
);
