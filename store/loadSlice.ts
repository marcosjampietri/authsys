import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";

interface loadState {
  complete: boolean;
}

const initialState = {
  complete: false,
  paying: false,
} as loadState;

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    setComplete(state, { payload }) {
      state.complete = payload;
    },
    setPaying: (state, { payload }) => {
      return {
        ...state,
        paying: payload,
      };
    },
  },
});

export const { setComplete, setPaying } = loadSlice.actions;
export const selectload = (state: AppState) => state.load;
export default loadSlice.reducer;
