import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import Product from "../../types/product";

export type ShopStackParamList = {
  ProductsOverviewScreen: undefined;
  ProductDetailScreen: { product: Product };
  CartScreen: undefined;
};

export type ProductsOverviewScreenNavProp = StackNavigationProp<
  ShopStackParamList,
  "ProductsOverviewScreen"
>;

export type ProductDetailScreenRouteProp = RouteProp<
  ShopStackParamList,
  "ProductDetailScreen"
>;
export type ProductDetailScreenNavProp = StackNavigationProp<
  ShopStackParamList,
  "ProductDetailScreen"
>;

export type CartScreenNavProp = StackNavigationProp<
  ShopStackParamList,
  "CartScreen"
>;
