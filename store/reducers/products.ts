import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../types";
import Product, { UpdateProductPayload } from "../../types/product";
import { fetchProducts, postAddProduct } from "../thunks/products";

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
  reducers: {
    updateUserProduct(state, { payload }: PayloadAction<UpdateProductPayload>) {
      let itemIndex = state.products.findIndex(
        (product) => product.id === payload.productId,
      );
      state.products[itemIndex] = {
        ...state.products[itemIndex],
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
      };

      itemIndex = state.userProducts.findIndex(
        (product) => product.id === payload.productId,
      );
      state.userProducts[itemIndex] = {
        ...state.userProducts[itemIndex],
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
      };
    },
    deleteUserProducts(state, action: PayloadAction<string>) {
      state.userProducts = state.userProducts.filter(
        (userProduct) => userProduct.id !== action.payload,
      );
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.userProducts = action.payload.filter(
          (product) => product.ownerId === "u1",
        );
      })
      .addCase(postAddProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.userProducts.push(action.payload);
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectUserProducts = (state: RootState) => {
  return state.products.userProducts;
};

export const { deleteUserProducts, updateUserProduct } = productsSlice.actions;

export default productsSlice.reducer;
