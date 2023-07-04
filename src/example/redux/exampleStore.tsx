import { configureStore, createSlice } from "@reduxjs/toolkit";

import { ExampleVm } from "./exampleFactories";

const slice = createSlice({
  name: 'example',
  initialState: { well: 'well', wellWell: 'well well', edit: false },
  reducers: {
    toggleEdit(state, action) {
      state.edit = action.payload;
    }
  }
});

export const { toggleEdit } = slice.actions;

export const reduxStore = configureStore<ExampleVm>({
  reducer: slice.reducer
})
