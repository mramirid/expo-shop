import React, { FC, useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useAppSelector } from "../../store/types";
import { selectOrders } from "../../store/reducers/orders";
import BodyText from "../../components/ui/text/BodyText";
import { OrdersStackNavProp } from "../../navigation/OrdersStack/types";
import AppHeaderButton from "../../components/ui/AppHeaderButton";

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
      data={orders}
      renderItem={({ item }) => <BodyText>{item.totalAmount}</BodyText>}
    />
  );
};

export default OrdersScreen;
