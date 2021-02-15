import { useNavigation } from "@react-navigation/native";
import React, { FC, useLayoutEffect } from "react";
import { batch } from "react-redux";
import { View, Button, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { UserProductsScreenNavProp } from "../../navigation/UserProductsStack/types";
import {
  deleteUserProducts,
  selectUserProducts,
} from "../../store/reducers/products";
import { useAppDispatch, useAppSelector } from "../../store/types";
import ProductItem from "../../components/shop/ProductItem";
import AppHeaderButton from "../../components/ui/AppHeaderButton";
import Colors from "../../constants/colors";
import { deleteProduct } from "../../store/reducers/cart";

const UserProductsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UserProductsScreenNavProp>();

  const userProducts = useAppSelector(selectUserProducts);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your Products",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={navigation.toggleDrawer}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      contentContainerStyle={styles.screenBody}
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          style={styles.productItems}
          product={item}
          onCardTap={() => null}>
          <View style={styles.actionButtons}>
            <Button color={Colors.Accent} title="EDIT" onPress={() => null} />
          </View>
          <View style={styles.actionButtons}>
            <Button
              color={Colors.Accent}
              title="DELETE"
              onPress={() => {
                batch(() => {
                  dispatch(deleteUserProducts(item.id));
                  dispatch(deleteProduct(item.id));
                });
              }}
            />
          </View>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  screenBody: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  productItems: {
    marginBottom: 20,
  },
  actionButtons: {
    width: "30%",
  },
});

export default UserProductsScreen;
