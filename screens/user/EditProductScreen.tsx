import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { unwrapResult } from "@reduxjs/toolkit";

import AppHeaderButton from "../../components/ui/AppHeaderButton";
import HeadingText from "../../components/ui/text/HeadingText";
import {
  EditProductScreenNavProp,
  EditProductScreenRouteProp,
} from "../../navigation/UserProductsStack/types";
import { UpdateProductPayload } from "../../types/product";
import { useAppDispatch } from "../../store/types";
import BodyText from "../../components/ui/text/BodyText";
import { updateProduct, addProduct } from "../../store/thunks/products";
import Colors from "../../constants/colors";

interface InputData {
  title: string;
  imageUrl: string;
  price: string;
  description: string;
}

const EditProductScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<EditProductScreenNavProp>();
  const { params } = useRoute<EditProductScreenRouteProp>();

  const { handleSubmit, control, errors } = useForm<InputData>({
    defaultValues: {
      title: params?.product.title || "",
      imageUrl: params?.product.imageUrl || "",
      price: params?.product.price.toString() || "",
      description: params?.product.description || "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onValidSubmission = useCallback(
    async (data: InputData) => {
      try {
        setIsLoading(true);
        if (params) {
          const updateProductPayload: UpdateProductPayload = {
            id: params.product.id,
            title: data.title,
            imageUrl: data.imageUrl,
            description: data.description,
          };
          unwrapResult(await dispatch(updateProduct(updateProductPayload)));
        } else {
          unwrapResult(
            await dispatch(
              addProduct({
                ownerId: "u1",
                title: data.title,
                imageUrl: data.imageUrl,
                price: +data.price,
                description: data.description,
              }),
            ),
          );
        }
        navigation.goBack();
      } catch (error) {
        Alert.alert("An error occurred", error.message, [{ text: "OK" }]);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, navigation, params],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params ? "Edit Product" : "Add Product",
    });
  }, [navigation, params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            title="Save"
            iconName="checkmark-circle"
            disabled={isLoading}
            onPress={handleSubmit(onValidSubmission)}
          />
        </HeaderButtons>
      ),
    });
  }, [handleSubmit, isLoading, navigation, onValidSubmission]);

  if (isLoading) {
    return (
      <View style={styles.screenBody1}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screenBody2}>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Title</HeadingText>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
              onChangeText={(text) => renderProps.onChange(text)}
            />
          )}
        />
        <ErrorMessage
          name="title"
          errors={errors}
          render={({ message }) => (
            <BodyText style={styles.inputErrors}>{message}</BodyText>
          )}
        />
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Image URL</HeadingText>
        <Controller
          name="imageUrl"
          control={control}
          rules={{ required: "Image URL is required" }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              style={styles.input}
              returnKeyType="next"
              onChangeText={(text) => renderProps.onChange(text)}
            />
          )}
        />
        <ErrorMessage
          name="imageUrl"
          errors={errors}
          render={({ message }) => (
            <BodyText style={styles.inputErrors}>{message}</BodyText>
          )}
        />
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Price</HeadingText>
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              style={styles.input}
              editable={!params}
              keyboardType="number-pad"
              returnKeyType="next"
              onChangeText={(text) => renderProps.onChange(text)}
            />
          )}
        />
        <ErrorMessage
          name="price"
          errors={errors}
          render={({ message }) => (
            <BodyText style={styles.inputErrors}>{message}</BodyText>
          )}
        />
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Description</HeadingText>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Product description is required" }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              style={styles.input}
              multiline
              autoCapitalize="sentences"
              returnKeyType="next"
              onChangeText={(text) => renderProps.onChange(text)}
            />
          )}
        />
        <ErrorMessage
          name="description"
          errors={errors}
          render={({ message }) => (
            <BodyText style={styles.inputErrors}>{message}</BodyText>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenBody1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenBody2: {
    paddingTop: 20,
    paddingHorizontal: 20,
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
  inputErrors: {
    color: "red",
  },
});

export default EditProductScreen;
