import axios from 'axios';

import {signIn as signInRequest} from '../api/auth';
import {sessionEvents} from '../sessionEvents';
import {AuthUser} from '@src/types/types';
import {
  clearSessionSecrets,
  getSecureValue,
  KEYCHAIN_KEYS,
  setSecureValue,
} from '@utils/keyChain';

export type FormikFieldErrors = Record<string, string>;

export function transformToFormikErrors(
  errors: Record<string, string | string[]>,
): FormikFieldErrors {
  return Object.fromEntries(
    Object.entries(errors).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
}

class AuthService {
  hydrate = async (): Promise<AuthUser | null> => {
    const accessToken = await getSecureValue(KEYCHAIN_KEYS.accessToken);
    const userJson = await getSecureValue(KEYCHAIN_KEYS.sessionUser);
    if (!accessToken || !userJson) {
      return null;
    }
    try {
      return JSON.parse(userJson) as AuthUser;
    } catch {
      return null;
    }
  };

  signIn = async (email: string, password: string): Promise<AuthUser> => {
    const data = await signInRequest({email, password});
    const user: AuthUser = {
      uid: data.uid,
      email: data.email ?? email,
    };

    await setSecureValue(KEYCHAIN_KEYS.accessToken, data.idToken);
    if (data.refreshToken) {
      await setSecureValue(KEYCHAIN_KEYS.refreshToken, data.refreshToken);
    }
    await setSecureValue(KEYCHAIN_KEYS.sessionUser, JSON.stringify(user));

    return user;
  };

  signOut = async (): Promise<void> => {
    await clearSessionSecrets();
    sessionEvents.notifyUnauthorized();
  };

  mapSignInError = (error: unknown): FormikFieldErrors | null => {
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      typeof error.response.data === 'object' &&
      'errors' in error.response.data
    ) {
      const payload = error.response.data as {
        errors?: Record<string, string | string[]>;
      };
      if (payload.errors) {
        return transformToFormikErrors(payload.errors);
      }
    }
    return null;
  };
}

export const authService = new AuthService();
export default AuthService;
