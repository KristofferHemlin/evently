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

import styles from './Login.style';

class Login extends Component{
    static navigationOptions = {
        header : null,
      };
    
    render(){
        return(
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                <View style = {styles.logoContainer}>
                    <Text style = {styles.logoText}>EVENTLY</Text>
                </View>
                <LoginForm navigation={this.props.navigation}/>
                <View style={styles.signUpContainer}>
                    {/* <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CreateAccRoute')}>
                        <Text style = {styles.signText}>Don't have an account yet?</Text>
                        <Text style = {styles.signText}>Click here to sign up!</Text>
                    </TouchableOpacity> */}
                </View>

            </ImageBackground>
        )
    }
}


export default Login;