import { combineReducers } from "@reduxjs/toolkit";

import productsReducer from "./products";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

export default rootReducer;
