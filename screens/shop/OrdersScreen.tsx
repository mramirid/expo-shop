import React, { FC, useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useAppSelector } from "../../store/types";
import { selectOrders } from "../../store/reducers/orders";
import { OrderScreenNavProp } from "../../navigation/OrdersStack/types";
import AppHeaderButton from "../../components/ui/AppHeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import BodyText from "../../components/ui/text/BodyText";

const OrdersScreen: FC = () => {
  const navigation = useNavigation<OrderScreenNavProp>();
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

  let orderItemsList: JSX.Element;
  if (orders.length > 0) {
    orderItemsList = (
      <FlatList
        contentContainerStyle={styles.screenBody}
        data={orders}
        renderItem={({ item }) => (
          <OrderItem style={styles.orderItems} order={item} />
        )}
      />
    );
  } else {
    orderItemsList = (
      <View style={{ ...styles.screenBody, ...styles.emptyList }}>
        <BodyText>No items available</BodyText>
      </View>
    );
  }

  return orderItemsList;
};

const styles = StyleSheet.create({
  screenBody: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  orderItems: {
    marginBottom: 20,
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
