import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    Image,
    Linking,
} from 'react-native';

import bgImage from '../../images/login-bg.jpg';
import logotype from '../../images/Logotype.png';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';


import styles from './ResetPasswordPage.style';

class ResetPasswordPage extends Component {
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


export default ResetPasswordPage;