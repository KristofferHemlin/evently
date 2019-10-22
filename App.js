
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import dataReducer from './src/store/reducers/dataReducer';
import AppNavigator from './src/navigation/AppNavigator';

const store = createStore(dataReducer);

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
