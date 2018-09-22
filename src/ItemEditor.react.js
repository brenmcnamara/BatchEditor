/* @flow */

import * as React from 'react';
import DemoListItem from './DemoListItem.react';
import VerticalList from './list-ui/VerticalList.react';

import type { ContextAPI } from './item-data-model/ItemManager.react';
import type { Item } from './item-data-model/ItemStore';

export type Props = {
  api: ContextAPI,
};

export default class ItemEditor extends React.Component<Props> {
  render() {
    return <VerticalList data={this._getData()} />;
  }

  _getData() {
    const { api } = this.props;
    const selectedItems = api.getSelectedItems();
    return api.getItems().map(item => ({
      height: DemoListItem.HEIGHT,
      key: item.id,
      render: () => (
        <DemoListItem
          isSelected={selectedItems.includes(item)}
          onChangeSelect={(isSelected: boolean) =>
            this._onChangeSelectItem(item, isSelected)
          }
        />
      ),
    }));
  }

  _onChangeSelectItem = (item: Item, isSelected: boolean): void => {
    const { api } = this.props;
    const selectionMap = { [item.id]: isSelected };
    api.changeSelectedItems(selectionMap);
  };
}
