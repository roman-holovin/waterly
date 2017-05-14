import * as storage from '../../src/helpers/storage';

import { STORAGE_KEY, INITIAL_STATE } from '../../src/constants';

import { getLocalStorageStub } from '../__mocks__/localStorage';
import { malformed, empty } from '../__fixtures__/consumption';

describe('storage', () => {
  beforeAll(() => {
    global.localStorage = getLocalStorageStub();
  });

  describe('get', () => {
    it('should return empty object on malformed json in localStorage', () => {
      global.localStorage.setFixture(malformed);

      const data = storage.get();
      expect(data).toBe(null);
    });
  });

  describe('initialize', () => {
    it('should properly initialize localStorage with initial value', () => {
      global.localStorage.setFixture(empty);

      storage.initialize();

      const str = global.localStorage.getItem(STORAGE_KEY);
      const data = JSON.parse(str);

      expect(data).toEqual(INITIAL_STATE);
    });
  });
});
