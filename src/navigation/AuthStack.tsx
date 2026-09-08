import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES_SIGNIN, ROUTES_WELCOME} from '@constants';
import WelcomeScreen from '@features/auth/WelcomeScreen';
import SignInScreen from '@features/auth/SignInScreen';
import {AuthStackParamList} from './types';
import i18n from '@i18n';
import {colors} from '@theme/theme';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.gray,
        headerTitleStyle: {fontWeight: '300'},
      }}>
      <Stack.Screen
        name={ROUTES_WELCOME}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES_SIGNIN}
        component={SignInScreen}
        options={{
          headerShown: true,
          title: i18n.t('signIn.title'),
        }}
      />
    </Stack.Navigator>
  );
}
