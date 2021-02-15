import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { ShopDrawerParamList } from "../ShopDrawer/types";

export type UserProductsStackParamList = {
  UserProductsScreen: undefined;
};

export type UserProductsScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<UserProductsStackParamList, "UserProductsScreen">,
  DrawerNavigationProp<ShopDrawerParamList>
>;
