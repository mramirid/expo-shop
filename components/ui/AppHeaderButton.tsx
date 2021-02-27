import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Platform } from 'react-native';
import { HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';

import Colors from '../../constants/colors';

const AppHeaderButton: FC<HeaderButtonProps> = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={Platform.OS === 'android' ? 'white' : Colors.Primary}
  />
);

export default AppHeaderButton;
