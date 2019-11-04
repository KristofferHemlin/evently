
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import store from './src/utilities/store/store';
import './src/utilities/interceptors/interceptors';
import AppNavigator from './src/utilities/navigation/AppNavigator';
import NavigationService from './src/utilities/navigation/NavigationService';




class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    )
  }
}

export default App;
