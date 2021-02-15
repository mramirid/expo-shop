import React, { FC, useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { selectProducts } from "../../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../../store/types";
import { ProductsOverviewScreenNavProp } from "../../navigation/ShopStack/types";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/reducers/cart";
import AppHeaderButton from "../../components/ui/AppHeaderButton";

const ProductsOverviewScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProductsOverviewScreenNavProp>();
  const publicProducts = useAppSelector(selectProducts);

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
      data={publicProducts}
      renderItem={(data) => (
        <ProductItem
          style={styles.productItems}
          product={data.item}
          onViewDetail={() => {
            navigation.navigate("ProductDetailScreen", { product: data.item });
          }}
          onAddToCart={() => dispatch(addToCart(data.item))}
        />
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
});

export default ProductsOverviewScreen;
