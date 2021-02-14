import { combineReducers } from "@reduxjs/toolkit";

import productsReducer from "./products";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
