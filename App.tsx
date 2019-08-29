/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  View,
} from 'react-native';
import { Navigator } from './Navigator';
import { reactNavigationManager } from './core/navigation/navigationContainer';


const App = () => {
  return (
    <View style={{flex: 1}}>
      <Navigator ref={(ref: any) => reactNavigationManager.setRouterRef(ref)} />
    </View>
  );
};

export default App;
