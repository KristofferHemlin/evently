import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Login from './src/components/Login/Login';
import CreateAcc from './src/components/CreateAcc/CreateAcc';
import EventOverview from './src/components/EventOverview/EventOverview';
import UserProfile from './src/components/UserProfile/UserProfile';
import ChangeUserProfile from './src/components/ChangeUserProfile/ChangeUserProfile';

import Calendar from './src/components/Calendar/Calendar';

const Appstack = createStackNavigator(
  {
    EventOverviewRoute: EventOverview,
    CalendarRoute: Calendar,
    UserProfileRoute: UserProfile,
    ChangeUserProfileRoute: ChangeUserProfile,
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

