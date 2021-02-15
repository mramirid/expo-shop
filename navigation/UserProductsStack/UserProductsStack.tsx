import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultStackScreenOptions } from "../contants";
import { UserProductsStackParamList } from "./types";
import UserProductsScreen from "../../screens/user/UserProductsScreen";
import EditProductScreen from "../../screens/user/EditProductScreen";

const Stack = createStackNavigator<UserProductsStackParamList>();

const UserProductsStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="UserProductsScreen" component={UserProductsScreen} />
    <Stack.Screen name="EditProductScreen" component={EditProductScreen} />
  </Stack.Navigator>
);

export default UserProductsStack;
