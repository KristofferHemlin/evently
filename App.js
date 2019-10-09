import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Login from './src/components/Login/Login';
import CreateAcc from './src/components/CreateAcc/CreateAcc';
import EventOverview from './src/components/EventOverview/EventOverview';
import UserProfile from './src/components/UserProfile/UserProfile';
import ChangeUserProfile from './src/components/ChangeUserProfile/ChangeUserProfile';
import ChangeInfo from './src/components/ChangeInfo/ChangeInfo';
import ShowParticipants from './src/components/ShowParticipants/ShowParticipants'
import ActivityOverview from './src/components/ActivityOverview/ActivityOverview'

import Calendar from './src/components/Calendar/Calendar';

const Appstack = createStackNavigator(
  {
    EventOverviewRoute: EventOverview,
    CalendarRoute: Calendar,
    ActivityOverviewRoute: ActivityOverview,
    ShowParticipantsRoute: ShowParticipants,
    UserProfileRoute: UserProfile,
    ChangeUserProfileRoute: ChangeUserProfile,
    ChangeInfoRoute: ChangeInfo
  }
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

