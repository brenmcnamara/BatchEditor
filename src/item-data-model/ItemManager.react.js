/* @flow */

import * as React from 'react';
import ItemStore from './ItemStore';

import invariant from 'invariant';

import type { Item } from './ItemStore';
import type { LoadState } from './LoadState';

export type Consumer$Props = {
  children: ContextAPI => React.Element<*>,
};

export type ConsumerHOC$Props = {
  itemManagerAPI: ContextAPI,
};

export type Provider$Props = {
  children: *,
};

export type ItemSelectionMap = { [id: string]: boolean };

export type ContextAPI = {|
  +changeSelectedItems: (selectionMap: ItemSelectionMap) => void,
  +deleteItems: (items: Array<Item>) => void,
  +getItems: () => Array<Item>,
  +getLoadState: () => LoadState,
  +getSelectedItems: () => Array<Item>,
  +initialize: () => void,
  +updateItems: (items: Array<Item>) => void,
|};

const DEFAULT_CONTEXT_PROPS: ContextAPI = {
  changeSelectedItems: FAIL_BECAUSE_ITEM_STORE_NOT_INITIALIZATED,
  deleteItems: FAIL_BECAUSE_ITEM_STORE_NOT_INITIALIZATED,
  getItems: FAIL_BECAUSE_ITEM_STORE_NOT_INITIALIZATED,
  getLoadState: () => ItemStore.initializationLoadState,
  getSelectedItems: FAIL_BECAUSE_ITEM_STORE_NOT_INITIALIZATED,
  initialize: FAIL_BECAUSE_ITEM_STORE_NOT_INITIALIZATED,
  updateItems: FAIL_BECAUSE_ITEM_STORE_NOT_INITIALIZATED,
};

type Provider$State = {
  items: Array<Item>,
  loadState: LoadState,
  selectionMap: ItemSelectionMap,
};

const { Consumer: ConsumerImpl, Provider: ProviderImpl } = React.createContext(
  DEFAULT_CONTEXT_PROPS,
);

export class ItemManagerConsumer extends React.Component<Consumer$Props> {
  render() {
    return <ConsumerImpl>{this.props.children}</ConsumerImpl>;
  }
}

export function ItemManagerConsumerHOC<TComponentProps: Object>(
  Component: React.ComponentType<TComponentProps & ConsumerHOC$Props>,
): React.ComponentType<TComponentProps> {
  return (props: TComponentProps) => {
    return (
      <ItemManagerConsumer>
        {itemManagerAPI => (
          <Component {...props} itemManagerAPI={itemManagerAPI} />
        )}
      </ItemManagerConsumer>
    );
  };
}

export class ItemManagerProvider extends React.Component<
  Provider$Props,
  Provider$State,
> {
  state: Provider$State = {
    items: ItemStore.items,
    loadState: ItemStore.initializationLoadState,
    selectionMap: {},
  };

  render() {
    return (
      <ProviderImpl value={this._getValue()}>
        {this.props.children}
      </ProviderImpl>
    );
  }

  // ---------------------------------------------------------------------------
  //
  // INITIALIZATION
  //
  // ---------------------------------------------------------------------------

  componentDidMount(): void {
    ItemStore.onChange(this._onChangeStore);

    this.setState({
      items: ItemStore.items,
      loadState: ItemStore.initializationLoadState,
    });
  }

  // ---------------------------------------------------------------------------
  //
  // EVENTS
  //
  // ---------------------------------------------------------------------------

  _onChangeStore = (): void => {
    this.setState({
      items: ItemStore.items,
      loadState: ItemStore.initializationLoadState,
    });
  };

  // ---------------------------------------------------------------------------
  //
  // CONTEXT INTERFACE
  //
  // ---------------------------------------------------------------------------

  _getValue(): ContextAPI {
    return {
      changeSelectedItems: this._changeSelectedItems,
      deleteItems: this._deleteItems,
      getItems: this._getItems,
      getLoadState: this._getLoadState,
      getSelectedItems: this._getSelectedItems,
      initialize: this._initialize,
      updateItems: this._updateItems,
    };
  }

  _changeSelectedItems = (deltaSelectionMap: ItemSelectionMap): void => {
    const selectionMap = { ...this.state.selectionMap };
    Object.keys(deltaSelectionMap).forEach(itemID => {
      if (deltaSelectionMap[itemID]) {
        selectionMap[itemID] = true;
      } else {
        delete selectionMap[itemID];
      }
    });

    this.setState({ selectionMap });
  };

  _deleteItems = (items: Array<Item>): void => {
    ItemStore.genDeleteItems(items);
  };

  _getItems = (): Array<Item> => {
    return this.state.items;
  };

  _getLoadState = (): LoadState => {
    return this.state.loadState;
  };

  _getSelectedItems = (): Array<Item> => {
    return this.state.items.filter(item => this.state.selectionMap[item.id]);
  };

  _initialize = (): void => {
    ItemStore.genInitialize();
  };

  _updateItems = (items: Array<Item>): void => {
    ItemStore.genUpdateItems(items);
  };
}

// -----------------------------------------------------------------------------
//
// UTILITIES
//
// -----------------------------------------------------------------------------

function FAIL_BECAUSE_ITEM_STORE_NOT_INITIALIZATED() {
  return invariant(false, 'ItemStore must be initialized');
}
