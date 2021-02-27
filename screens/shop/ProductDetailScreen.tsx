import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, useLayoutEffect } from 'react';
import { View, ScrollView, Image, Button, StyleSheet } from 'react-native';

import BodyText from '../../components/ui/text/BodyText';
import HeadingText from '../../components/ui/text/HeadingText';
import Colors from '../../constants/colors';
import {
  ProductDetailScreenNavProp,
  ProductDetailScreenRouteProp,
} from '../../navigation/ShopStack/types';
import { addToCart } from '../../store/reducers/cart';
import { useAppDispatch } from '../../store/types';

const ProductDetailScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProductDetailScreenNavProp>();
  const { params } = useRoute<ProductDetailScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.product.title });
  }, [navigation, params.product.title]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: params.product.imageUrl }} />
      <View style={styles.action}>
        <Button
          title="ADD TO CART"
          color={Colors.Accent}
          onPress={() => dispatch(addToCart(params.product))}
        />
      </View>
      <HeadingText style={styles.price}>${params.product.price.toFixed(2)}</HeadingText>
      <BodyText style={styles.description}>{params.product.description}</BodyText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  action: {
    marginTop: 20,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
