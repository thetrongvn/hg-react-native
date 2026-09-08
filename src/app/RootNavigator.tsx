import React from 'react';

import {useBootstrap} from '@hooks/useBootstrap';
import {
  selectIsAuthenticated,
  selectIsHydrated,
  useAppSelector,
} from '@redux/store';
import AuthStack from '@navigation/AuthStack';
import AppTabs from '@navigation/AppTabs';
import SplashScreen from './SplashScreen';
import BootstrapError from './BootstrapError';

export default function RootNavigator() {
  const {status, error, retry} = useBootstrap();
  const isHydrated = useAppSelector(selectIsHydrated);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (status === 'error') {
    return <BootstrapError message={error} onRetry={retry} />;
  }

  if (status !== 'ready' || !isHydrated) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <AppTabs /> : <AuthStack />;
}
