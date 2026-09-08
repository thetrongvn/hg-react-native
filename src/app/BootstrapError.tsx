import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '@theme/theme';
import i18n from '@i18n';

type Props = {
  message: string | null;
  onRetry?: () => void;
};

export default function BootstrapError({message, onRetry}: Props) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>{i18n.t('bootstrap.errorTitle')}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {onRetry ? (
        <TouchableOpacity style={styles.retry} onPress={onRetry}>
          <Text style={styles.retryLabel}>{i18n.t('bootstrap.retry')}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.error,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  retry: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
