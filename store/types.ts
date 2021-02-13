import { Action, SerializedError, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import store from ".";
import { HttpError } from "../types/errors";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface AppThunkAPIConfig {
  state: RootState;
  dispatch: AppDispatch;
  extra: unknown;
  rejectValue: HttpError;
  serializedErrorType: SerializedError;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
