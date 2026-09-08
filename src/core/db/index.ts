import Realm from 'realm';

import {schemas} from '../models';
import config from '../../config';

let realmInstance: Realm | null = null;

function schemaVersion(): number {
  const raw = config.env.DB_VERSION;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

export async function openRealm(): Promise<Realm> {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  const version = schemaVersion();
  realmInstance = await Realm.open({
    schema: schemas,
    schemaVersion: version,
    onMigration: () => {
      // Credentials schema was removed in v1. Realm drops omitted object types.
    },
  });

  return realmInstance;
}

export function getRealm(): Realm {
  if (!realmInstance || realmInstance.isClosed) {
    throw new Error('Realm has not been opened. Call openRealm() from bootstrap.');
  }
  return realmInstance;
}

export async function closeRealm(): Promise<void> {
  if (realmInstance && !realmInstance.isClosed) {
    realmInstance.close();
  }
  realmInstance = null;
}
