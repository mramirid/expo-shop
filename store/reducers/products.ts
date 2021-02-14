import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../types";
import Product from "../../types/product";
import PRODUCTS from "../../data/products";

export interface ProductsState {
  products: Product[];
  userProducts: Product[];
}

export const initialState: ProductsState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
