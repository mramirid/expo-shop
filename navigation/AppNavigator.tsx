import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import ShopDrawer from "./ShopDrawer/ShopDrawer";
import AuthStack from "./AuthStack/AuthStack";
import { selectIsAuth } from "../store/reducers/auth";
import { useAppSelector } from "../store/types";

const AppNavigator: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  return (
    <NavigationContainer>
      {isAuth ? <ShopDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
