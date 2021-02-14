import React, { FC } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface AppCardProps {
  style?: ViewStyle;
}

const AppCard: FC<AppCardProps> = (props) => (
  <View style={{ ...styles.card, ...(props.style || {}) }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
});

export default AppCard;
