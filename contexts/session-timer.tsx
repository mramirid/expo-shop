import React, { FC, createContext, useState, useEffect } from "react";

import { logout, selectIsAuth, selectUserAuth } from "../store/reducers/auth";
import { clearCartState } from "../store/reducers/cart";
import { clearOrdersState } from "../store/reducers/orders";
import { clearProductsState } from "../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../store/types";

interface ContextType {
  trySetSessionTimer: () => void;
}

export const SessionTimerContext = createContext<ContextType>(undefined!);

export const SessionTimerContextProvider: FC = (props) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const userAuth = useAppSelector(selectUserAuth);

  const [autoLogoutTimerId, setAutoLogoutTimerid] = useState<number>();

  useEffect(() => () => clearTimeout(autoLogoutTimerId), [autoLogoutTimerId]);

  const logoutUser = () => {
    dispatch(clearCartState());
    dispatch(clearOrdersState());
    dispatch(clearProductsState());
    dispatch(logout());
    clearTimeout(autoLogoutTimerId);
  };

  const trySetSessionTimer = () => {
    if (!autoLogoutTimerId && isAuth) {
      const expireDuration = userAuth.expirationDate! - new Date().getTime();
      if (expireDuration > 0) {
        const newTimerId = window.setTimeout(logoutUser, expireDuration);
        setAutoLogoutTimerid(newTimerId);
      } else {
        logoutUser();
      }
    }
  };

  return (
    <SessionTimerContext.Provider value={{ trySetSessionTimer }}>
      {props.children}
    </SessionTimerContext.Provider>
  );
};
