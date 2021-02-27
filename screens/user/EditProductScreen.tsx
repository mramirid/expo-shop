import { ErrorMessage } from '@hookform/error-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import AppHeaderButton from '../../components/ui/AppHeaderButton';
import BodyText from '../../components/ui/text/BodyText';
import HeadingText from '../../components/ui/text/HeadingText';
import Colors from '../../constants/colors';
import useIsMounted from '../../hooks/useIsMounted';
import {
  EditProductScreenNavProp,
  EditProductScreenRouteProp,
} from '../../navigation/UserProductsStack/types';
import { updateProduct, addProduct } from '../../store/thunks/products';
import { useAppDispatch } from '../../store/types';

interface ProductInputData {
  title: string;
  imageUrl: string;
  price: string;
  description: string;
}

const EditProductScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<EditProductScreenNavProp>();
  const { params } = useRoute<EditProductScreenRouteProp>();
  const { runInMounted } = useIsMounted();

  const { handleSubmit, control, errors } = useForm<ProductInputData>({
    defaultValues: {
      title: params?.product.title ?? '',
      imageUrl: params?.product.imageUrl ?? '',
      price: params?.product.price.toString() ?? '',
      description: params?.product.description ?? '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onValidSubmission = useCallback(
    async (data: ProductInputData) => {
      try {
        setIsLoading(true);

        const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (!permission.granted) {
          throw new Error('You need to grant notification permission to use this app');
        }
        const expoPushToken = await Notifications.getExpoPushTokenAsync();

        if (params) {
          unwrapResult(
            await dispatch(
              updateProduct({
                productId: params.product.id,
                title: data.title,
                imageUrl: data.imageUrl,
                description: data.description,
              })
            )
          );
        } else {
          unwrapResult(
            await dispatch(
              addProduct({
                ...data,
                price: +data.price,
                ownerPushToken: expoPushToken.data,
              })
            )
          );
        }
        runInMounted(() => navigation.goBack());
      } catch (error) {
        runInMounted(() => {
          Alert.alert('An error occurred', error.message, [{ text: 'OK' }]);
        });
      } finally {
        runInMounted(() => setIsLoading(false));
      }
    },
    [dispatch, navigation, params, runInMounted]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params ? 'Edit Product' : 'Add Product',
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
      <View style={styles.screen1}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen2}>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Title</HeadingText>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
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
          render={({ message }) => <BodyText style={styles.inputError}>{message}</BodyText>}
        />
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Image URL</HeadingText>
        <Controller
          name="imageUrl"
          control={control}
          rules={{ required: 'Image URL is required' }}
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
          render={({ message }) => <BodyText style={styles.inputError}>{message}</BodyText>}
        />
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Price</HeadingText>
        <Controller
          name="price"
          control={control}
          rules={{
            required: 'Price is required',
            validate: (val) => !isNaN(+val) || 'Enter a valid number',
          }}
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
          render={({ message }) => <BodyText style={styles.inputError}>{message}</BodyText>}
        />
      </View>
      <View style={styles.formControl}>
        <HeadingText style={styles.label}>Description</HeadingText>
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Product description is required' }}
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
          render={({ message }) => <BodyText style={styles.inputError}>{message}</BodyText>}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen2: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  formControl: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  inputError: {
    color: 'red',
  },
});

export default EditProductScreen;
