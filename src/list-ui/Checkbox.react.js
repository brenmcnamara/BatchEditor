/* @flow */

import * as React from 'react';

import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export type Props = {
  isSelected: boolean,
  onPress: (isSelected: boolean) => void,
};

const MAX_SIZE = 25;
const PRESSED_MIN_TO_MAX_SIZE_RATIO = 0.85;

export default class Checkbox extends React.Component<Props> {
  static SIZE = MAX_SIZE;

  _scale: Animated.Value;
  _color: Animated.Value;

  constructor(props: Props) {
    super(props);
    this._scale = new Animated.Value(1.0);
    this._color = new Animated.Value(1.0);
  }

  render() {
    const rootStyles = [
      {
        transform: [{ scaleX: this._scale }, { scaleY: this._scale }],
      },
      styles.root,
    ];

    return (
      <TouchableWithoutFeedback
        onPress={this._onPress}
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
      >
        <Animated.View style={rootStyles} />
      </TouchableWithoutFeedback>
    );
  }

  _onPress = (): void => {
    this.props.onPress(!this.props.isSelected);
  };

  _onPressIn = (): void => {
    Animated.timing(this._scale, {
      duration: 100,
      toValue: PRESSED_MIN_TO_MAX_SIZE_RATIO,
      useNativeDriver: true,
    }).start();
  };

  _onPressOut = (): void => {
    Animated.timing(this._scale, {
      duration: 100,
      toValue: 1.0,
      useNativeDriver: true,
    }).start();
  };
}

const styles = StyleSheet.create({
  root: {
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 2,
    height: MAX_SIZE,
    width: MAX_SIZE,
  },
});
