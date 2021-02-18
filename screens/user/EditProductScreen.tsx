import React, { FC, useCallback, useLayoutEffect } from "react";
import { View, ScrollView, TextInput, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { batch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import AppHeaderButton from "../../components/ui/AppHeaderButton";
import HeadingText from "../../components/ui/text/HeadingText";
import {
  EditProductScreenNavProp,
  EditProductScreenRouteProp,
} from "../../navigation/UserProductsStack/types";
import { UpdateProductPayload } from "../../types/product";
import { useAppDispatch } from "../../store/types";
import {
  addUserProduct,
  updateUserProduct,
} from "../../store/reducers/products";
import { updateProduct } from "../../store/reducers/cart";
import BodyText from "../../components/ui/text/BodyText";

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

  const onValidSubmission = useCallback(
    (data: InputData) => {
      if (params) {
        const updateProductPayload: UpdateProductPayload = {
          productId: params.product.id,
          title: data.title,
          imageUrl: data.imageUrl,
          description: data.description,
        };
        batch(() => {
          dispatch(updateUserProduct(updateProductPayload));
          dispatch(updateProduct(updateProductPayload));
        });
      } else {
        dispatch(
          addUserProduct({
            ownerId: "u1",
            title: data.title,
            imageUrl: data.imageUrl,
            price: +data.price,
            description: data.description,
          }),
        );
      }
      navigation.goBack();
    },
    [dispatch, navigation, params],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            title="Save"
            iconName="checkmark-circle"
            onPress={handleSubmit(onValidSubmission)}
          />
        </HeaderButtons>
      ),
    });
  }, [handleSubmit, navigation, onValidSubmission, params]);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
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
  screen: {
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
