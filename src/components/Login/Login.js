import React, { Component } from 'react';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Dimensions } from 'react-native';
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
import { connect } from 'react-redux';

import axios from 'axios';
import OneSignal from 'react-native-onesignal';

import bgImage from './images/login-bg.jpg';
import logotype from './images/Logotype.png';

import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';

import styles from './Login.style';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';
import URL from '../../config';
import * as actionTypes from '../../store/actions';

class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(properties) {
        super(properties);

        this.state = {
            messageColor: null,
            username: '',
            password: '',
            userID: null,
            isLoading: false,
        }
    }


    componentDidMount() {
        // deep linking stuff

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
        this.navigate(event.url)

    }

    // deep linking stuff
    navigate = (url) => {
        const { navigate } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');
        const routeName = route.split('/')[0];
        const deepLinkToken = route.split('/')[1]

        if (routeName === 'resetpassword') {
            navigate('ResetPasswordRoute', {
                deepLinkToken:deepLinkToken
            })
        }
    }

    authUser = () => {
        this.setState({ isLoading: true }, () => {
            axios.post(URL + 'authenticate', {
                email: this.state.username,
                password: this.state.password
            })
                .then((response) => {

                    this.props.onSaveUser(
                        response.data.user.id, 
                        response.data.user.role.id, 
                        response.data.token);
                    // Set up onesignal notifications.
                    OneSignal.init("4a9de87e-f4be-42e2-a00a-0246fb25df01");
                    // OneSignal.removeExternalUserId();
                    OneSignal.setExternalUserId(String(response.data.user.id));

                    this.setState({
                        isLoading: false,
                    });
                    if (response.data.user.signupComplete === true) {
                        this.props.navigation.navigate('EventOverviewRoute');
                    } else {
                        this.props.navigation.navigate('CreateAccRoute');
                    }
                })
                .catch((error) => {
                    this.showToasterHandler(error.response.data.message, false);
                    console.log(error);
                    this.setState({ isLoading: false })
                });
        })

    }

    lostPasswordHandler = () => {
        let forgottenPassword = this.state.forgottenPassword
        this.setState({ forgottenPassword: !forgottenPassword })
    }

    showToasterHandler = (toasterResponse, success) => {
        if (success === true) {
            this.setState({ messageColor: "#4a90e2" })
        } else {
            this.setState({ messageColor: "#e24a4a" })
        }
        let errorString = String(toasterResponse);
        this.refs.toast.show(errorString, 2000);
    }

    messageColor = (color) => {
        return {
            backgroundColor: color,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.12,
        }
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={this.messageColor(this.state.messageColor)}
                        position='top'
                        positionValue={0} />
                </View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logotype} source={logotype} />
                    <Text style={styles.logoText}>Eventapp</Text>
                </View>
                {this.state.forgottenPassword ?
                    <ResetPasswordForm
                        showToasterHandler={this.showToasterHandler}
                        fromLoginScreen={true} /> :
                    <View style={styles.inputForm}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={this.state.username}
                                autoCapitalize={'none'}
                                style={styles.input}
                                placeholder={'Username'}
                                keyboardType={'email-address'}
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

const mapDispatchToProps = dispatch => {
    return {
        onSaveUser: (userID, roleID, token) => dispatch({
            type: actionTypes.SAVE_USER,
            payload: {
                userID: userID,
                roleID: roleID,
                token: token,
            }
        }),
    };
};

export default connect(null, mapDispatchToProps)(Login);