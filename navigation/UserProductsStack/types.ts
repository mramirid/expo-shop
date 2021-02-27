import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Product from '../../types/product';
import { ShopDrawerParamList } from '../ShopDrawer/types';

export type UserProductsStackParamList = {
  UserProductsScreen: undefined;
  EditProductScreen: { product: Product } | undefined;
};

export type UserProductsScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<UserProductsStackParamList, 'UserProductsScreen'>,
  DrawerNavigationProp<ShopDrawerParamList>
>;

export type EditProductScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<UserProductsStackParamList, 'EditProductScreen'>,
  DrawerNavigationProp<ShopDrawerParamList>
>;
export type EditProductScreenRouteProp = RouteProp<UserProductsStackParamList, 'EditProductScreen'>;
