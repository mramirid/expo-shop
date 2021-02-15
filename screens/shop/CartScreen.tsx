import { useNavigation } from "@react-navigation/native";
import React, { FC, useLayoutEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";

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
import { addOrder } from "../../store/reducers/orders";

const CartScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CartScreenNavProp>();

  const cartItems = useAppSelector(selectCartItems);
  const cartTotalAmount = useAppSelector(selectCartTotalAmount);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Your Cart" });
  }, [navigation]);

  let cartItemsList: JSX.Element;
  if (cartItems.length > 0) {
    cartItemsList = (
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
    );
  } else {
    cartItemsList = (
      <View style={styles.emptyList}>
        <BodyText>No items available</BodyText>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppCard style={styles.summary}>
        <HeadingText>
          Total:{" "}
          <BodyText style={styles.summaryAmount}>
            ${Math.abs(cartTotalAmount).toFixed(2)}
          </BodyText>
        </HeadingText>
        <Button
          disabled={cartItems.length === 0}
          title="ORDER NOW"
          color={Colors.Accent}
          onPress={() => {
            dispatch(
              addOrder({ items: cartItems, totalAmount: cartTotalAmount }),
            );
          }}
        />
      </AppCard>
      {cartItemsList}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
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
