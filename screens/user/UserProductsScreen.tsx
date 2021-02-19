import React, { FC, useLayoutEffect, useState } from "react";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { unwrapResult } from "@reduxjs/toolkit";

import { UserProductsScreenNavProp } from "../../navigation/UserProductsStack/types";
import { selectUserProducts } from "../../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../../store/types";
import ProductItem from "../../components/shop/ProductItem";
import AppHeaderButton from "../../components/ui/AppHeaderButton";
import Colors from "../../constants/colors";
import { deleteProduct } from "../../store/thunks/products";

const UserProductsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UserProductsScreenNavProp>();

  const userProducts = useAppSelector(selectUserProducts);
  const [isLoading, setIsLoading] = useState(false);

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

  const confirmDeleteProduct = (productId: string) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "NO", style: "cancel" },
      {
        text: "YES",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoading(true);
            unwrapResult(await dispatch(deleteProduct(productId)));
          } catch (error) {
            Alert.alert("An error occurred", error.message, [{ text: "OK" }]);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.screenBody1}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.screenBody2}
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
              onPress={() => confirmDeleteProduct(item.id)}
            />
          </View>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  screenBody1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenBody2: {
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
