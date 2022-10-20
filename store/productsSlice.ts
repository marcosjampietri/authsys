import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { Product } from "../types/product";
import { AppState } from "../store/index";
import axios from "axios";

export interface ProductsState {
  list: any[];
  loading: boolean;
}

const initialState = {
  loading: false,
  list: [],
} as ProductsState;

export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const url =
      process.env["NODE_ENV"] === "development" ? "http://localhost:3000" : "";
    const productsUrl = () => `${url}/api/products`;
    const { data: productsList } = await axios({
      url: productsUrl(),
      method: "get",
    });
    return productsList;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const selectProducts = (state: AppState) => state.products;
export default productsSlice.reducer;
