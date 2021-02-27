import { NavigationContainer } from '@react-navigation/native';
import React, { FC, useContext, useEffect } from 'react';

import { SessionTimerContext } from '../contexts/session-timer';
import { selectIsAuth } from '../store/reducers/auth';
import { useAppSelector } from '../store/types';
import AuthStack from './AuthStack/AuthStack';
import ShopDrawer from './ShopDrawer/ShopDrawer';

const AppNavigator: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const { trySetSessionTimer } = useContext(SessionTimerContext);

  useEffect(trySetSessionTimer, [trySetSessionTimer]);

  return <NavigationContainer>{isAuth ? <ShopDrawer /> : <AuthStack />}</NavigationContainer>;
};

export default AppNavigator;
