import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { unwrapResult } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../store/types";
import { selectOrders } from "../../store/reducers/orders";
import { OrderScreenNavProp } from "../../navigation/OrdersStack/types";
import AppHeaderButton from "../../components/ui/AppHeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import BodyText from "../../components/ui/text/BodyText";
import { fetchOrders } from "../../store/thunks/orders";
import { HttpError } from "../../types/errors";
import useIsMounted from "../../hooks/useIsMounted";

const OrdersScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<OrderScreenNavProp>();
  const { runInMounted } = useIsMounted();

  const orders = useAppSelector(selectOrders);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<HttpError | null>(null);

  const onFetchOrders = useCallback(() => {
    setIsLoading(true);
    dispatch(fetchOrders())
      .then(unwrapResult)
      .then(() => runInMounted(() => setError(null)))
      .catch((error: HttpError) => {
        runInMounted(() => {
          setError(error);
          Alert.alert("An error occurred", error.message, [{ text: "OK" }]);
        });
      })
      .finally(() => runInMounted(() => setIsLoading(false)));
  }, [dispatch, runInMounted]);

  useLayoutEffect(() => {
    onFetchOrders();
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
  }, [navigation, onFetchOrders]);

  if (!isLoading && error) {
    return (
      <ScrollView
        contentContainerStyle={styles.screen1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onFetchOrders} />
        }>
        <BodyText>{error.message}</BodyText>
      </ScrollView>
    );
  } else if (!isLoading && orders.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.screen1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onFetchOrders} />
        }>
        <BodyText>No orders found. Maybe start adding some!</BodyText>
      </ScrollView>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.screen2}
      data={orders}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onFetchOrders} />
      }
      renderItem={({ item }) => (
        <OrderItem style={styles.orderItems} order={item} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen2: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  orderItems: {
    marginBottom: 20,
  },
});

export default OrdersScreen;
