import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth";
import productsReducer from "./products";
import cartReducer from "./cart";
import ordersReducer from "./orders";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
