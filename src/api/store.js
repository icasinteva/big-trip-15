class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems(itemsType) {
    try {
      return JSON.parse(this._storage.getItem(`${this._storeKey}_${itemsType}`)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items, itemsType) {
    this._storage.setItem(
      `${this._storeKey}_${itemsType}`,
      JSON.stringify(items),
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(
        Object.assign({}, store, {
          [key]: value,
        }),
      ),
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(store),
    );
  }
}

export default Store;
