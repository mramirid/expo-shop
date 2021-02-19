import { createAsyncThunk } from "@reduxjs/toolkit";

import { FirePOSTResBody } from "../../types/firebase";
import Product, {
  AddProductPayload,
  FireGETProducts,
  UpdateProductPayload,
} from "../../types/product";
import { AppThunkAPIConfig } from "../types";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  AppThunkAPIConfig
>("products/fetchProducts", async (_, thunkAPI) => {
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

export const addProduct = createAsyncThunk<
  Product,
  AddProductPayload,
  AppThunkAPIConfig
>("products/addProduct", async (payload, thunkAPI) => {
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

export const updateProduct = createAsyncThunk<
  UpdateProductPayload,
  UpdateProductPayload,
  AppThunkAPIConfig
>("products/updateProduct", async (payload, thunkAPI) => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}/products/${payload.id}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: payload.title,
          imageUrl: payload.imageUrl,
          description: payload.description,
        }),
      },
    );
    if (!res.ok) {
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: "Failed to update product",
      });
    }
    return payload;
  } catch (err) {
    return thunkAPI.rejectWithValue({
      statusCode: 400,
      message: "Cannot reach the server, try again later",
    });
  }
});

export const deleteProduct = createAsyncThunk<
  string,
  string,
  AppThunkAPIConfig
>("products/deleteProduct", async (payload, thunkAPI) => {
  try {
    const res = await fetch(`${process.env.DB_URL}/products/${payload}.json`, {
      method: "DELETE",
    });
    if (!res.ok) {
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: "Failed to delete product",
      });
    }
    return payload;
  } catch (err) {
    return thunkAPI.rejectWithValue({
      statusCode: 400,
      message: "Cannot reach the server, try again later",
    });
  }
});
