import { createAsyncThunk } from '@reduxjs/toolkit';

import { FireDBErrorResBody, FirePOSTResBody } from '../../types/firebase';
import Product, { ProductData } from '../../types/product';
import { AppThunkAPIConfig } from '../types';

interface FireGETProducts {
  [productId: string]: ProductData;
}

interface FetchProductsResult {
  userId: string;
  products: Product[];
}

export const fetchProducts = createAsyncThunk<FetchProductsResult, void, AppThunkAPIConfig>(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const { userId, token } = thunkAPI.getState().auth;
      const res = await fetch(`${process.env.DB_URL}/products.json?auth=${token}`, {
        signal: thunkAPI.signal,
      });

      if (!res.ok) {
        const resData: FireDBErrorResBody = await res.json();
        return thunkAPI.rejectWithValue({
          statusCode: res.status,
          message: resData.error || 'Failed to fetch products',
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
        userId: userId!,
        products,
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

interface AddProductPayload {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  ownerPushToken: string;
}

export const addProduct = createAsyncThunk<Product, AddProductPayload, AppThunkAPIConfig>(
  'products/addProduct',
  async (payload, thunkAPI) => {
    try {
      const { userId, token } = thunkAPI.getState().auth;
      const res = await fetch(`${process.env.DB_URL}/products.json?auth=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          ownerId: userId!,
        }),
      });

      if (!res.ok) {
        const resData: FireDBErrorResBody = await res.json();
        return thunkAPI.rejectWithValue({
          statusCode: res.status,
          message: resData.error || 'Failed to add product',
        });
      }

      const resData: FirePOSTResBody = await res.json();
      return {
        id: resData.name,
        ownerId: userId!,
        ...payload,
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

interface UpdateProductPayload {
  productId: string;
  title: string;
  imageUrl: string;
  description: string;
}

export const updateProduct = createAsyncThunk<
  UpdateProductPayload,
  UpdateProductPayload,
  AppThunkAPIConfig
>(
  'products/updateProduct',
  async (payload, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;
      const res = await fetch(
        `${process.env.DB_URL}/products/${payload.productId}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: payload.title,
            imageUrl: payload.imageUrl,
            description: payload.description,
          }),
        }
      );
      if (!res.ok) {
        const resData: FireDBErrorResBody = await res.json();
        return thunkAPI.rejectWithValue({
          statusCode: res.status,
          message: resData.error || 'Failed to update product',
        });
      }
      return payload;
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

interface DeleteProductPayload {
  productId: string;
}

export const deleteProduct = createAsyncThunk<
  DeleteProductPayload,
  DeleteProductPayload,
  AppThunkAPIConfig
>(
  'products/deleteProduct',
  async (payload, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;
      const res = await fetch(
        `${process.env.DB_URL}/products/${payload.productId}.json?auth=${token}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) {
        const resData: FireDBErrorResBody = await res.json();
        return thunkAPI.rejectWithValue({
          statusCode: res.status,
          message: resData.error || 'Failed to delete product',
        });
      }
      return payload;
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
