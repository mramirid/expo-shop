import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../types";
import Order from "../../types/order";
import { addOrder, fetchOrders } from "../thunks/orders";

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const selectOrders = (state: RootState) => state.orders.items;

export default ordersSlice.reducer;
