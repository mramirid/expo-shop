import { createAsyncThunk } from "@reduxjs/toolkit";

import { FirePOSTResBody } from "../../types/firebase";
import Product, {
  AddProductPayload,
  FireGETProducts,
} from "../../types/product";
import { AppThunkAPIConfig } from "../types";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  AppThunkAPIConfig
>("products/fetchProducts", async (payload, thunkAPI) => {
  try {
    const res = await fetch(`${process.env.DB_URL}/products.json`);

    if (!res.ok) {
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: "Failed to fetch products",
      });
    }

    const resData: FireGETProducts = await res.json();
    const products: Product[] = [];
    for (const productId in resData) {
      products.push({
        id: productId,
        ...resData[productId],
      });
    }
    return products;
  } catch (err) {
    return thunkAPI.rejectWithValue({
      statusCode: 400,
      message: "Cannot reach the server, try again later",
    });
  }
});

export const postAddProduct = createAsyncThunk<
  Product,
  AddProductPayload,
  AppThunkAPIConfig
>("products/postAddProduct", async (payload, thunkAPI) => {
  try {
    const res = await fetch(`${process.env.DB_URL}/products.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: "Failed to add product",
      });
    }

    const resData: FirePOSTResBody = await res.json();
    return {
      id: resData.name,
      ...payload,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue({
      statusCode: 400,
      message: "Cannot reach the server, try again later",
    });
  }
});
