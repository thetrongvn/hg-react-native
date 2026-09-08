jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(async () => true),
  getGenericPassword: jest.fn(async () => false),
  resetGenericPassword: jest.fn(async () => true),
}));

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    API_BASE_URL: 'https://example.test',
    API_NAMESPACE: 'v1',
    DB_VERSION: '1',
  },
}));

jest.mock('react-native-localize', () => ({
  findBestLanguageTag: () => ({languageTag: 'en', isRTL: false}),
  getLocales: () => [{languageTag: 'en', isRTL: false}],
}));

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@utils/keyChain', () => ({
  KEYCHAIN_KEYS: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    sessionUser: 'sessionUser',
  },
  setSecureValue: jest.fn(async () => true),
  getSecureValue: jest.fn(async () => null),
  removeSecureValue: jest.fn(async () => true),
  clearSessionSecrets: jest.fn(async () => undefined),
}));

jest.mock('realm', () => {
  class RealmObject {}
  class ObjectId {}
  class Realm {
    static Object = RealmObject;
    static BSON = {ObjectId};
    static open = jest.fn(async () => new Realm());
    isClosed = false;
    objects() {
      return {isEmpty: () => true, at: () => undefined};
    }
    write(fn) {
      fn();
    }
    create() {}
    close() {}
  }
  return {__esModule: true, default: Realm};
});

