import React, { Component } from 'react';
import {
    StyleSheet, 
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
} from 'react-native';

import bgImage from '../../../images/login-bg.png';

import LoginForm from '../LoginForm/LoginForm';
import ForgotPassword from '../MailResetPassword/MailResetPassword';

import styles from './Login.style';

class Login extends Component{
    static navigationOptions = {
        header : null,
      };

      state = {
          forgottenPassword: true,
      }

      lostPasswordHandler = () => {
          let forgottenPassword = this.state.forgottenPassword
          this.setState({forgottenPassword: !forgottenPassword})
          console.log("Click!!")
      }
    
    render(){
        return(
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                <View style = {styles.logoContainer}>
                    <Text style = {styles.logoText}>EVENTLY</Text>
                </View>
                {this.state.forgottenPassword  ? <ForgotPassword/> : <LoginForm navigation={this.props.navigation}/>}    
                <View style={styles.signUpContainer}>
                    {/* <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CreateAccRoute')}>
                        <Text style = {styles.signText}>Don't have an account yet?</Text>
                        <Text style = {styles.signText}>Click here to sign up!</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        onPress={this.lostPasswordHandler}>
                        {this.state.forgottenPassword ? <Text style = {styles.signText}>Go back</Text> : <Text style = {styles.signText}>Forgotten your password?</Text>}                        
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}


export default Login;