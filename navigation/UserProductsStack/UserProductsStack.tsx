import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultStackScreenOptions } from "../contants";
import { UserProductsStackParamList } from "./types";
import UserProductsScreen from "../../screens/user/UserProductsScreen";

const Stack = createStackNavigator<UserProductsStackParamList>();

const UserProductsStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="UserProductsScreen" component={UserProductsScreen} />
  </Stack.Navigator>
);

export default UserProductsStack;
