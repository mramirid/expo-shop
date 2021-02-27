import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import createSecureStore from 'redux-persist-expo-securestore';

import authReducer from './auth';
import cartReducer from './cart';
import ordersReducer from './orders';
import productsReducer from './products';

const secureStorage = createSecureStore();

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: 'auth',
      version: 2,
      storage: secureStorage,
    },
    authReducer
  ),
  cart: persistReducer(
    {
      key: 'cart',
      version: 2,
      storage: ExpoFileSystemStorage,
    },
    cartReducer
  ),
  products: productsReducer,
  orders: ordersReducer,
});

export default rootReducer;
