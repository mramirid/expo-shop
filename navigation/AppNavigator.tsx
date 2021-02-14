import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import ProductsOverviewStack from "./ProductsOverviewStack/ProductsOverviewStack";

const AppNavigator: FC = () => (
  <NavigationContainer>
    <ProductsOverviewStack />
  </NavigationContainer>
);

export default AppNavigator;
