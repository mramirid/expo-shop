import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../types";
import Product from "../../types/product";
import PRODUCTS from "../../data/products";

export interface ProductsState {
  publicProducts: Product[];
  userProducts: Product[];
}

export const initialState: ProductsState = {
  publicProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const selectPublicProducts = (state: RootState) => {
  return state.products.publicProducts;
};

export default productsSlice.reducer;
