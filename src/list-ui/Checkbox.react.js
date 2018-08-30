/* @flow */

import * as React from 'react';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export type Props = {};

export default class Checkbox extends React.Component<Props> {
  render() {
    return <View style={styles.root} />;
  }
}

const styles = StyleSheet.create({
  root: {},
});
