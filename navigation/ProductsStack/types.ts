import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import Product from "../../types/product";

export type ProductsStackParamList = {
  ProductsOverviewScreen: undefined;
  ProductDetailScreen: { product: Product };
};

export type ProductsOverviewScreenNavProp = StackNavigationProp<
  ProductsStackParamList,
  "ProductsOverviewScreen"
>;

export type ProductDetailScreenRouteProp = RouteProp<
  ProductsStackParamList,
  "ProductDetailScreen"
>;
export type ProductDetailScreenNavProp = StackNavigationProp<
  ProductsStackParamList,
  "ProductDetailScreen"
>;
