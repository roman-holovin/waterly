import * as storage from '../../src/helpers/storage';

import { getLocalStorageStub } from '../__mocks__/localStorage';
import { malformed } from '../__fixtures__/consumption';

describe('storage', () => {
  describe('get', () => {
    beforeAll(() => {
      global.localStorage = getLocalStorageStub();
    })

    it('should return empty object on malformed json in localStorage', () => {
      global.localStorage.setFixture(malformed);

      const data = storage.get();
      expect(data).toEqual({});
    })
  })
})
