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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.userProducts = action.payload.filter(
          (product) => product.ownerId === "u1",
        );
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.userProducts.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        let itemIndex = state.products.findIndex(
          (product) => product.id === payload.id,
        );
        state.products[itemIndex] = {
          ...state.products[itemIndex],
          title: payload.title,
          imageUrl: payload.imageUrl,
          description: payload.description,
        };

        itemIndex = state.userProducts.findIndex(
          (product) => product.id === payload.id,
        );
        state.userProducts[itemIndex] = {
          ...state.userProducts[itemIndex],
          title: payload.title,
          imageUrl: payload.imageUrl,
          description: payload.description,
        };
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.userProducts = state.userProducts.filter(
          (userProduct) => userProduct.id !== action.payload,
        );
        state.products = state.products.filter(
          (product) => product.id !== action.payload,
        );
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectUserProducts = (state: RootState) => {
  return state.products.userProducts;
};

export default productsSlice.reducer;
