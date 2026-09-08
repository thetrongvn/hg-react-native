import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {colors} from '@theme/theme';
import i18n from '@i18n';

export default function SplashScreen() {
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={styles.label}>{i18n.t('bootstrap.loading')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  label: {
    marginTop: 12,
    color: colors.gray,
    fontSize: 16,
  },
});
