export function getLocalStorageStub() {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    setFixture(fixture) {
      store = Object.assign({}, fixture);
    },
  };
}

