import { Platform } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";

import Colors from "../constants/colors";
import Fonts from "../constants/fonts";

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerTintColor: Platform.OS === "android" ? "white" : undefined,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.Primary : undefined,
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.OpenSansRegular,
  },
  headerTitleStyle: {
    fontFamily: Fonts.OpenSansRegular,
  },
};
