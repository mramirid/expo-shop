import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';

import CartScreen from '../../screens/shop/CartScreen';
import ProductDetailScreen from '../../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '../../screens/shop/ProductsOverviewScreen';
import { defaultStackScreenOptions } from '../contants';
import { ShopStackParamList } from './types';

const Stack = createStackNavigator<ShopStackParamList>();

const ShopStack: FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="ProductsOverviewScreen" component={ProductsOverviewScreen} />
    <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    <Stack.Screen name="CartScreen" component={CartScreen} />
  </Stack.Navigator>
);

export default ShopStack;
