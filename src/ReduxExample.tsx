import { Provider } from "react-redux";

import { Example } from "./example/redux/exampleFactories";
import { reduxStore } from "./example/redux/exampleStore";

export const ReduxExample = () => (
  <Provider store={reduxStore}>
    <Example />
  </Provider>
);
