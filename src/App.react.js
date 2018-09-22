/* @flow */

/* eslint-disable max-len */

import * as React from 'react';
import DemoListItem from './DemoListItem.react';
import VerticalList from './list-ui/VerticalList.react';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ItemManagerConsumerHOC } from './item-data-model/ItemManager.react';

import type { ConsumerHOC$Props as ItemManagerContextAPIProps } from './item-data-model/ItemManager.react';

export type Props = ComponentProps & ItemManagerContextAPIProps;

type ComponentProps = {};

class App extends React.Component<Props> {
  componentDidMount(): void {
    this.props.itemManagerAPI.initialize();
  }

  render() {
    const loadState = this.props.itemManagerAPI.getLoadState();
    switch (loadState.type) {
      case 'UNINITIALIZED':
      case 'LOADING': {
        return (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator color="#999" size="small" />
          </View>
        );
      }

      case 'FAILURE': {
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{'Error loading items!'}</Text>
          </View>
        );
      }

      case 'STEADY': {
        return (
          <View style={styles.listContainer}>
            <VerticalList data={this._getData()} />
          </View>
        );
      }
    }
  }

  _getData() {
    return this.props.itemManagerAPI.getItems().map(item => ({
      height: DemoListItem.HEIGHT,
      key: item.id,
      render: () => <DemoListItem />,
    }));
  }
}

const styles = StyleSheet.create({
  error: {
    color: '#CC0000',
  },

  errorContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 40 + 64,
  },

  listContainer: {
    flex: 1,
    paddingTop: 64,
  },

  spinnerContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 40 + 64,
  },
});

export default ItemManagerConsumerHOC(App);
