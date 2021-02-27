import { format } from 'date-fns';
import React, { FC, useState } from 'react';
import { View, StyleSheet, Button, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Order from '../../types/order';
import AppCard from '../ui/AppCard';
import BodyText from '../ui/text/BodyText';
import HeadingText from '../ui/text/HeadingText';
import CartItem from './CartItem';

interface OrderItemProps {
  order: Order;
  style?: ViewStyle;
}

const OrderItem: FC<OrderItemProps> = (props) => {
  const [isDetailsDisplayed, setIsDetailsDisplayed] = useState(false);

  let cartItems: JSX.Element[] | null = null;
  if (isDetailsDisplayed) {
    cartItems = props.order.items.map((cartItem) => (
      <CartItem key={cartItem.productId} cartItem={cartItem} />
    ));
  }

  return (
    <AppCard style={{ ...styles.orderItem, ...props.style }}>
      <View style={styles.summary}>
        <HeadingText style={styles.totalAmount}>${props.order.totalAmount.toFixed(2)}</HeadingText>
        <BodyText style={styles.date}>{format(props.order.date, 'd MMM y, HH:mm')}</BodyText>
      </View>
      <Button
        title={isDetailsDisplayed ? 'HIDE DETAILS' : 'SHOW DETAILS'}
        onPress={() => {
          setIsDetailsDisplayed((isDetailsDisplayed) => !isDetailsDisplayed);
        }}
        color={Colors.Accent}
      />
      {cartItems}
    </AppCard>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 16,
  },
  date: {
    color: '#888',
  },
});

export default OrderItem;
