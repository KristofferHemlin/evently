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


import styles from './ResetPassword.style';

class ResetPassword extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        token: this.props.navigation.getParam('deepLinkToken', ''),
    }

    
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                 <View style={styles.logoContainer}>
                    <Image style={styles.logotype} source={logotype}/>
                    <Text style={styles.logoText}>Eventapp</Text>
                </View>
                <ResetPasswordForm fromLoginScreen={false} deepLinkToken={this.state.deepLinkToken}/>
                <View style={styles.signUpContainer}>
                </View>
            </ImageBackground>
        )
    }
}


export default ResetPassword;