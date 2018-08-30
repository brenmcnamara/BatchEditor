/* @flow */

import * as React from 'react';
import Checkbox from './Checkbox.react';

import { StyleSheet, View } from 'react-native';

export type Props = {
  children: React.ChildrenArray<*>,
};

export default class SelectableItem extends React.Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.checkboxContainer}>
          <Checkbox />
        </View>
        <View>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 60,
  },

  root: {
    flexDirection: 'row',
  },
});
