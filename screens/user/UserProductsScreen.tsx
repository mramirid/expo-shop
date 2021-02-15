import { useNavigation } from "@react-navigation/native";
import React, { FC, useLayoutEffect } from "react";
import { batch } from "react-redux";
import { View, Button, FlatList, StyleSheet, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { UserProductsScreenNavProp } from "../../navigation/UserProductsStack/types";
import {
  deleteUserProducts,
  selectUserProducts,
} from "../../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../../store/types";
import ProductItem from "../../components/shop/ProductItem";
import AppHeaderButton from "../../components/ui/AppHeaderButton";
import Colors from "../../constants/colors";
import { deleteProduct } from "../../store/reducers/cart";

const UserProductsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UserProductsScreenNavProp>();

  const userProducts = useAppSelector(selectUserProducts);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your Products",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={navigation.toggleDrawer}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            title="Create Product"
            iconName="create"
            onPress={() => navigation.navigate("EditProductScreen")}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const startDeleteProduct = (productId: string) => {
    batch(() => {
      dispatch(deleteUserProducts(productId));
      dispatch(deleteProduct(productId));
    });
  };

  const showDeleteConfirmation = (productId: string) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "NO", style: "cancel" },
      {
        text: "YES",
        style: "destructive",
        onPress: () => startDeleteProduct(productId),
      },
    ]);
  };

  return (
    <FlatList
      contentContainerStyle={styles.screenBody}
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          style={styles.productItems}
          product={item}
          onCardTap={() => {
            navigation.navigate("EditProductScreen", { product: item });
          }}>
          <View style={styles.actionButtons}>
            <Button
              color={Colors.Accent}
              title="EDIT"
              onPress={() => {
                navigation.navigate("EditProductScreen", { product: item });
              }}
            />
          </View>
          <View style={styles.actionButtons}>
            <Button
              color={Colors.Accent}
              title="DELETE"
              onPress={() => showDeleteConfirmation(item.id)}
            />
          </View>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  screenBody: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  productItems: {
    marginBottom: 20,
  },
  actionButtons: {
    width: "30%",
  },
});

export default UserProductsScreen;
