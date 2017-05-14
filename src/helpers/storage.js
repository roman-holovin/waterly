import { STORAGE_KEY, INITIAL_STATE } from '../constants';

export function get() {
  const data = localStorage.getItem(STORAGE_KEY);
  try {
    const result = JSON.parse(data);
    return result;
  } catch (e) {
    return null;
  }
}

export function set(data) {
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function initialize() {
  const data = get();

  if (!data) {
    set(INITIAL_STATE);
  }
}
