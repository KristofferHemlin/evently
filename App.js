
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import dataReducer from './src/store/reducers/dataReducer';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen'

const store = createStore(dataReducer);

class App extends Component {

  componentDidMount() {
      SplashScreen.hide();
  }
  
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App;
