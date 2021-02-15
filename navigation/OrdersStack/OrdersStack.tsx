import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultStackScreenOptions } from "../contants";
import { OrdersStackParamList } from "./types";
import OrdersScreen from "../../screens/shop/OrdersScreen";

const Stack = createStackNavigator<OrdersStackParamList>();

const OrderStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="OrderScreen" component={OrdersScreen} />
  </Stack.Navigator>
);

export default OrderStack;
