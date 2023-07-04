import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { ExampleVm, Example } from "./example/redux/exampleFactories";

const slice = createSlice({
  name: 'example',
  initialState: { well: 'well', wellWell: 'well well', edit: false },
  reducers: {
    toggleEdit(state, action) {
      state.edit = !state.edit;
    }
  }
});

const reduxStore = configureStore<ExampleVm>({
  reducer: slice.reducer
})

export const ReduxExample = () => (
  <Provider store={reduxStore}>
    <Example />
  </Provider>
);
