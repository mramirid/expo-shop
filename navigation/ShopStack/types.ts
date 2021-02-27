import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Product from '../../global-types/product';
import { ShopDrawerParamList } from '../ShopDrawer/types';

export type ShopStackParamList = {
  ProductsOverviewScreen: undefined;
  ProductDetailScreen: { product: Product };
  CartScreen: undefined;
};

export type ProductsOverviewScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<ShopStackParamList, 'ProductsOverviewScreen'>,
  DrawerNavigationProp<ShopDrawerParamList>
>;

export type ProductDetailScreenRouteProp = RouteProp<ShopStackParamList, 'ProductDetailScreen'>;
export type ProductDetailScreenNavProp = StackNavigationProp<
  ShopStackParamList,
  'ProductDetailScreen'
>;

export type CartScreenNavProp = StackNavigationProp<ShopStackParamList, 'CartScreen'>;
