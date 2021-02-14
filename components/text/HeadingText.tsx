import React, { FC } from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

import Fonts from "../../constants/fonts";

interface HeadingTextProps extends TextProps {
  style?: TextStyle;
}

const HeadingText: FC<HeadingTextProps> = (props) => (
  <Text {...props} style={{ ...styles.text, ...(props.style || {}) }}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 18,
  },
});

export default HeadingText;
