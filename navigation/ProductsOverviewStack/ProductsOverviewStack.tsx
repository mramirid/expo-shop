import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ProductsOverviewStackParamList } from "./types";
import { defaultStackScreenOptions } from "../contants";
import ProductsOverviewScreen from "../../screens/shop/ProductsOverviewScreen";

const Stack = createStackNavigator<ProductsOverviewStackParamList>();

const MealsStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen
      name="ProductsOverviewScreen"
      component={ProductsOverviewScreen}
    />
  </Stack.Navigator>
);

export default MealsStack;
