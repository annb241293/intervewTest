/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RootComponent from "./src/RootComponent";
import { Provider } from 'react-redux';
import store from './src/common/Store'

const App = () => {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
};


export default App;