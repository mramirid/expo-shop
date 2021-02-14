import React, { FC, useLayoutEffect } from "react";
import { Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { selectPublicProducts } from "../../store/reducers/products";
import { useAppSelector } from "../../store/types";
import { ProductsOverviewScreenNavProp } from "../../navigation/ProductsOverviewStack/types";

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
      data={publicProducts}
      renderItem={(data) => <Text>{data.item.title}</Text>}
    />
  );
};

export default ProductsOverviewScreen;
