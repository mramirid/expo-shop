import React, { FC, JSXElementConstructor } from "react";
import {
  View,
  StyleSheet,
  Image,
  Button,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

import Colors from "../../constants/colors";
import Product from "../../types/product";
import BodyText from "../text/BodyText";
import HeadingText from "../text/HeadingText";

interface ProductItemProps {
  product: Product;
  onViewDetail(): void;
  onAddToCart(): void;
}

const ProductItem: FC<ProductItemProps> = (props) => {
  let Touchable: JSXElementConstructor<
    TouchableOpacityProps | TouchableNativeFeedbackProps
  >;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  } else {
    Touchable = TouchableOpacity;
  }
  return (
    <View style={styles.product}>
      <Touchable onPress={props.onViewDetail} useForeground>
        <View>
          <Image
            style={styles.image}
            source={{ uri: props.product.imageUrl }}
          />
          <View style={styles.details}>
            <HeadingText style={styles.title}>
              {props.product.title}
            </HeadingText>
            <BodyText style={styles.price}>
              ${props.product.price.toFixed(2)}
            </BodyText>
          </View>
          <View style={styles.actions}>
            <Button
              color={Colors.Primary}
              title="VIEW DETAILS"
              onPress={props.onViewDetail}
            />
            <Button
              color={Colors.Primary}
              title="ADD TO CART"
              onPress={props.onAddToCart}
            />
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
