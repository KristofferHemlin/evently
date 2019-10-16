import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    Image,
    Linking,
} from 'react-native';

import bgImage from '../Login/images/login-bg.jpeg';
import logotype from '../Login/images/Logotype.png';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';

import LoginForm from '../LoginForm/LoginForm';


import styles from './ResetPassword.style';

class ResetPassword extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        token: this.props.navigation.getParam('token', ''),
    }

    
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                 <View style={styles.logoContainer}>
                    <Image style={styles.logotype} source={logotype}/>
                    <Text style={styles.logoText}>Eventapp</Text>
                </View>
                <ResetPasswordForm fromLoginScreen={false} token={this.state.token}/>
                <View style={styles.signUpContainer}>
                </View>
            </ImageBackground>
        )
    }
}


export default ResetPassword;