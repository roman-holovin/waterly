import { STORAGE_KEY } from '../constants';

export function get() {
  const data = localStorage.getItem(STORAGE_KEY);
  try {
    const result = JSON.parse(data);
    return result;
  } catch(e) {
    return {};
  }
}

export function set(data) {
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
