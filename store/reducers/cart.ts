import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../types";
import CartItem from "../../types/cart-item";
import Product from "../../types/product";

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

export const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
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
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalAmount = (state: RootState) => {
  return state.cart.totalAmount;
};

export const { addToCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
