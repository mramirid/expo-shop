import { createAsyncThunk } from "@reduxjs/toolkit";

import { FireDBErrorResBody, FirePOSTResBody } from "../../types/firebase";
import { UserAuth } from "../../types/auth";
import Product from "../../types/product";
import { AppThunkAPIConfig } from "../types";

interface FireGETProducts {
  [productId: string]: {
    ownerId: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
  };
}

interface FetchProductsResult {
  userId: string;
  products: Product[];
}

export const fetchProducts = createAsyncThunk<
  FetchProductsResult,
  UserAuth,
  AppThunkAPIConfig
>("products/fetchProducts", async (payload, thunkAPI) => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}/products.json?auth=${payload.token}`,
      {
        signal: thunkAPI.signal,
      },
    );

    if (!res.ok) {
      const resData: FireDBErrorResBody = await res.json();
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: resData.error || "Failed to fetch products",
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
    return {
      userId: payload.userId!,
      products,
    };
  } catch (_) {
    return thunkAPI.rejectWithValue({
      statusCode: 200,
      message: "Cannot reach the server, try again later",
    });
  }
});

interface AddProductPayload {
  userAuth: UserAuth;
  data: {
    title: string;
    imageUrl: string;
    description: string;
    price: number;
  };
}

export const addProduct = createAsyncThunk<
  Product,
  AddProductPayload,
  AppThunkAPIConfig
>("products/addProduct", async (payload, thunkAPI) => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}/products.json?auth=${payload.userAuth.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload.data,
          ownerId: payload.userAuth.userId,
        }),
      },
    );

    if (!res.ok) {
      const resData: FireDBErrorResBody = await res.json();
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: resData.error || "Failed to add product",
      });
    }

    const resData: FirePOSTResBody = await res.json();
    return {
      id: resData.name,
      ownerId: payload.userAuth.userId!,
      ...payload.data,
    };
  } catch (_) {
    return thunkAPI.rejectWithValue({
      statusCode: 200,
      message: "Cannot reach the server, try again later",
    });
  }
});

interface UpdateProductPayload {
  userAuth: UserAuth;
  productId: string;
  data: {
    title: string;
    imageUrl: string;
    description: string;
  };
}

export const updateProduct = createAsyncThunk<
  UpdateProductPayload,
  UpdateProductPayload,
  AppThunkAPIConfig
>("products/updateProduct", async (payload, thunkAPI) => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}/products/${payload.productId}.json?auth=${payload.userAuth.token}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.data),
      },
    );
    if (!res.ok) {
      const resData: FireDBErrorResBody = await res.json();
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: resData.error || "Failed to update product",
      });
    }
    return payload;
  } catch (_) {
    return thunkAPI.rejectWithValue({
      statusCode: 200,
      message: "Cannot reach the server, try again later",
    });
  }
});

interface DeleteProductPayload {
  productId: string;
  userAuth: UserAuth;
}

export const deleteProduct = createAsyncThunk<
  DeleteProductPayload,
  DeleteProductPayload,
  AppThunkAPIConfig
>("products/deleteProduct", async (payload, thunkAPI) => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}/products/${payload.productId}.json?auth=${payload.userAuth.token}`,
      {
        method: "DELETE",
      },
    );
    if (!res.ok) {
      const resData: FireDBErrorResBody = await res.json();
      return thunkAPI.rejectWithValue({
        statusCode: res.status,
        message: resData.error || "Failed to delete product",
      });
    }
    return payload;
  } catch (_) {
    return thunkAPI.rejectWithValue({
      statusCode: 200,
      message: "Cannot reach the server, try again later",
    });
  }
});
