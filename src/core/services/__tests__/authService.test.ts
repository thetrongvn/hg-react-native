import {authService} from '../authService';
import {signIn} from '../../api/auth';
import {
  clearSessionSecrets,
  getSecureValue,
  KEYCHAIN_KEYS,
  setSecureValue,
} from '@utils/keyChain';
import {sessionEvents} from '../../sessionEvents';

jest.mock('../../api/auth', () => ({
  signIn: jest.fn(),
}));

const mockedSignIn = signIn as jest.MockedFunction<typeof signIn>;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hydrate returns null when there is no access token', async () => {
    (getSecureValue as jest.Mock).mockResolvedValue(null);

    await expect(authService.hydrate()).resolves.toBeNull();
  });

  it('hydrate returns the stored user when token and user exist', async () => {
    const user = {uid: 'u1', email: 'a@b.com'};
    (getSecureValue as jest.Mock).mockImplementation(async (key: string) => {
      if (key === KEYCHAIN_KEYS.accessToken) {
        return 'token';
      }
      if (key === KEYCHAIN_KEYS.sessionUser) {
        return JSON.stringify(user);
      }
      return null;
    });

    await expect(authService.hydrate()).resolves.toEqual(user);
  });

  it('signIn persists tokens and returns the user', async () => {
    mockedSignIn.mockResolvedValue({
      uid: 'u1',
      idToken: 'id-token',
      refreshToken: 'refresh-token',
      email: 'a@b.com',
    });

    const user = await authService.signIn('a@b.com', 'secret');

    expect(user).toEqual({uid: 'u1', email: 'a@b.com'});
    expect(setSecureValue).toHaveBeenCalledWith(
      KEYCHAIN_KEYS.accessToken,
      'id-token',
    );
    expect(setSecureValue).toHaveBeenCalledWith(
      KEYCHAIN_KEYS.refreshToken,
      'refresh-token',
    );
  });

  it('signOut clears secrets and notifies unauthorized listeners', async () => {
    const listener = jest.fn();
    sessionEvents.setOnUnauthorized(listener);

    await authService.signOut();

    expect(clearSessionSecrets).toHaveBeenCalled();
    expect(listener).toHaveBeenCalled();
    sessionEvents.setOnUnauthorized(null);
  });
});
