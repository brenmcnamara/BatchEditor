/* @flow */

/* eslint-disable max-len */

import * as React from 'react';
import ItemEditor from './ItemEditor.react';

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
            <ItemEditor api={this.props.itemManagerAPI} />
          </View>
        );
      }
    }
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
