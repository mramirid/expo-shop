import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import authReducer from "./auth";
import productsReducer from "./products";
import cartReducer from "./cart";
import ordersReducer from "./orders";

const secureStorage = createSecureStore();

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      version: 2,
      storage: secureStorage,
    },
    authReducer,
  ),
  cart: persistReducer(
    {
      key: "cart",
      version: 2,
      storage: ExpoFileSystemStorage,
    },
    cartReducer,
  ),
  products: productsReducer,
  orders: ordersReducer,
});

export default rootReducer;
