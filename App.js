import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Login from './src/components/Login/Login';
import CreateAcc from './src/components/CreateAcc/CreateAcc';
import EventOverview from './src/components/EventOverview/EventOverview';
import ResetPassword from './src/components/ResetPassword/ResetPassword'


// const Appstack = createStackNavigator(
//   {
//     EventOverviewRoute:{ 
//       screen: EventOverview,
//       path: 'eventoverview',
//     }
    
//   },
// )



const AuthStack = createStackNavigator(
  {
    LoginRoute: {
      screen: Login,
    },
    ResetPasswordRoute: {
      screen: ResetPassword,
    },
    CreateAccRoute:{
      screen: CreateAcc,
    } 
  },
)



// const prefix = 'evently://evently/';
const App = createAppContainer(AuthStack)
// const MainApp = () => <App uriPrefix={prefix} />;
export default App;

// export default createAppContainer(createSwitchNavigator(
//   {
//     AuthStack: {
//       screen: AuthStack,
//       path: 'auth',
//     },
//     // AppStack: {
//     //   screen: Appstack,
//     //   path: 'app'
//     // } 
//   }
// ))

