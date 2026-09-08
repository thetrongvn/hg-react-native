import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';

import config from '../../config';
import {sessionEvents} from '../sessionEvents';
import {
  clearSessionSecrets,
  getSecureValue,
  KEYCHAIN_KEYS,
  setSecureValue,
} from '@utils/keyChain';

type RetryConfig = InternalAxiosRequestConfig & {_retry?: boolean};

const API_BASE_URL = config.env.API_BASE_URL ?? '';
const API_NAMESPACE = config.env.API_NAMESPACE ?? 'v1';

export const baseURL = `${API_BASE_URL}/${API_NAMESPACE}`;

export const http = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(async requestConfig => {
  const token = await getSecureValue(KEYCHAIN_KEYS.accessToken);
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});

export async function tryRefreshAccessToken(): Promise<string | null> {
  const refreshToken = await getSecureValue(KEYCHAIN_KEYS.refreshToken);
  if (!refreshToken) {
    return null;
  }

  try {
    const {data} = await refreshClient.post<{
      idToken?: string;
      refreshToken?: string;
    }>('accounts/token/refresh', {refreshToken});

    if (!data.idToken) {
      return null;
    }

    await setSecureValue(KEYCHAIN_KEYS.accessToken, data.idToken);
    if (data.refreshToken) {
      await setSecureValue(KEYCHAIN_KEYS.refreshToken, data.refreshToken);
    }
    return data.idToken;
  } catch {
    return null;
  }
}

export async function recoverFromUnauthorized(): Promise<'retried' | 'signed_out'> {
  const token = await tryRefreshAccessToken();
  if (token) {
    return 'retried';
  }
  await clearSessionSecrets();
  sessionEvents.notifyUnauthorized();
  return 'signed_out';
}

http.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      const outcome = await recoverFromUnauthorized();
      if (outcome === 'retried') {
        const token = await getSecureValue(KEYCHAIN_KEYS.accessToken);
        if (token) {
          original.headers.Authorization = `Bearer ${token}`;
        }
        return http(original);
      }
    }
    return Promise.reject(error);
  },
);

export async function get<T>(path: string): Promise<T> {
  const response = await http.get<T>(path);
  return response.data;
}

export async function post<T>(path: string, body?: unknown): Promise<T> {
  const response = await http.post<T>(path, body);
  return response.data;
}

export default http;
