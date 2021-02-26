import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../types";
import Cart from "../../types/cart";
import Product from "../../types/product";
import { deleteProduct, updateProduct } from "../thunks/products";
import { addOrder } from "../thunks/orders";

const initialState: Cart = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const itemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].qty++;
      } else {
        state.items.push({
          productId: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          qty: 1,
        });
      }
      state.totalAmount += action.payload.price;
    },
    removeItem(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item.productId === action.payload,
      );
      state.totalAmount -= state.items[itemIndex].price;
      if (state.items[itemIndex].qty > 1) {
        state.items[itemIndex].qty--;
      } else {
        state.items.splice(itemIndex, 1);
      }
    },
    clearCartState(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        const itemIndex = state.items.findIndex(
          (item) => item.productId === payload.productId,
        );
        if (itemIndex >= 0) {
          state.items[itemIndex].title = payload.title;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex(
          (item) => item.productId === action.payload.productId,
        );
        if (itemIndex >= 0) {
          state.totalAmount -=
            state.items[itemIndex].price * state.items[itemIndex].qty;
          state.items.splice(itemIndex, 1);
        }
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.items = [];
        state.totalAmount = 0;
      });
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalAmount = (state: RootState) => {
  return state.cart.totalAmount;
};

export const { addToCart, removeItem, clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
