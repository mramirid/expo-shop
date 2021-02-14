import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import ProductsStack from "./ProductsStack/ProductsStack";

const AppNavigator: FC = () => (
  <NavigationContainer>
    <ProductsStack />
  </NavigationContainer>
);

export default AppNavigator;
