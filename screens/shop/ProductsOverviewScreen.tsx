import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { unwrapResult } from "@reduxjs/toolkit";

import { selectProducts } from "../../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../../store/types";
import { ProductsOverviewScreenNavProp } from "../../navigation/ShopStack/types";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/reducers/cart";
import AppHeaderButton from "../../components/ui/AppHeaderButton";
import Colors from "../../constants/colors";
import { fetchProducts } from "../../store/thunks/products";
import { HttpError } from "../../types/errors";
import BodyText from "../../components/ui/text/BodyText";
import { ScrollView } from "react-native-gesture-handler";

const ProductsOverviewScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProductsOverviewScreenNavProp>();

  const products = useAppSelector(selectProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<HttpError | null>(null);

  const onfetchProducts = useCallback(() => {
    setIsLoading(true);
    dispatch(fetchProducts())
      .then(unwrapResult)
      .then(() => setError(null))
      .catch((error: HttpError) => {
        setError(error);
        Alert.alert("An error occurred", error.message, [{ text: "OK" }]);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useLayoutEffect(() => {
    onfetchProducts();
    navigation.setOptions({
      headerTitle: "All Products",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            title="Cart"
            iconName="cart"
            onPress={() => navigation.navigate("CartScreen")}
          />
        </HeaderButtons>
      ),
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
  }, [navigation, onfetchProducts]);

  if (!isLoading && error) {
    return (
      <ScrollView
        contentContainerStyle={styles.screenBody1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onfetchProducts} />
        }>
        <BodyText>{error.message}</BodyText>
      </ScrollView>
    );
  } else if (!isLoading && products.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.screenBody1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onfetchProducts} />
        }>
        <BodyText>No products found. Maybe start adding some!</BodyText>
      </ScrollView>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.screenBody2}
      data={products}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onfetchProducts} />
      }
      renderItem={({ item }) => (
        <ProductItem
          style={styles.productItems}
          product={item}
          onCardTap={() => {
            navigation.navigate("ProductDetailScreen", { product: item });
          }}>
          <View style={styles.actionButtons}>
            <Button
              color={Colors.Accent}
              title="VIEW DETAILS"
              onPress={() => {
                navigation.navigate("ProductDetailScreen", { product: item });
              }}
            />
          </View>
          <View style={styles.actionButtons}>
            <Button
              color={Colors.Accent}
              title="ADD TO CART"
              onPress={() => dispatch(addToCart(item))}
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
    width: "40%",
  },
});

export default ProductsOverviewScreen;
