import format from 'date-fns/format';
import { STORAGE_KEY, DATE_KEY_FORMAT, INITIAL_STATE } from '../../src/constants';

export const empty = {
  [STORAGE_KEY]: null,
};

export const malformed = {
  [STORAGE_KEY]: 'malformed JSON',
};

export const initial = {
  [STORAGE_KEY]: JSON.stringify(INITIAL_STATE),
};

export const defaultDateInPast = new Date(2017, 3, 22);
export const defaultDateNow = new Date(2017, 3, 24);

const dateKey = format(defaultDateNow, DATE_KEY_FORMAT);
export const oneDay = {
  [STORAGE_KEY]: JSON.stringify(
    Object.assign(
      {},
      INITIAL_STATE,
      {
        consumption: {
          [dateKey]: [{
            type: 'water',
            amount: 0.3,
          }, {
            type: 'tea',
            amount: 0.5,
          }],
        },
      }
    )
  ),
}
