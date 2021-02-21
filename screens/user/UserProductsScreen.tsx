import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl,
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
import { deleteProduct, fetchProducts } from "../../store/thunks/products";
import { HttpError } from "../../types/errors";
import BodyText from "../../components/ui/text/BodyText";
import { selectUserAuth } from "../../store/reducers/auth";
import useIsMounted from "../../hooks/useIsMounted";

const UserProductsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UserProductsScreenNavProp>();
  const { runInMounted } = useIsMounted();

  const userAuth = useAppSelector(selectUserAuth);
  const userProducts = useAppSelector(selectUserProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<HttpError | null>(null);

  const onfetchProducts = useCallback(() => {
    setIsLoading(true);
    const fetchProductsThunk = dispatch(fetchProducts(userAuth));
    fetchProductsThunk
      .then(unwrapResult)
      .then(() => runInMounted(() => setError(null)))
      .catch((error: HttpError) => {
        runInMounted(() => {
          setError(error);
          Alert.alert("An error occurred", error.message, [{ text: "OK" }]);
        });
      })
      .finally(() => runInMounted(() => setIsLoading(false)));
    return () => fetchProductsThunk.abort();
  }, [dispatch, runInMounted, userAuth]);

  useLayoutEffect(() => {
    onfetchProducts();
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
  }, [navigation, onfetchProducts]);

  const confirmDeleteProduct = (productId: string) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "NO", style: "cancel" },
      {
        text: "YES",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoading(true);
            unwrapResult(
              await dispatch(deleteProduct({ userAuth, productId })),
            );
          } catch (error) {
            runInMounted(() => {
              Alert.alert("An error occurred", error.message, [{ text: "OK" }]);
            });
          } finally {
            runInMounted(() => setIsLoading(false));
          }
        },
      },
    ]);
  };

  if (!isLoading && error) {
    return (
      <ScrollView
        contentContainerStyle={styles.screen1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onfetchProducts} />
        }>
        <BodyText>{error.message}</BodyText>
      </ScrollView>
    );
  } else if (!isLoading && userProducts.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.screen1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onfetchProducts} />
        }>
        <BodyText>No products found. Maybe start adding some!</BodyText>
      </ScrollView>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.screen2}
      refreshing={isLoading}
      onRefresh={onfetchProducts}
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
  screen1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen2: {
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
