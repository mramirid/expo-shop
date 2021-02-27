import { createAsyncThunk } from '@reduxjs/toolkit';

import Cart from '../../global-types/cart';
import { FireDBErrorResBody, FirePOSTResBody } from '../../global-types/firebase';
import Order, { OrderData } from '../../global-types/order';
import { AppThunkAPIConfig } from '../types';

interface FireGETOrders {
  [orderId: string]: OrderData;
}

export const fetchOrders = createAsyncThunk<Order[], void, AppThunkAPIConfig>(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    try {
      const { userId, token } = thunkAPI.getState().auth;
      const res = await fetch(`${process.env.DB_URL}/orders/${userId}.json?auth=${token}`);

      if (!res.ok) {
        const resData: FireDBErrorResBody = await res.json();
        return thunkAPI.rejectWithValue({
          statusCode: res.status,
          message: resData.error || 'Failed to fetch orders',
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
        message: 'Cannot reach the server, try again later',
      });
    }
  },
  {
    condition: (_, thunkAPI) => {
      const { userId, token } = thunkAPI.getState().auth;
      return !!userId && !!token;
    },
  }
);

export const addOrder = createAsyncThunk<Order, Cart, AppThunkAPIConfig>(
  'orders/addOrder',
  async (payload, thunkAPI) => {
    try {
      const { userId, token } = thunkAPI.getState().auth;
      const newOrder: OrderData = {
        ...payload,
        date: new Date().getTime(),
      };
      const res = await fetch(`${process.env.DB_URL}/orders/${userId}.json?auth=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        const resData: FireDBErrorResBody = await res.json();
        return thunkAPI.rejectWithValue({
          statusCode: res.status,
          message: resData.error || 'Failed to add orders',
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
        message: 'Cannot reach the server, try again later',
      });
    }
  },
  {
    condition: (_, thunkAPI) => {
      const { userId, token } = thunkAPI.getState().auth;
      return !!userId && !!token;
    },
  }
);

export const pushNotifToProductOwners = createAsyncThunk<void, Order, AppThunkAPIConfig>(
  'orders/pushNotifToProductOwners',
  async (payload) => {
    await Promise.allSettled(
      payload.items.map((cartItem) => {
        return fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: cartItem.ownerPushToken,
            title: 'Order was Placed!',
            body: cartItem.title,
            data: {
              quantity: cartItem.qty,
              price: cartItem.price,
            },
          }),
        });
      })
    );
  }
);
