import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

import { RootState } from "../types";
import { Cart } from "../../types/cart";
import Order from "../../types/order";

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Cart>) {
      state.items.unshift({
        id: nanoid(),
        ...action.payload,
        date: new Date().getTime(),
      });
    },
  },
});

export const selectOrders = (state: RootState) => state.orders.items;

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
