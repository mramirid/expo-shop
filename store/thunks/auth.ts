import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunkAPIConfig } from "../types";

interface InputAuthPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

/*
 * Firebase Auth REST API
 */
interface FireAuthErrorResBody {
  error: {
    code: number;
    message: string;
  };
}

interface FireAuthResBody {
  idToken: string;
  expiresIn: string;
  localId: string;
}

interface FireSigninResBody extends FireAuthResBody {
  displayName: string;
  email: string;
  refreshToken: string;
  kind: string;
  registered: boolean;
}

interface FireSignupResBody extends FireAuthResBody {
  email: string;
  refreshToken: string;
  kind: string;
}

export const signUp = createAsyncThunk<
  FireAuthResBody,
  InputAuthPayload,
  AppThunkAPIConfig
>("auth/signUp", async (payload, thunkAPI) => {
  try {
    const res = await fetch(process.env.SIGN_UP_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const resData: FireAuthErrorResBody = await res.json();
      let errorMessage: string;
      switch (resData.error.message) {
        case "EMAIL_EXISTS":
          errorMessage = "The email is already in use by another account";
          break;
        default:
          errorMessage = "Failed to sign up";
      }
      return thunkAPI.rejectWithValue({
        statusCode: resData.error.code,
        message: errorMessage,
      });
    }

    const resData: FireSignupResBody = await res.json();
    return resData;
  } catch (_) {
    return thunkAPI.rejectWithValue({
      statusCode: 200,
      message: "Cannot reach the server, try again later",
    });
  }
});

export const signIn = createAsyncThunk<
  FireAuthResBody,
  InputAuthPayload,
  AppThunkAPIConfig
>("auth/signIn", async (payload, thunkAPI) => {
  try {
    const res = await fetch(process.env.SIGN_IN_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const resData: FireAuthErrorResBody = await res.json();
      let errorMessage: string;
      switch (resData.error.message) {
        case "EMAIL_NOT_FOUND":
          errorMessage = "There is no user registered with that email address";
          break;
        case "INVALID_PASSWORD":
          errorMessage = "The password is invalid";
          break;
        case "USER_DISABLED":
          errorMessage =
            "The user account has been disabled by an administrator";
          break;
        default:
          errorMessage = "Failed to sign in";
      }
      return thunkAPI.rejectWithValue({
        statusCode: resData.error.code,
        message: errorMessage,
      });
    }

    const resData: FireSigninResBody = await res.json();
    return resData;
  } catch (_) {
    return thunkAPI.rejectWithValue({
      statusCode: 200,
      message: "Cannot reach the server, try again later",
    });
  }
});
