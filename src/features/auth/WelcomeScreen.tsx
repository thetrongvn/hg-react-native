import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ROUTES_SIGNIN} from '@constants';
import {AuthStackParamList} from '@navigation/types';
import {colors} from '@theme/theme';
import i18n from '@i18n';

const unsplashBgImage = require('@assets/images/unsplash-backgound.png');

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
  return (
    <ImageBackground
      source={unsplashBgImage}
      style={styles.background}
      blurRadius={3}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.icon}>🔒</Text>
          <Text style={styles.title}>{i18n.t('welcome.title')}</Text>
          <Text style={styles.subtitle}>{i18n.t('welcome.subtitle')}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(ROUTES_SIGNIN)}>
            <Text style={styles.buttonText}>{i18n.t('welcome.signIn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  icon: {
    fontSize: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
