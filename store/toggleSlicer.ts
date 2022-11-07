import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";

interface toggleState {
  NavOn: boolean;
  CrsOn: boolean;
}

const initialState = {
  CrsOn: true,
  NavOn: false,
} as toggleState;

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    navOnAction(state) {
      state.NavOn = true;
    },
    navOffAction(state) {
      state.NavOn = false;
    },
    courseNavOn(state) {
      state.CrsOn = true;
    },
    courseNavOff(state) {
      state.CrsOn = false;
    },
  },
});

export const { navOnAction, navOffAction, courseNavOn, courseNavOff } =
  toggleSlice.actions;
export const selectToggle = (state: AppState) => state.toggle;
export default toggleSlice.reducer;
