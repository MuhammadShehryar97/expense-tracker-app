import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {enableLatestRenderer} from 'react-native-maps';

import { persistor, store } from './core/redux/store';
import RootNavigator from './navigators/root.navigator';

enableLatestRenderer();

// @ts-ignore
navigator.geolocation = require('@react-native-community/geolocation');

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;