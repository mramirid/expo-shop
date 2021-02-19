import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";
import { unwrapResult } from "@reduxjs/toolkit";

import AppCard from "../../components/ui/AppCard";
import BodyText from "../../components/ui/text/BodyText";
import { ErrorMessage } from "@hookform/error-message";
import Colors from "../../constants/colors";
import HeadingText from "../../components/ui/text/HeadingText";
import { AuthScreenNavProp } from "../../navigation/AuthStack/types";
import { signUp } from "../../store/thunks/auth";
import { useAppDispatch } from "../../store/types";

interface InputData {
  email: string;
  password: string;
}

const AuthScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthScreenNavProp>();

  const { control, errors, handleSubmit } = useForm<InputData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Authenticate" });
  }, [navigation]);

  const onSignUp = useCallback(
    async (data: InputData) => {
      try {
        setIsLoading(true);
        unwrapResult(
          await dispatch(
            signUp({
              ...data,
              returnSecureToken: true,
            }),
          ),
        );
      } catch (error) {
        Alert.alert("An error occurred", error.message, [{ text: "OK" }]);
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  let actionButtons: JSX.Element;
  if (isLoading) {
    actionButtons = <ActivityIndicator size="small" color={Colors.Primary} />;
  } else {
    actionButtons = (
      <>
        <View style={styles.buttonContainer}>
          <Button
            title="SIGN UP"
            color={Colors.Primary}
            onPress={handleSubmit(onSignUp)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="SWITCH TO SIGNUP"
            color={Colors.Accent}
            onPress={() => null}
          />
        </View>
      </>
    );
  }

  return (
    <LinearGradient style={styles.screen} colors={["#ffedff", "#ffe3ff"]}>
      <AppCard style={styles.formCard}>
        <ScrollView>
          <View style={styles.formControl}>
            <HeadingText style={styles.label}>Email</HeadingText>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={(renderProps) => (
                <TextInput
                  {...renderProps}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onChangeText={(text) => renderProps.onChange(text)}
                />
              )}
            />
            <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => (
                <BodyText style={styles.inputError}>{message}</BodyText>
              )}
            />
          </View>
          <View style={styles.formControl}>
            <HeadingText style={styles.label}>Password</HeadingText>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be 5 characters",
                },
              }}
              render={(renderProps) => (
                <TextInput
                  {...renderProps}
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  returnKeyType="done"
                  onChangeText={(text) => renderProps.onChange(text)}
                />
              )}
            />
            <ErrorMessage
              name="password"
              errors={errors}
              render={({ message }) => (
                <BodyText style={styles.inputError}>{message}</BodyText>
              )}
            />
          </View>
          {actionButtons}
        </ScrollView>
      </AppCard>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formCard: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  formControl: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  inputError: {
    color: "red",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
