import Realm from 'realm';

import SettingsService from './settingsService';
import {authService} from './authService';

let settingsService: SettingsService | null = null;

export function initServices(realm: Realm): void {
  settingsService = new SettingsService(realm);
}

export function getSettingsService(): SettingsService {
  if (!settingsService) {
    throw new Error('Services not initialized. Call initServices() from bootstrap.');
  }
  return settingsService;
}

export {authService};
