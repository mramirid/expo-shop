import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultStackScreenOptions } from "../contants";
import { AuthStackParamList } from "./types";
import AuthScreen from "../../screens/user/AuthScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
  </Stack.Navigator>
);

export default AuthStack;
