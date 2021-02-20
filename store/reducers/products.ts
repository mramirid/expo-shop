import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../types";
import Product from "../../types/product";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
  addProduct,
} from "../thunks/products";

interface ProductsState {
  products: Product[];
  userProducts: Product[];
}

const initialState: ProductsState = {
  products: [],
  userProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.userProducts = payload.products.filter(
          (product) => product.ownerId === payload.userId,
        );
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.userProducts.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        let itemIndex = state.products.findIndex(
          (product) => product.id === payload.productId,
        );
        state.products[itemIndex] = {
          ...state.products[itemIndex],
          ...payload.data,
        };

        itemIndex = state.userProducts.findIndex(
          (product) => product.id === payload.productId,
        );
        state.userProducts[itemIndex] = {
          ...state.userProducts[itemIndex],
          ...payload.data,
        };
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.userProducts = state.userProducts.filter(
          (userProduct) => userProduct.id !== action.payload.productId,
        );
        state.products = state.products.filter(
          (product) => product.id !== action.payload.productId,
        );
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectUserProducts = (state: RootState) => {
  return state.products.userProducts;
};

export default productsSlice.reducer;
