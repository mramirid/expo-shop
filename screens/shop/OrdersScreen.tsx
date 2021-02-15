import React, { FC, useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useAppSelector } from "../../store/types";
import { selectOrders } from "../../store/reducers/orders";
import { OrdersStackNavProp } from "../../navigation/OrdersStack/types";
import AppHeaderButton from "../../components/ui/AppHeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen: FC = () => {
  const navigation = useNavigation<OrdersStackNavProp>();

  const orders = useAppSelector(selectOrders);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your Orders",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={navigation.toggleDrawer}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      contentContainerStyle={styles.screen}
      data={orders}
      renderItem={({ item }) => (
        <OrderItem style={styles.orderItems} order={item} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  orderItems: {
    marginBottom: 20,
  },
});

export default OrdersScreen;
