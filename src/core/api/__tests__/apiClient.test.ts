import {recoverFromUnauthorized} from '../apiClient';
import {getSecureValue, clearSessionSecrets} from '@utils/keyChain';
import {sessionEvents} from '../../sessionEvents';

describe('apiClient unauthorized recovery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('signs out when refresh token is missing', async () => {
    (getSecureValue as jest.Mock).mockResolvedValue(null);
    const listener = jest.fn();
    sessionEvents.setOnUnauthorized(listener);

    const outcome = await recoverFromUnauthorized();

    expect(outcome).toBe('signed_out');
    expect(clearSessionSecrets).toHaveBeenCalled();
    expect(listener).toHaveBeenCalled();
    sessionEvents.setOnUnauthorized(null);
  });
});
