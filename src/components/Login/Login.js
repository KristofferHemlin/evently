import React, { Component } from 'react';
import Toast, { DURATION } from 'react-native-easy-toast'
import {
    View,
    TextInput,
    ImageBackground,
    Text,
    TouchableOpacity,
    Linking,
    Image,
    ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import OneSignal from 'react-native-onesignal';

import bgImage from './images/login-bg.jpeg';
import logotype from './images/Logotype.png';

import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';

import styles from './Login.style';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';
import URL from '../../config';

class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(properties) {
        super(properties);

        this.state = {
            username: '',
            password: '',
            userID: null,
            isLoading: false,
            token: null,
            roleID: null,
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

    authUser = () => {
        this.setState({ isLoading: true }, () => {
            // axios.post('http://localhost:3000/authenticate', {
            axios.post(URL + 'authenticate', {
                email: this.state.username,
                password: this.state.password
            })
                .then((response) => {
                    console.log(response)
                    this.setState({
                        token: response.data.token,
                        isLoading: false,
                        userID: response.data.user.id,
                        roleID: response.data.user.role.id,
                    });

                    // Set up onesignal notifications.
                    OneSignal.init("4a9de87e-f4be-42e2-a00a-0246fb25df01");
                    // OneSignal.removeExternalUserId();
                    OneSignal.setExternalUserId(String(response.data.user.id));

                    if (response.data.user.signupComplete === true) {
                        this.props.navigation.navigate('EventOverviewRoute', {
                            uID: this.state.userID,
                            roleID: this.state.roleID,
                            token: this.state.token
                        })
                    } else {
                        this.props.navigation.navigate('CreateAccRoute', {
                            uID: this.state.userID,
                            roleID: this.state.roleID,
                            token: this.state.token
                        })
                    }
                })
                .catch((error) => {
                    this.props.showErrorHandler(error.response.data.message);
                    // console.log(error);
                    console.log(error);
                    this.setState({ isLoading: false })
                });
        })

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

    showErrorHandler = (errorMessage) => {
        let errorString = String(errorMessage);
        this.refs.toast.show(errorString, 1500);
    }

    render() {
        console.log("render");
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>

                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={toasterStyle.errorMessage}
                        position='top' />
                </View>

                <View style={styles.logoContainer}>
                    <Image style={styles.logotype} source={logotype} />
                    <Text style={styles.logoText}>Eventapp</Text>
                </View>
                {this.state.forgottenPassword ? <ResetPasswordForm fromLoginScreen={true} /> :

                    <View style={styles.inputForm}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={this.state.username}
                                autoCapitalize={'none'}
                                style={styles.input}
                                placeholder={'Username'}
                                placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                                onChangeText={(username) => this.setState({ username })}
                                autoCorrect={false}
                                onSubmitEditing={() => this.passwordInput.focus()} // så den fokuserar på password rutan när man infogar username
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={this.state.password}
                                autoCapitalize={'none'}
                                style={styles.input}
                                placeholder={'Password'}
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry={true}
                                placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                                autoCorrect={false}
                                ref={(input) => this.passwordInput = input} // ref så man kan hoppa till password efter username
                            />
                        </View>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.authUser}>
                            {this.state.isLoading ? <ActivityIndicator size={'small'} color={'#FFF'} /> : <Text style={styles.buttonText}>Login </Text>}
                        </TouchableOpacity>
                    </View>
                    }
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