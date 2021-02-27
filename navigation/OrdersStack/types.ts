import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ShopDrawerParamList } from '../ShopDrawer/types';

export type OrdersStackParamList = {
  OrderScreen: undefined;
};

export type OrderScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<OrdersStackParamList, 'OrderScreen'>,
  DrawerNavigationProp<ShopDrawerParamList>
>;
