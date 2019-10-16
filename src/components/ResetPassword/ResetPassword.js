import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';

import bgImage from '../Login/images/login-bg.jpeg';
import MailResetPassword from '../MailResetPassword/MailResetPassword';

import LoginForm from '../LoginForm/LoginForm';


import styles from './ResetPassword.style';

class ResetPassword extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
    }

    
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>EVENTLY</Text>
                </View>
                <MailResetPassword />
                <View style={styles.signUpContainer}>
                </View>
            </ImageBackground>
        )
    }
}


export default ResetPassword;