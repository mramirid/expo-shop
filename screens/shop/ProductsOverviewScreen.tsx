import React, { FC, useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { selectPublicProducts } from "../../store/reducers/products";
import { useAppSelector } from "../../store/types";
import { ProductsOverviewScreenNavProp } from "../../navigation/ProductsOverviewStack/types";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen: FC = () => {
  const navigation = useNavigation<ProductsOverviewScreenNavProp>();
  const publicProducts = useAppSelector(selectPublicProducts);

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
          onViewDetail={() => null}
          onAddToCart={() => null}
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
