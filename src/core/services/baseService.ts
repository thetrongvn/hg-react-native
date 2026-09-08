import Realm from 'realm';

class BaseService {
  protected realm: Realm;

  constructor(realm: Realm) {
    this.realm = realm;
  }
}

export default BaseService;
