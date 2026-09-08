import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '@features/home/HomeScreen';
import ProfileScreen from '@features/profile/ProfileScreen';
import NotificationsScreen from '@features/notifications/NotificationsScreen';
import {
  ROUTES_HOME,
  ROUTES_NOTIFICATIONS,
  ROUTES_PROFILE,
} from '@constants';
import {AppTabParamList} from './types';
import {colors} from '@theme/theme';
import i18n from '@i18n';

const Tab = createBottomTabNavigator<AppTabParamList>();

const tabItems: Array<{
  key: keyof AppTabParamList;
  name: string;
  component: React.ComponentType;
  headerShown: boolean;
  iconName: string;
}> = [
  {
    key: ROUTES_HOME,
    name: i18n.t('tabs.home'),
    component: HomeScreen,
    headerShown: true,
    iconName: 'home-outline',
  },
  {
    key: ROUTES_NOTIFICATIONS,
    name: i18n.t('tabs.notifications'),
    component: NotificationsScreen,
    headerShown: false,
    iconName: 'notifications-outline',
  },
  {
    key: ROUTES_PROFILE,
    name: i18n.t('tabs.profile'),
    component: ProfileScreen,
    headerShown: false,
    iconName: 'person-circle-outline',
  },
];

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {color: colors.gray, fontSize: 22, fontWeight: '300'},
        headerStyle: {backgroundColor: colors.white},
      }}>
      {tabItems.map(item => (
        <Tab.Screen
          key={item.key}
          name={item.key}
          component={item.component}
          options={{
            title: item.name,
            headerShown: item.headerShown,
            tabBarIcon: ({focused}) => (
              <View style={styles.iconWrap}>
                <Icon
                  name={item.iconName}
                  size={24}
                  color={focused ? colors.primary : colors.gray}
                />
              </View>
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? colors.primary : colors.gray,
                }}>
                {item.name}
              </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
