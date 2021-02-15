import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../types";
import { Cart } from "../../types/cart";
import Product, { UpdateProductPayload } from "../../types/product";

type CartState = Cart;

const initialState: CartState = {
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
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    updateProduct(state, action: PayloadAction<UpdateProductPayload>) {
      const itemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].title = action.payload.title;
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item.productId === action.payload,
      );
      if (itemIndex >= 0) {
        state.totalAmount -=
          state.items[itemIndex].price * state.items[itemIndex].qty;
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalAmount = (state: RootState) => {
  return state.cart.totalAmount;
};

export const {
  addToCart,
  removeItem,
  clearCart,
  updateProduct,
  deleteProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
