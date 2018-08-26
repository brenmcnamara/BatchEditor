/* @flow */

import * as React from 'react';

export type Props = {
  children: React.ChildrenArray<*>,
};

export default class ListAnimation extends React.Component<Props> {
  render() {
    return (
      <Animated.View>
        {this.props.children}
      </Animated.View>
    );
  }
}
