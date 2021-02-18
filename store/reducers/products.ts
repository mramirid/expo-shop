import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

import { RootState } from "../types";
import Product, {
  AddProductPayload,
  UpdateProductPayload,
} from "../../types/product";
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
    addUserProduct(state, action: PayloadAction<AddProductPayload>) {
      const createdProduct: Product = {
        id: nanoid(),
        ...action.payload,
      };
      state.products.unshift(createdProduct);
      state.userProducts.unshift(createdProduct);
    },
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
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectUserProducts = (state: RootState) => {
  return state.products.userProducts;
};

export const {
  deleteUserProducts,
  addUserProduct,
  updateUserProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
