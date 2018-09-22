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
    this._color = new Animated.Value(props.isSelected ? 1.0 : 0.0);
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (this.props.isSelected !== nextProps.isSelected) {
      Animated.timing(this._color, {
        duration: 200,
        toValue: nextProps.isSelected ? 1.0 : 0.0,
      }).start();
    }
  }

  render() {
    const rootStyles = [
      {
        transform: [{ scaleX: this._scale }, { scaleY: this._scale }],
      },
      styles.root,
    ];

    const backgroundStyles = [
      {
        backgroundColor: this._color.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgb(255, 255, 255)', 'rgb(70, 151, 247)'],
        }),
        borderColor: this._color.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgb(221, 221, 221)', 'rgb(70, 151, 247)'],
        }),
      },
      styles.background,
    ];
    return (
      <TouchableWithoutFeedback
        onPress={this._onPress}
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
      >
        <Animated.View style={rootStyles}>
          <Animated.View style={backgroundStyles} />
        </Animated.View>
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
  background: {
    borderWidth: 1,
    borderRadius: 2,
    flex: 1,
  },

  root: {
    height: MAX_SIZE,
    width: MAX_SIZE,
  },
});
