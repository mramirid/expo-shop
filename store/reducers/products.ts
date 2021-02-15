import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../types";
import Product from "../../types/product";
import PRODUCTS from "../../data/products";

interface ProductsState {
  products: Product[];
  userProducts: Product[];
}

const initialState: ProductsState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
