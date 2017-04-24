import format from 'date-fns/format';
import { STORAGE_KEY, DATE_KEY_FORMAT } from '../../src/constants';

export const empty = {
  [STORAGE_KEY]: null,
};

export const malformed = {
  [STORAGE_KEY]: 'malformed JSON',
};

export const initial = {
  [STORAGE_KEY]: JSON.stringify({
    version: 1,
    drinks: ['water', 'tea'],
    consumption: {},
  }),
};

const today = format(Date.now(), DATE_KEY_FORMAT);
export const oneDay = {
  [STORAGE_KEY]: JSON.stringify({
    version: 1,
    drinks: ['water', 'tea'],
    consumption: {
      [today]: [{
        type: 'water',
        amount: 0.3,
      }, {
        type: 'tea',
        amount: 0.5,
      }],
    },
  }),
}
