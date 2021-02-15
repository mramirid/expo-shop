import React, { FC, useLayoutEffect } from "react";
import { View, Button, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { selectProducts } from "../../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../../store/types";
import { ProductsOverviewScreenNavProp } from "../../navigation/ShopStack/types";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/reducers/cart";
import AppHeaderButton from "../../components/ui/AppHeaderButton";
import Colors from "../../constants/colors";

const ProductsOverviewScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProductsOverviewScreenNavProp>();
  const products = useAppSelector(selectProducts);

  useLayoutEffect(() => {
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
  }, [navigation]);

  return (
    <FlatList
      contentContainerStyle={styles.screenBody}
      data={products}
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
  screenBody: {
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
