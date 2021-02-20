import { createAsyncThunk } from "@reduxjs/toolkit";

import { FireDBErrorResBody, FirePOSTResBody } from "../../types/firebase";
import Order, { OrderData } from "../../types/order";
import Cart from "../../types/cart";
import { AppThunkAPIConfig } from "../types";
import { UserAuth } from "../../types/auth";

interface FireGETOrders {
  [orderId: string]: OrderData;
}

export const fetchOrders = createAsyncThunk<
  Order[],
  UserAuth,
  AppThunkAPIConfig
>("orders/fetchOrders", async (payload, thunkAPI) => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}/orders/${payload.userId}.json?auth=${payload.token}`,
    );

    if (!res.ok) {
      const resData: FireDBErrorResBody = await res.json();
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: resData.error || "Failed to fetch orders",
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
  } catch (_) {
    return thunkAPI.rejectWithValue({
      statusCode: 200,
      message: "Cannot reach the server, try again later",
    });
  }
});

interface AddOrderPayload {
  userAuth: UserAuth;
  data: Cart;
}

export const addOrder = createAsyncThunk<
  Order,
  AddOrderPayload,
  AppThunkAPIConfig
>("orders/addOrder", async (payload, thunkAPI) => {
  try {
    const newOrder: OrderData = {
      ...payload.data,
      date: new Date().getTime(),
    };
    const res = await fetch(
      `${process.env.DB_URL}/orders/${payload.userAuth.userId}.json?auth=${payload.userAuth.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      },
    );

    if (!res.ok) {
      const resData: FireDBErrorResBody = await res.json();
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: resData.error || "Failed to add orders",
      });
    }

    const resData: FirePOSTResBody = await res.json();
    return {
      id: resData.name,
      ...newOrder,
    };
  } catch (_) {
    return thunkAPI.rejectWithValue({
      statusCode: 200,
      message: "Cannot reach the server, try again later",
    });
  }
});
