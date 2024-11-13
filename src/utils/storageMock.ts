export class StorageMock {
  storage: {
    [key: string]: any;
  };

  constructor() {
    this.storage = {};
  }

  setItem(key: string, value: any) {
    this.storage[key] = value || "";
  }

  getItem(key: string) {
    return key in this.storage ? this.storage[key] : null;
  }

  removeItem(key: string) {
    delete this.storage[key];
  }

  get length() {
    return Object.keys(this.storage).length;
  }

  key(i: string) {
    var keys = Object.keys(this.storage);
    // @ts-ignore
    return keys[i] || null;
  }
}
