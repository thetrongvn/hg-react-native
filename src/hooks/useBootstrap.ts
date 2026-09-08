import {useCallback, useEffect, useState} from 'react';

import {openRealm} from '@core/db';
import {authService, initServices, getSettingsService} from '@core/services';
import {sessionEvents} from '@core/sessionEvents';
import {setHydrated, setSession, clearSession} from '@redux/slices/authSlice';
import {useAppDispatch} from '@redux/store';
import {BootstrapStatus} from '@src/types/asyncStatus';

export function useBootstrap() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<BootstrapStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setAttempt(current => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    sessionEvents.setOnUnauthorized(() => {
      dispatch(clearSession());
    });

    async function boot() {
      setStatus('loading');
      setError(null);
      try {
        const realm = await openRealm();
        initServices(realm);
        await getSettingsService().loadAppSettings();
        const user = await authService.hydrate();
        if (!cancelled) {
          dispatch(setSession(user));
          dispatch(setHydrated(true));
          setStatus('ready');
        }
      } catch (e) {
        if (!cancelled) {
          dispatch(setHydrated(true));
          setError(e instanceof Error ? e.message : String(e));
          setStatus('error');
        }
      }
    }

    boot();

    return () => {
      cancelled = true;
      sessionEvents.setOnUnauthorized(null);
    };
  }, [dispatch, attempt]);

  return {status, error, retry};
}
