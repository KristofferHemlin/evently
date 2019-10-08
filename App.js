import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Login from './src/components/Login/Login';
import CreateAcc from './src/components/CreateAcc/CreateAcc';
import EventOverview from './src/components/EventOverview/EventOverview';
import ResetPassword from './src/components/ResetPassword/ResetPassword'

const Appstack = createStackNavigator(
  {
    EventOverviewRoute: EventOverview,
    
  },
)

const AuthStack = createStackNavigator(
  {
    ResetPasswordRoute: {
      screen: ResetPassword,
      path: 'ResetPassword'
    },
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

