import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CartItem as ICartItem } from '../../types/cart';
import BodyText from '../ui/text/BodyText';
import HeadingText from '../ui/text/HeadingText';

interface CartItemProps {
  cartItem: ICartItem;
  onRemove?: () => void;
}

const CartItem: FC<CartItemProps> = (props) => (
  <View style={styles.cartItem}>
    <View style={styles.itemInfo1}>
      <BodyText style={styles.qty}>{props.cartItem.qty}</BodyText>
      <HeadingText numberOfLines={1} style={styles.headingText}>
        {props.cartItem.title}
      </HeadingText>
    </View>
    <View style={styles.itemInfo2}>
      <HeadingText style={styles.headingText}>
        ${(props.cartItem.price * props.cartItem.qty).toFixed(2)}
      </HeadingText>
      {props.onRemove && (
        <TouchableOpacity style={styles.deleteButton} onPress={props.onRemove}>
          <Ionicons name="trash" size={23} color="red" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo1: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo2: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  qty: {
    color: '#888',
    marginRight: 5,
  },
  headingText: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
