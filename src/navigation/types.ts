import {
  ROUTES_HOME,
  ROUTES_NOTIFICATIONS,
  ROUTES_PROFILE,
  ROUTES_SIGNIN,
  ROUTES_WELCOME,
} from '@constants';

export type AuthStackParamList = {
  [ROUTES_WELCOME]: undefined;
  [ROUTES_SIGNIN]: undefined;
};

export type AppTabParamList = {
  [ROUTES_HOME]: undefined;
  [ROUTES_NOTIFICATIONS]: undefined;
  [ROUTES_PROFILE]: undefined;
};
