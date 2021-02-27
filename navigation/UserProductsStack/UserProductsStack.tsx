import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';

import EditProductScreen from '../../screens/user/EditProductScreen';
import UserProductsScreen from '../../screens/user/UserProductsScreen';
import { defaultStackScreenOptions } from '../contants';
import { UserProductsStackParamList } from './types';

const Stack = createStackNavigator<UserProductsStackParamList>();

const UserProductsStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="UserProductsScreen" component={UserProductsScreen} />
    <Stack.Screen name="EditProductScreen" component={EditProductScreen} />
  </Stack.Navigator>
);

export default UserProductsStack;
