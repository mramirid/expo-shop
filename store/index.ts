import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

import rootReducer from "./reducers/rootReducer";

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      version: 1,
      storage: AsyncStorage,
      whitelist: ["auth", "cart"],
    },
    rootReducer,
  ),
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
