import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { View, ScrollView, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { batch } from "react-redux";

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

const EditProductScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<EditProductScreenNavProp>();
  const { params } = useRoute<EditProductScreenRouteProp>();

  const [validationStatus, setValidationStatus] = useState({
    isTitleValid: false,
    isImageUrlValid: false,
    isPriceValid: false,
    isDescValid: false,
  });
  const [productInput, setProductInput] = useState({
    title: params?.product.title || "",
    imageUrl: params?.product.imageUrl || "",
    price: params?.product.price.toString() || "",
    description: params?.product.description || "",
  });

  const addOrUpdateProduct = useCallback(() => {
    if (
      !validationStatus.isTitleValid &&
      !validationStatus.isImageUrlValid &&
      !validationStatus.isPriceValid &&
      !validationStatus.isDescValid
    ) {
      Alert.alert("Validation Error", "Please check the errors in the form", [
        { text: "OK" },
      ]);
      return;
    }

    if (params) {
      const updateProductPayload: UpdateProductPayload = {
        productId: params.product.id,
        title: productInput.title,
        imageUrl: productInput.imageUrl,
        description: productInput.description,
      };
      batch(() => {
        dispatch(updateUserProduct(updateProductPayload));
        dispatch(updateProduct(updateProductPayload));
      });
    } else {
      dispatch(
        addUserProduct({
          ownerId: "u1",
          title: productInput.title,
          imageUrl: productInput.imageUrl,
          price: +productInput.price,
          description: productInput.description,
        }),
      );
    }
    navigation.goBack();
  }, [dispatch, navigation, params, productInput, validationStatus]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            title="Save"
            iconName="checkmark-circle"
            onPress={addOrUpdateProduct}
          />
        </HeaderButtons>
      ),
    });
  }, [addOrUpdateProduct, navigation, params]);

  const changeTitle = (newTitle: string) => {
    let isTitleValid = true;
    if (newTitle.trim().length > 0) {
      isTitleValid = true;
    } else {
      isTitleValid = false;
    }
    setValidationStatus((validationStatus) => ({
      ...validationStatus,
      isTitleValid,
    }));
    setProductInput({ ...productInput, title: newTitle });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Title</HeadingText>
        <TextInput
          style={styles.input}
          value={productInput.title}
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={changeTitle}
        />
        {!validationStatus.isTitleValid && (
          <BodyText style={styles.inputErrors}>
            Please enter a valid title
          </BodyText>
        )}
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Image URL</HeadingText>
        <TextInput
          style={styles.input}
          value={productInput.imageUrl}
          returnKeyType="next"
          onChangeText={(text) => {
            setProductInput({ ...productInput, imageUrl: text });
          }}
        />
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Price</HeadingText>
        <TextInput
          style={styles.input}
          value={productInput.price}
          editable={!params}
          keyboardType="number-pad"
          returnKeyType="next"
          onChangeText={(text) => {
            setProductInput({ ...productInput, price: text });
          }}
        />
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Description</HeadingText>
        <TextInput
          style={styles.input}
          value={productInput.description}
          autoCapitalize="sentences"
          onChangeText={(text) => {
            setProductInput({ ...productInput, description: text });
          }}
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
