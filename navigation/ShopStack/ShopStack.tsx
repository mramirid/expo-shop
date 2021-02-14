import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ShopStackParamList } from "./types";
import { defaultStackScreenOptions } from "../contants";
import ProductsOverviewScreen from "../../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../../screens/shop/ProductDetailScreen";
import CartScreen from "../../screens/shop/CartScreen";

const Stack = createStackNavigator<ShopStackParamList>();

const ShopStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen
      name="ProductsOverviewScreen"
      component={ProductsOverviewScreen}
    />
    <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    <Stack.Screen name="CartScreen" component={CartScreen} />
  </Stack.Navigator>
);

export default ShopStack;
