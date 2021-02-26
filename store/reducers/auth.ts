import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../types";
import { signIn, signUp } from "../thunks/auth";
import { UserAuth } from "../../types/auth";

const initialState: UserAuth = {
  userId: null,
  token: null,
  expirationDate: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userId = null;
      state.expirationDate = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.userId = payload.localId;
      state.token = payload.idToken;
      const expireDuration = +payload.expiresIn * 1000;
      state.expirationDate = new Date().getTime() + expireDuration;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      // const expireDuration = +payload.expiresIn * 1000;
      const expireDuration = 10000;
      state.userId = payload.localId;
      state.token = payload.idToken;
      state.expirationDate = new Date().getTime() + expireDuration;
    });
  },
});

export const selectUserAuth = (state: RootState) => state.auth;
export const selectIsAuth = (state: RootState) => {
  return (
    !!state.auth.token && !!state.auth.userId && !!state.auth.expirationDate
  );
};

export const { logout } = authSlice.actions;

export default authSlice.reducer;
