import Realm from 'realm';

class AppSettings extends Realm.Object<AppSettings> {
  _id!: Realm.BSON.ObjectId;
  version!: string;
  locale!: string;
  appearance!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static generate(version: string, locale: string, appearance: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      version,
      locale,
      appearance,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static schema: Realm.ObjectSchema = {
    name: 'AppSettings',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      version: 'string',
      locale: {type: 'string', default: 'en'},
      appearance: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}

export default AppSettings;
