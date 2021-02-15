import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  reducers: {
    deleteUserProducts(state, action: PayloadAction<string>) {
      state.userProducts = state.userProducts.filter(
        (userProduct) => userProduct.id !== action.payload,
      );
    },
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectUserProducts = (state: RootState) => {
  return state.products.userProducts;
};

export const { deleteUserProducts } = productsSlice.actions;

export default productsSlice.reducer;
