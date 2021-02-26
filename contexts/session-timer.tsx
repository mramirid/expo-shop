import React, {
  FC,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { logout, selectIsAuth, selectUserAuth } from "../store/reducers/auth";
import { clearCartState } from "../store/reducers/cart";
import { clearOrdersState } from "../store/reducers/orders";
import { clearProductsState } from "../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../store/types";

interface ContextType {
  trySetSessionTimer: () => void;
  logoutUser: () => void;
}

export const SessionTimerContext = createContext<ContextType>(undefined!);

export const SessionTimerContextProvider: FC = (props) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const userAuth = useAppSelector(selectUserAuth);
  const [autoLogoutTimerId, setAutoLogoutTimerid] = useState<number>();

  useEffect(
    () => () => {
      clearTimeout(autoLogoutTimerId);
      setAutoLogoutTimerid(undefined);
    },
    [autoLogoutTimerId],
  );

  const logoutUser = useCallback(() => {
    dispatch(clearCartState());
    dispatch(clearOrdersState());
    dispatch(clearProductsState());
    dispatch(logout());
    clearTimeout(autoLogoutTimerId);
    setAutoLogoutTimerid(undefined);
  }, [autoLogoutTimerId, dispatch]);

  const trySetSessionTimer = useCallback(() => {
    if (!autoLogoutTimerId && isAuth) {
      const expireDuration = userAuth.expirationDate! - new Date().getTime();
      if (expireDuration > 0) {
        const newTimerId = window.setTimeout(logoutUser, expireDuration);
        setAutoLogoutTimerid(newTimerId);
      } else {
        logoutUser();
      }
    }
  }, [autoLogoutTimerId, isAuth, logoutUser, userAuth.expirationDate]);

  return (
    <SessionTimerContext.Provider value={{ trySetSessionTimer, logoutUser }}>
      {props.children}
    </SessionTimerContext.Provider>
  );
};
