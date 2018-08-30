/* @flow */

import AppContainer from './src/AppContainer.react';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppContainer);
