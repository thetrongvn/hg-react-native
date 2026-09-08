import {post} from './apiClient';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  uid: string;
  idToken: string;
  refreshToken?: string;
  email?: string;
};

export const signIn = (body: SignInRequest) => {
  return post<SignInResponse>('accounts/signin', body);
};

export const signUp = (body: SignInRequest) => {
  return post<SignInResponse>('accounts/signup', body);
};
