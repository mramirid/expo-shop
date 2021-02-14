import React, { FC, useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { selectProducts } from "../../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../../store/types";
import { ProductsOverviewScreenNavProp } from "../../navigation/ProductsStack/types";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/reducers/cart";

const ProductsOverviewScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProductsOverviewScreenNavProp>();
  const publicProducts = useAppSelector(selectProducts);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "All Products",
    });
  }, [navigation]);

  return (
    <FlatList
      contentContainerStyle={styles.screenBody}
      data={publicProducts}
      renderItem={(data) => (
        <ProductItem
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
});

export default ProductsOverviewScreen;
