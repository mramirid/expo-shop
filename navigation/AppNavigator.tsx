import React, { FC, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import ShopDrawer from "./ShopDrawer/ShopDrawer";
import AuthStack from "./AuthStack/AuthStack";
import { selectIsAuth } from "../store/reducers/auth";
import { useAppSelector } from "../store/types";
import { SessionTimerContext } from "../contexts/session-timer";

const AppNavigator: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const { trySetSessionTimer } = useContext(SessionTimerContext);

  useEffect(trySetSessionTimer, [trySetSessionTimer]);

  return (
    <NavigationContainer>
      {isAuth ? <ShopDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
