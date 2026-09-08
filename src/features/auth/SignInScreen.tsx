import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/Feather';

import {authService} from '@core/services';
import {setSession} from '@redux/slices/authSlice';
import {useAppDispatch} from '@redux/store';
import {colors} from '@theme/theme';
import i18n from '@i18n';
import {loginValidationSchema, SignInFormValues} from './loginSchema';

const logo = require('@assets/images/logo.png');

export default function SignInScreen() {
  const dispatch = useAppDispatch();

  const handleLogin = async (
    values: SignInFormValues,
    {setErrors}: {setErrors: (errors: Record<string, string>) => void},
  ) => {
    try {
      const user = await authService.signIn(values.email, values.password);
      dispatch(setSession(user));
    } catch (error) {
      const fieldErrors = authService.mapSignInError(error);
      if (fieldErrors) {
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Icon name="mail" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={i18n.t('signIn.email')}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={i18n.t('signIn.password')}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>
                {i18n.t('signIn.forgotPassword')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={!isValid}>
              <Text style={styles.buttonText}>{i18n.t('signIn.login')}</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: colors.error,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
