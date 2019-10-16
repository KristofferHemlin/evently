import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    Linking,
    Image,
} from 'react-native';

import bgImage from './images/login-bg.jpeg';
import logotype from './images/Logotype.png';

import LoginForm from '../LoginForm/LoginForm';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';

import styles from './Login.style';

class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(properties) {
        super(properties);

        this.state = {
        }
    }


    componentDidMount() {
        // deep linking stuff
        console.log('componentDidMount');
        Linking.addEventListener('url', this.handleOpenURL)
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleOpenURL({ url });
            }
        })

    }

    componentWillUnmount() {
        // deep linking stuff
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        console.log('handleOpenURL');
        this.navigate(event.url)
        
    }

    // deep linking stuff
    navigate = (url) => {
        const { navigate } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');
        const routeName = route.split('/')[0];
        const token = route.split('/')[1]

        if (routeName === 'resetpassword') {
            navigate('ResetPasswordRoute', {
                token: token
            })
        }
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    lostPasswordHandler = () => {
        let forgottenPassword = this.state.forgottenPassword
        this.setState({ forgottenPassword: !forgottenPassword })
        console.log("Click!!")
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logotype} source={logotype}/>
                    <Text style={styles.logoText}>Eventapp</Text>
                </View>
                {this.state.forgottenPassword ? <ResetPasswordForm fromLoginScreen={true}/>: <LoginForm navigation={this.props.navigation} />}
                <View style={styles.signUpContainer}>
                    <TouchableOpacity
                        onPress={this.lostPasswordHandler}>
                        {this.state.forgottenPassword ? <Text style={styles.signText}>Go back</Text> : <Text style={styles.signText}>Forgotten your password?</Text>}
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        )
    }
}


export default Login;