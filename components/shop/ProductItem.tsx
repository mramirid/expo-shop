import React, { FC, JSXElementConstructor } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  ViewStyle,
} from 'react-native';

import Product from '../../types/product';
import AppCard from '../ui/AppCard';
import BodyText from '../ui/text/BodyText';
import HeadingText from '../ui/text/HeadingText';

interface ProductItemProps {
  product: Product;
  style?: ViewStyle;
  onCardTap(): void;
}

const ProductItem: FC<ProductItemProps> = (props) => {
  let Touchable: JSXElementConstructor<TouchableOpacityProps | TouchableNativeFeedbackProps>;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  } else {
    Touchable = TouchableOpacity;
  }
  return (
    <AppCard style={{ ...styles.product, ...props.style }}>
      <Touchable onPress={props.onCardTap} useForeground>
        <View>
          <Image style={styles.image} source={{ uri: props.product.imageUrl }} />
          <View style={styles.details}>
            <HeadingText style={styles.title}>{props.product.title}</HeadingText>
            <BodyText style={styles.price}>${props.product.price.toFixed(2)}</BodyText>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </Touchable>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 330,
  },
  image: {
    width: '100%',
    height: '60%',
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
  title: {
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    height: '23%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default ProductItem;
