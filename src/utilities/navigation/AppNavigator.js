import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../../containers/LoginPage/LoginPage';
import CreateAccountPage from '../../containers/CreateAccountPage/CreateAccountPage';
import EventPage from '../../containers/EventPage/EventPage';
import ResetPasswordPage from '../../containers/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../containers/ProfilePage/ProfilePage';
import UserPage from '../../containers/UserPage/UserPage';
import ChangeInfoPage from '../../containers/ChangeInfoPage/ChangeInfoPage';
import ShowParticipantsPage from '../../containers/ShowParticipantsPage/ShowParticipantsPage'
import ActivityPage from '../../containers/ActivityPage/ActivityPage'
import CalendarPage from '../../containers/CalendarPage/CalendarPage';



const Appstack = createStackNavigator(
  {
    EventPageRoute: EventPage,
    ShowParticipantsRoute: ShowParticipantsPage,
    UserPageRoute: UserPage,
    CalendarRoute: CalendarPage,
    ActivityOverviewRoute: ActivityPage,
    ChangeInfoRoute: ChangeInfoPage,
    ProfilePageRoute: ProfilePage,
    
  }
)

const AuthStack = createStackNavigator(
  {
    LoginRoute: Login,
    CreateAccountPageRoute: CreateAccountPage,
    ResetPasswordRoute: ResetPasswordPage,
  },
)

export default createAppContainer(createSwitchNavigator(
  {
    AuthStack: AuthStack,
    AppStackr: Appstack,
  }
))