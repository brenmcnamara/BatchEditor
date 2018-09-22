/* @flow */

import * as React from 'react';
import App from './App.react';

import { ItemManagerProvider } from './item-data-model/ItemManager.react';
import { NavigatorIOS } from 'react-native';

export type Props = {};

export default class AppContainer extends React.Component<Props> {
  render() {
    return (
      <ItemManagerProvider>
        <NavigatorIOS
          initialRoute={{ component: App, title: '' }}
          style={{ flex: 1 }}
        />
      </ItemManagerProvider>
    );
  }
}
