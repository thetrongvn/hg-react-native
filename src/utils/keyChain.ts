import * as Keychain from 'react-native-keychain';

const defaultOptions = {
  accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK,
};

export async function setSecureValue(
  key: string,
  value: string,
): Promise<boolean> {
  try {
    const result = await Keychain.setGenericPassword(key, value, {
      service: key,
      ...defaultOptions,
    });
    return Boolean(result);
  } catch {
    return false;
  }
}

export async function getSecureValue(key: string): Promise<string | null> {
  try {
    const result = await Keychain.getGenericPassword({
      service: key,
      ...defaultOptions,
    });
    if (result) {
      return result.password;
    }
    return null;
  } catch {
    return null;
  }
}

export async function removeSecureValue(key: string): Promise<boolean> {
  try {
    return Keychain.resetGenericPassword({service: key});
  } catch {
    return false;
  }
}

export const KEYCHAIN_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  sessionUser: 'sessionUser',
} as const;

export async function clearSessionSecrets(): Promise<void> {
  await removeSecureValue(KEYCHAIN_KEYS.accessToken);
  await removeSecureValue(KEYCHAIN_KEYS.refreshToken);
  await removeSecureValue(KEYCHAIN_KEYS.sessionUser);
}
