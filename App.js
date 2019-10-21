
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import idReducer from './src/store/reducers/idReducer';
import AppNavigator from './src/navigation/AppNavigator';

const store = createStore(idReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App;
