import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import ShopStack from "./ShopStack/ShopStack";

const AppNavigator: FC = () => (
  <NavigationContainer>
    <ShopStack />
  </NavigationContainer>
);

export default AppNavigator;
