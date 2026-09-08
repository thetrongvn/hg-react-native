import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {store} from '@redux/store';
import {ThemeProvider} from '@theme/useTheme';

type Props = {
  children: React.ReactNode;
};

export default function AppProviders({children}: Props) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        <ThemeProvider>
          <SafeAreaProvider>
            <NavigationContainer>{children}</NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
