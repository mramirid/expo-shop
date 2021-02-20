import { createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../types";
import { signIn, signUp } from "../thunks/auth";
import { UserAuth } from "../../types/auth";

const initialState: UserAuth = {
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

export const selectUserAuth = (state: RootState) => state.auth;
export const selectIsAuth = createSelector(
  [
    (state: RootState) => state.auth.token,
    (state: RootState) => state.auth.userId,
  ],
  (token, userId) => !!token && !!userId,
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
