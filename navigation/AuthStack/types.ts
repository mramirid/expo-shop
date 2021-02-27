import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  AuthScreen: undefined;
};

export type AuthScreenNavProp = StackNavigationProp<AuthStackParamList, 'AuthScreen'>;
