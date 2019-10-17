import React, { Component } from 'react';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Dimensions } from 'react-native';
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
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';

class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(properties) {
        super(properties);

        this.state = {
            messageColor: null,
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

    showToasterHandler = (toasterResponse, success) => {
        if(success === true){
            this.setState({ messageColor: "#4a90e2" })
        } else{
            console.log("failed");
            this.setState({ messageColor: "#e24a4a" })
        }
        let errorString = String(toasterResponse);
        this.refs.toast.show(errorString, 1500);
    }

    messageColor = (color) => {
        console.log("messageColor: ", color);
        return {
            backgroundColor: color,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: Dimensions.get('window').width,
            height: 100,
        }
      }

    render() {
        // let messageColor = this.state.messageColor;
        // console.log("messageColor: ", this.state.messageColor);
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>

                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={this.messageColor(this.state.messageColor)}
                        // style={toasterStyle.successMessage}
                        // style={this.toasterStyle(messageColor)} 
                        // {true ? style={toasterStyle.successMessage} : style={toasterStyle.errorMessage}}
                        // style={toasterStyle.errorMessage}
                        position='top' />
                </View>

                <View style={styles.logoContainer}>
                    <Image style={styles.logotype} source={logotype} />
                    <Text style={styles.logoText}>Eventapp</Text>
                </View>
                {this.state.forgottenPassword ? <ResetPasswordForm fromLoginScreen={true} showToasterHandler={this.showToasterHandler}/>: <LoginForm navigation={this.props.navigation} showToasterHandler={this.showToasterHandler}/>}
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