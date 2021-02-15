import { combineReducers } from "@reduxjs/toolkit";

import productsReducer from "./products";
import cartReducer from "./cart";
import ordersReducer from "./orders";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
