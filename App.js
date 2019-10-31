
import React, { Component } from 'react';

import NavigationService from './src/navigation/NavigationService';
import { Provider } from 'react-redux';
import store from './src/store/store';

import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

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
