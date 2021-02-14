import { StackNavigationProp } from "@react-navigation/stack";

export type ProductsOverviewStackParamList = {
  ProductsOverviewScreen: undefined;
};

export type ProductsOverviewScreenNavProp = StackNavigationProp<
  ProductsOverviewStackParamList,
  "ProductsOverviewScreen"
>;
