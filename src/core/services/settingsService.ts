import BaseService from './baseService';
import AppSettings from '../models/appSettings';

class SettingsService extends BaseService {
  loadAppSettings = async (): Promise<AppSettings | undefined> => {
    try {
      const objects = this.realm.objects<AppSettings>('AppSettings');
      if (objects.isEmpty()) {
        this.realm.write(() => {
          this.realm.create(
            'AppSettings',
            AppSettings.generate('0.0.1', 'en', 'light'),
          );
        });
      }
      return objects.at(0);
    } catch {
      return undefined;
    }
  };
}

export default SettingsService;
