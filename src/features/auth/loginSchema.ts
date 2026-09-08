import * as Yup from 'yup';

import i18n from '@i18n';

export type SignInFormValues = {
  email: string;
  password: string;
};

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('signIn.invalidEmail'))
    .required(i18n.t('signIn.emailRequired')),
  password: Yup.string()
    .min(3, ({min}) => i18n.t('signIn.passwordMin', {min}))
    .required(i18n.t('signIn.passwordRequired')),
});
