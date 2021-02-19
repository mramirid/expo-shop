import { createAsyncThunk } from "@reduxjs/toolkit";

import { FirePOSTResBody } from "../../types/firebase";
import Order, { AddOrderPayload, FireGETOrders } from "../../types/order";
import Cart from "../../types/cart";
import { AppThunkAPIConfig } from "../types";

export const fetchOrders = createAsyncThunk<Order[], void, AppThunkAPIConfig>(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${process.env.DB_URL}/orders/u1.json`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue({
          statusCode: res.status,
          message: "Failed to fetch orders",
        });
      }

      const resData: FireGETOrders = await res.json();
      const orders: Order[] = [];
      for (const orderId in resData) {
        orders.push({
          id: orderId,
          ...resData[orderId],
        });
      }
      return orders;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        statusCode: 400,
        message: "Cannot reach the server, try again later",
      });
    }
  },
);

export const addOrder = createAsyncThunk<Order, Cart, AppThunkAPIConfig>(
  "orders/addOrder",
  async (payload, thunkAPI) => {
    try {
      const newOrder: AddOrderPayload = {
        ...payload,
        date: new Date().getTime(),
      };

      const res = await fetch(`${process.env.DB_URL}/orders/u1.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      if (!res.ok) {
        return thunkAPI.rejectWithValue({
          statusCode: res.status,
          message: "Failed to add order",
        });
      }

      const resData: FirePOSTResBody = await res.json();
      return {
        id: resData.name,
        ...newOrder,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        statusCode: 400,
        message: "Cannot reach the server, try again later",
      });
    }
  },
);
