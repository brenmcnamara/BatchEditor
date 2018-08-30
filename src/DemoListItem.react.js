/* @flow */

import * as React from 'react';
import SelectableListItem from './list-ui/SelectableListItem.react';

import { StyleSheet, View } from 'react-native';

export type Props = {};

const HEIGHT = 60;

export default class DemoListItem extends React.Component<Props> {
  static HEIGHT = HEIGHT;

  render() {
    return (
      <View style={styles.root}>
        <SelectableListItem>
          <View style={styles.row1} />
          <View style={styles.row2} />
        </SelectableListItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
    height: HEIGHT,
    justifyContent: 'center',
  },

  row1: {
    backgroundColor: '#CCC',
    height: 20,
    marginBottom: 8,
    width: 300,
  },

  row2: {
    backgroundColor: '#DDD',
    height: 14,
    width: 200,
  },
});
