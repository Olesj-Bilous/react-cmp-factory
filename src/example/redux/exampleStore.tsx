import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

import { ExampleVm } from "./exampleFactories";

const slice = createSlice({
  name: 'example',
  initialState: {
    well: 'well',
    wellWell: 'well well',
    state: {
      editModel: false,
      editProperties: {
        well: false,
        wellWell: false
      }
    }
  },
  reducers: {
    toggleEdit(state, action) {
      state.state.editModel = !state.state.editModel
    },
    togglePropertyEdit(state, action : PayloadAction<keyof ExampleVm['state']['editProperties']>) {
      state.state.editProperties[action.payload] = !state.state.editProperties[action.payload]
    }
  }
});

export const { toggleEdit } = slice.actions;

export const reduxStore = configureStore({
  reducer: slice.reducer
})
