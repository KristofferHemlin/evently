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
                    {/* <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CreateAccRoute')}>
                        <Text style = {styles.signText}>Don't have an account yet?</Text>
                        <Text style = {styles.signText}>Click here to sign up!</Text>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity
                        onPress={this.lostPasswordHandler}>
                        {this.state.forgottenPassword ? <Text style = {styles.signText}>Go back</Text> : <Text style = {styles.signText}>Forgotten your password?</Text>}                        
                    </TouchableOpacity> */}
                </View>

            </ImageBackground>
        )
    }
}


export default ResetPassword;