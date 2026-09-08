import * as Keychain from 'react-native-keychain';

export async function setSecureValue(
  key: string,
  value: string,
): Promise<boolean> {
  const result = await Keychain.setGenericPassword(key, value, {service: key});
  return Boolean(result);
}

export async function getSecureValue(key: string): Promise<string | null> {
  const result = await Keychain.getGenericPassword({service: key});
  if (result) {
    return result.password;
  }
  return null;
}

export async function removeSecureValue(key: string): Promise<boolean> {
  return Keychain.resetGenericPassword({service: key});
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
