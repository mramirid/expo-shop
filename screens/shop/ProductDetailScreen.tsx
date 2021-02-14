import React, { FC, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  // ScrollView,
  // Image,
  // Button,
  // StyleSheet,
} from "react-native";

import {
  ProductDetailScreenNavProp,
  ProductDetailScreenRouteProp,
} from "../../navigation/ProductsStack/types";

const ProductDetailScreen: FC = () => {
  const navigation = useNavigation<ProductDetailScreenNavProp>();
  const { params } = useRoute<ProductDetailScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.product.title,
    });
  }, [navigation, params.product.title]);

  return (
    <View>
      <Text>{params.product.title}</Text>
    </View>
  );
};

export default ProductDetailScreen;
