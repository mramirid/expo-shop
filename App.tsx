import "react-native-gesture-handler";
import React, { FC } from "react";
import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { enableScreens } from "react-native-screens";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import Fonts from "./constants/fonts";
import Colors from "./constants/colors";
import { store, persistor } from "./store";
import { SessionTimerContextProvider } from "./contexts/session-timer";
import AppNavigator from "./navigation/AppNavigator";

enableScreens();

const App: FC = () => {
  const [isFontsLoaded] = useFonts({
    [Fonts.OpenSansRegular]: require("./assets/fonts/OpenSans-Regular.ttf"),
    [Fonts.OpenSansBold]: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <PersistGate
          loading={<ActivityIndicator size="large" color={Colors.Primary} />}
          persistor={persistor}>
          <SessionTimerContextProvider>
            <AppNavigator />
          </SessionTimerContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
