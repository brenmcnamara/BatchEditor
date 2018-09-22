/* @flow */

import uuid from 'uuid/v4';

import {
  LOADING_LOAD_STATE,
  STEADY_LOAD_STATE,
  UNINITIALIZED_LOAD_STATE,
} from './LoadState';

import type { LoadState } from './LoadState';

export type Item = {|
  +id: string,
|};

export type Subscription = {
  remove: () => void,
};

class ItemStore {
  _changeCallbacks: Array<() => void> = [];
  _items: Array<Item> = [];
  _initializationLoadState: LoadState = UNINITIALIZED_LOAD_STATE;

  get items(): Array<Item> {
    return this._items;
  }

  get initializationLoadState(): LoadState {
    return this._initializationLoadState;
  }

  getItem(id: string): Item | null {
    return this._items.find(item => item.id === id) || null;
  }

  onChange(cb: () => void): Subscription {
    this._changeCallbacks.push(cb);
    return {
      remove: () => {
        const index = this._changeCallbacks.indexOf(cb);
        if (index >= 0) {
          this._changeCallbacks.splice(index, 1);
        }
      },
    };
  }

  async genInitialize(): Promise<void> {
    if (this._initializationLoadState !== UNINITIALIZED_LOAD_STATE) {
      return; // Already initialized.
    }

    this._initializationLoadState = LOADING_LOAD_STATE;
    this._publish();

    // Simulate a network request.
    await sleepForMillis(3000);

    // Create items and publish change.
    const items = [];
    for (let i = 0; i < 20; ++i) {
      items.push({ id: uuid() });
    }

    this._initializationLoadState = STEADY_LOAD_STATE;
    this._items = items;
    this._publish();
  }

  async genUpdateItems(items: Array<Item>): Promise<void> {
    await sleepForMillis(3000);

    if (items.some(item => !this._items.find(_item => item.id === _item.id))) {
      throw Error('Trying to delete an unrecognized item');
    }

    this._items = this._items.map(item => {
      const updatedItem = items.find(_item => item.id === _item.id);
      return updatedItem || item;
    });

    this._publish();
  }

  async genDeleteItems(items: Array<Item>): Promise<void> {
    await sleepForMillis(3000);

    if (items.some(item => !this._items.includes(item))) {
      throw Error('Trying to delete an unrecognized item');
    }

    this._items = this._items.filter(item => !items.includes(item));
    this._publish();
  }

  _publish() {
    this._changeCallbacks.forEach(cb => cb());
  }
}

export default new ItemStore();

// -----------------------------------------------------------------------------
//
// UTILITIES
//
// -----------------------------------------------------------------------------

function sleepForMillis(millis: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, millis);
  });
}
