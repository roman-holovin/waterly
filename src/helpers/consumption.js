import subDays from 'date-fns/sub_days';
import eachDay from 'date-fns/each_day';
import isAfter from 'date-fns/is_after';
import format from 'date-fns/format';

import { DATE_KEY_FORMAT } from '../constants';

import * as storage from './storage';

export function get({
  from = subDays(Date.now(), 2),
  to = Date.now(),
} = {}) {
  if (isAfter(from, to)) {
    throw new Error('"From" date should be before "to" date')
  }

  const data = storage.get();

  const range = eachDay(from, to);
  const keys = range.map(date => format(date, DATE_KEY_FORMAT))

  const result = keys.reduce((acc, key) => {
    acc[key] = data.consumption[key] || [];
    return acc;
  }, {});

  return result;
}

export function add({
  date = Date.now(),
  value,
} = {}) {
  if (!value) { throw new Error('No value provived'); }

  const data = storage.get();
  const key = format(date, DATE_KEY_FORMAT);

  const consumption = data.consumption[key] || [];
  consumption.push(value);

  data.consumption[key] = consumption;

  storage.set(data);
}

export function remove({ date = Date.now(), index } = {}) {
  if (typeof index === 'undefined') { throw new Error('No index provived'); }

  const data = storage.get();
  const key = format(date, DATE_KEY_FORMAT);

  const consumption = data.consumption[key] || [];
  const editedConsumption = [].concat(consumption.slice(0, index), consumption.slice(index + 1));
  data.consumption[key] = editedConsumption;

  storage.set(data);
}
