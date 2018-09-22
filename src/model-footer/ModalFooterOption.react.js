/* @flow */

import * as React from 'react';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export type Props = {
  isSelected: boolean,
  onPress: (isSelected: boolean) => void,
};

export default class ModalFooterOption extends React.Component<Props> {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._onPress}
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
      >
        <View style={styles.root} />
      </TouchableWithoutFeedback>
    );
  }

  _onPress = (): void => {};

  _onPressIn = (): void => {};

  _onPressOut = (): void => {};
}

const styles = StyleSheet.create({
  root: {},
});
