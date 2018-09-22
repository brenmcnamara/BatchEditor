/* @flow */

import * as React from 'react';
import ListItemAnimation from '../list-ui/ListItemAnimation.react';

import { FlatList } from 'react-native';

export type ListItem = {
  height: number,
  key: string,
  render: () => React.Element<*>,
};

export type Props = {
  data: Array<ListItem>,
};

type State = {
  data: Array<EditStatus<ListItem>>,
};

type EditStatus<T> = {|
  +key: string,
  +type: 'DELETING' | 'SHOWING',
  +value: T,
|};

export default class VerticalList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: this.props.data.map(data => ({
        key: data.key,
        type: 'SHOWING',
        value: data,
      })),
    };
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        getItemLayout={this._getItemLayout}
        renderItem={this._renderItem}
      />
    );
  }

  _getItemLayout = (data: ?Array<EditStatus<ListItem>>, index: number) => {
    if (!data) {
      return { length: 0, offset: 0, index };
    }

    // TODO: Assuming all list items have the same height in this call.
    return {
      length: data[index].value.height,
      offset: data[index].value.height * index,
      index,
    };
  };

  _renderItem = (payload: *) => {
    const listItem: EditStatus<ListItem> = payload.item;
    return <ListItemAnimation>{listItem.value.render()}</ListItemAnimation>;
  };
}
