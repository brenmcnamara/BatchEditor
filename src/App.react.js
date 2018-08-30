/* @flow */

import * as React from 'react';
import DemoListItem from './DemoListItem.react';
import VerticalList from './list-ui/VerticalList.react';

export type Props = {};

export default class App extends React.Component<Props> {
  render() {
    return <VerticalList data={this._getData()} />;
  }

  _getData() {
    return [
      {
        height: DemoListItem.HEIGHT,
        key: '1',
        render: () => <DemoListItem />,
      },
      {
        height: DemoListItem.HEIGHT,
        key: '2',
        render: () => <DemoListItem />,
      },
      {
        height: DemoListItem.HEIGHT,
        key: '3',
        render: () => <DemoListItem />,
      },
      {
        height: DemoListItem.HEIGHT,
        key: '4',
        render: () => <DemoListItem />,
      },
      {
        height: DemoListItem.HEIGHT,
        key: '5',
        render: () => <DemoListItem />,
      },
      {
        height: DemoListItem.HEIGHT,
        key: '6',
        render: () => <DemoListItem />,
      },
      {
        height: DemoListItem.HEIGHT,
        key: '7',
        render: () => <DemoListItem />,
      },
    ];
  }
}
