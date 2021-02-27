import React, { FC, createContext, useCallback, useRef } from 'react';

import { logout, selectIsAuth, selectUserAuth } from '../store/reducers/auth';
import { clearCartState } from '../store/reducers/cart';
import { clearOrdersState } from '../store/reducers/orders';
import { clearProductsState } from '../store/reducers/products';
import { useAppDispatch, useAppSelector } from '../store/types';

interface ContextType {
  trySetSessionTimer: () => void;
  logoutUser: () => void;
}

export const SessionTimerContext = createContext<ContextType>(undefined!);

export const SessionTimerContextProvider: FC = (props) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const userAuth = useAppSelector(selectUserAuth);
  const autoLogoutTimerId = useRef<number>();

  const logoutUser = useCallback(() => {
    dispatch(clearCartState());
    dispatch(clearOrdersState());
    dispatch(clearProductsState());
    dispatch(logout());
    window.clearTimeout(autoLogoutTimerId.current);
    autoLogoutTimerId.current = undefined;
  }, [dispatch]);

  const trySetSessionTimer = useCallback(() => {
    if (!autoLogoutTimerId.current && isAuth) {
      const expireDuration = userAuth.expirationDate! - new Date().getTime();
      if (expireDuration > 0) {
        const newTimerId = window.setTimeout(logoutUser, expireDuration);
        autoLogoutTimerId.current = newTimerId;
      } else {
        logoutUser();
      }
    }
  }, [isAuth, logoutUser, userAuth.expirationDate]);

  return (
    <SessionTimerContext.Provider value={{ trySetSessionTimer, logoutUser }}>
      {props.children}
    </SessionTimerContext.Provider>
  );
};
