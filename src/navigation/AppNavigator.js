import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../components/Login/Login';
import CreateAcc from '../components/CreateAcc/CreateAcc';
import EventOverview from '../components/EventOverview/EventOverview';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import UserProfile from '../components/UserProfile/UserProfile';
import ParticipantOverview from '../components/ParticipantOverview/ParticipantOverview';
import ChangeInfo from '../components/ChangeInfo/ChangeInfo';
import ShowParticipants from '../components/ShowParticipants/ShowParticipants'
import ActivityOverview from '../components/ActivityOverview/ActivityOverview'
import Calendar from '../components/Calendar/Calendar';



const Appstack = createStackNavigator(
  {
    EventOverviewRoute: EventOverview,
    ShowParticipantsRoute: ShowParticipants,
    ParticipantOverviewRute: ParticipantOverview,
    CalendarRoute: Calendar,
    ActivityOverviewRoute: ActivityOverview,
    ChangeInfoRoute: ChangeInfo,
    UserProfileRoute: UserProfile,
    
  }
)

const AuthStack = createStackNavigator(
  {
    ChangeInfoRoute: ChangeInfo,
    LoginRoute: Login,
    CreateAccRoute: CreateAcc,
    ResetPasswordRoute: ResetPassword,
  },
)

export default createAppContainer(createSwitchNavigator(
  {
    AuthStack: AuthStack,
    AppStackr: Appstack,
  }
))