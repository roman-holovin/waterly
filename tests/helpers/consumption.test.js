import format from 'date-fns/format';

import * as consumption from '../../src/helpers/consumption';

import { STORAGE_KEY, DATE_KEY_FORMAT } from '../../src/constants';

import { getLocalStorageStub } from '../__mocks__/localStorage';
import {
  initial,
  oneDay,
  defaultDateNow,
  defaultDateInPast
} from '../__fixtures__/consumption';

describe('consumption', () => {
  beforeAll(() => {
    global.localStorage = getLocalStorageStub();
  });

  afterEach(() => {
    global.localStorage.clear();
  });

  describe('get consumption', () => {
    it('should return data for 3 days if called without params', () => {
      global.localStorage.setFixture(oneDay);

      const entries = consumption.get({
        from: defaultDateInPast,
        to: defaultDateNow,
      });
      expect(entries).toMatchSnapshot();
    });

    it('should throw if "from" date is greater than "to"', () => {
      const assumption = () => consumption.get({
        from: new Date(2017, 3, 24),
        to: new Date(2017, 3, 22),
      });

      expect(assumption).toThrowErrorMatchingSnapshot();
    });
  });

  describe('add consumption', () => {
    it('should add entry', () => {
      global.localStorage.setFixture(oneDay);

      const testEntry = {
        type: 'tea',
        amount: 0.5,
      };

      consumption.add({ value: testEntry });

      const todayKey = format(defaultDateNow, DATE_KEY_FORMAT);

      const str = global.localStorage.getItem(STORAGE_KEY);
      const data = JSON.parse(str);

      const consumptionEntries = data.consumption[todayKey];
      const lastEntry = consumptionEntries[consumptionEntries.length - 1];

      expect(lastEntry).toEqual(testEntry);
    });

    it('should throw if no value provided', () => {
      const assumption = () => consumption.add();
      expect(assumption).toThrowErrorMatchingSnapshot();
    });
  });

  describe('remove consumption', () => {
    it('should remove entry', () => {
      global.localStorage.setFixture(oneDay);

      consumption.remove({
        date: defaultDateNow,
        index: 0,
      });

      const str = global.localStorage.getItem(STORAGE_KEY);
      const data = JSON.parse(str);

      const todayKey = format(defaultDateNow, DATE_KEY_FORMAT);

      const consumptionEntries = data.consumption[todayKey];
      expect(consumptionEntries).toHaveLength(1);
      expect(consumptionEntries).toMatchSnapshot();
    });

    it('should throw if no index provided', () => {
      const assumption = () => consumption.remove();
      expect(assumption).toThrowErrorMatchingSnapshot();
    });
  });
})
