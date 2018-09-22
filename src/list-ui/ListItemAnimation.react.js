/* @flow */

import * as React from 'react';

import { Animated } from 'react-native';

export type Props = {
  children: React.ChildrenArray<*>,
};

export default class ListAnimation extends React.Component<Props> {
  render() {
    return <Animated.View>{this.props.children}</Animated.View>;
  }
}
