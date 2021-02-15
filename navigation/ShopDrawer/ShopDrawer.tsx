import React, { FC } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { ShopDrawerParamList } from "./types";
import Colors from "../../constants/colors";
import Fonts from "../../constants/fonts";
import ShopStack from "../ShopStack/ShopStack";
import OrderStack from "../OrdersStack/OrdersStack";

const DrawerContent: FC<DrawerContentComponentProps<DrawerContentOptions>> = (
  props,
) => (
  <>
    <View style={drawerContentStyles.header}>
      <Text style={drawerContentStyles.title}>Expo Shop</Text>
    </View>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  </>
);

const drawerContentStyles = StyleSheet.create({
  header: {
    backgroundColor: Colors.Primary,
    height: 140,
    padding: 25,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 24,
    color: "white",
  },
});

const Drawer = createDrawerNavigator<ShopDrawerParamList>();

const ShopDrawer: FC = () => (
  <Drawer.Navigator
    drawerContent={DrawerContent}
    drawerContentOptions={{
      activeTintColor: Colors.Accent,
      labelStyle: { fontFamily: Fonts.OpenSansBold },
    }}>
    <Drawer.Screen
      name="ShopStack"
      component={ShopStack}
      options={{
        drawerLabel: "Shop",
        drawerIcon: (drawerOptions) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            size={22}
            color={drawerOptions.color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="OrdersStack"
      component={OrderStack}
      options={{
        drawerLabel: "Your Orders",
        drawerIcon: (drawerOptions) => (
          <Ionicons name="list" size={22} color={drawerOptions.color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default ShopDrawer;
