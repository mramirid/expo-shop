import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ProductsStackParamList } from "./types";
import { defaultStackScreenOptions } from "../contants";
import ProductsOverviewScreen from "../../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../../screens/shop/ProductDetailScreen";

const Stack = createStackNavigator<ProductsStackParamList>();

const ProductsStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen
      name="ProductsOverviewScreen"
      component={ProductsOverviewScreen}
    />
    <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
  </Stack.Navigator>
);

export default ProductsStack;
