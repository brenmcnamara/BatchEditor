/* @flow */

import * as React from 'react';
import Checkbox from './Checkbox.react';

import { StyleSheet, View } from 'react-native';

export type Props = {
  children: *,
  isSelected: boolean,
};

export default class SelectableItem extends React.Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.checkboxContainer}>
          <Checkbox isSelected={this.props.isSelected} onPress={() => {}} />
        </View>
        <View>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },

  root: {
    flexDirection: 'row',
  },
});
