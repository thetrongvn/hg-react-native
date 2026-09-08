import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import HeaderBar from '@components/HeaderBar';
import i18n from '@i18n';
import {ScreenStatus} from '@src/types/asyncStatus';

const emptyState: ScreenStatus = 'empty';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <HeaderBar title={i18n.t('notifications.title')} showBack={false} />
      <View style={styles.content}>
        {emptyState === 'empty' ? (
          <>
            <Image
              source={require('@assets/images/empty_notifications.png')}
              style={styles.image}
            />
            <Text style={styles.title}>{i18n.t('notifications.empty')}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: '300',
    color: '#111827',
    marginBottom: 8,
  },
});
