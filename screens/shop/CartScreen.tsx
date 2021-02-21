import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { unwrapResult } from "@reduxjs/toolkit";

import AppCard from "../../components/ui/AppCard";
import BodyText from "../../components/ui/text/BodyText";
import HeadingText from "../../components/ui/text/HeadingText";
import Colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";
import { CartScreenNavProp } from "../../navigation/ShopStack/types";
import {
  removeItem,
  selectCartItems,
  selectCartTotalAmount,
} from "../../store/reducers/cart";
import { useAppDispatch, useAppSelector } from "../../store/types";
import { addOrder } from "../../store/thunks/orders";
import { selectUserAuth } from "../../store/reducers/auth";
import useIsMounted from "../../hooks/useIsMounted";

const CartScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CartScreenNavProp>();
  const { runInMounted } = useIsMounted();

  const userAuth = useAppSelector(selectUserAuth);
  const cartItems = useAppSelector(selectCartItems);
  const cartTotalAmount = useAppSelector(selectCartTotalAmount);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Your Cart" });
  }, [navigation]);

  const onOrder = useCallback(async () => {
    try {
      setIsLoading(true);
      unwrapResult(
        await dispatch(
          addOrder({
            userAuth,
            data: {
              items: cartItems,
              totalAmount: cartTotalAmount,
            },
          }),
        ),
      );
    } catch (error) {
      runInMounted(() => {
        Alert.alert("An error occurred", error.message, [{ text: "OK" }]);
      });
    } finally {
      runInMounted(() => setIsLoading(false));
    }
  }, [cartItems, cartTotalAmount, dispatch, runInMounted, userAuth]);

  return (
    <View style={styles.screen2}>
      <AppCard style={styles.summary}>
        <HeadingText>
          Total:{" "}
          <BodyText style={styles.summaryAmount}>
            ${Math.abs(cartTotalAmount).toFixed(2)}
          </BodyText>
        </HeadingText>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.Primary} />
        ) : (
          <Button
            disabled={cartItems.length === 0}
            title="ORDER NOW"
            color={Colors.Accent}
            onPress={onOrder}
          />
        )}
      </AppCard>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => (
            <CartItem
              cartItem={item}
              onRemove={() => dispatch(removeItem(item.productId))}
            />
          )}
        />
      ) : (
        <View style={styles.emptyList}>
          <BodyText>No items available</BodyText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen2: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryAmount: {
    color: Colors.Primary,
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
