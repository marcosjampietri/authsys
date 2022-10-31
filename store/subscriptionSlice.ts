import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./index";

interface subsState {
  productID: string;
}
const initialState = { productID: "" } as subsState;

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    // setProductID(state, action: PayloadAction<string>) {
    //   state.productID = action.payload;
    // },
    setProductID: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        productID: payload,
      };
    },
  },
});

export const { setProductID } = subscriptionSlice.actions;
export const selectProducts = (state: AppState) =>
  <subsState>state.subscription;
export default subscriptionSlice.reducer;
