import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import ShopDrawer from "./ShopDrawer/ShopDrawer";

const AppNavigator: FC = () => (
  <NavigationContainer>
    <ShopDrawer />
  </NavigationContainer>
);

export default AppNavigator;
