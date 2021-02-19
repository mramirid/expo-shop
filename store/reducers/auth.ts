import { createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../types";
import { signIn, signUp } from "../thunks/auth";

export interface AuthState {
  userId: string | null;
  token: string | null;
}

export const initialState: AuthState = {
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userId = action.payload.localId;
      state.token = action.payload.idToken;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userId = action.payload.localId;
      state.token = action.payload.idToken;
    });
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsAuth = createSelector(
  [selectToken, selectUserId],
  (token, userId) => !!token && !!userId,
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
