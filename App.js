import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Login from './src/components/Login/Login';
import CreateAcc from './src/components/CreateAcc/CreateAcc';
import Homepage from './src/components/Homepage';

const Appstack = createStackNavigator(
  {
    EventOverviewRoute: Homepage,
  },
)

const AuthStack = createStackNavigator (
  {
   LoginRoute: Login, 
   CreateAccRoute: CreateAcc
  },
)

export default createAppContainer(createSwitchNavigator(
  {
    AuthStack: AuthStack,
    AppStackr: Appstack, 
  }
))
