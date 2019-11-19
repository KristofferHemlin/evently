import React, { Component } from 'react';
import Toast from 'react-native-easy-toast';
import {
    View,
    TextInput,
    ImageBackground,
    Text,
    TouchableOpacity,
    Linking,
    Image,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import axios from 'axios';
import OneSignal from 'react-native-onesignal';

import bgImage from '../../images/login-bg.jpg';
import logotype from '../../images/Logotype.png';

import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';

import styles from './LoginPage.style';
import toasterStyle from '../../components/ToasterStyle/ToasterStyle.style';
import URL from '../../config';
import * as informationHandlerActions from '../../utilities/store/actions/informationHandler';
import * as formActions from '../../utilities/store/actions/form'



class LoginPage extends Component {
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
            toasterMessageSuccess: false,
        }
    }

    componentDidMount() {
        if (this.props.deepLinkToken) {
            this.props.navigation.navigate('ResetPasswordRoute')
        } else {
            Linking.addEventListener('url', this.handleOpenURL)
            Linking.getInitialURL().then((url) => {
                if (url) {
                    this.handleOpenURL({ url });
                }
            })
        }
    }

    componentDidUpdate() {
        if (this.props.showToasterMessage) {
            this.setState({toasterMessageSuccess:true}, () => {
                this.refs.toast.show('Your changes have been submitted!', 2000);
            })
            this.props.setToasterHide();
        }
    }

    componentWillUnmount() {
        // deep linking stuff
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        const route = event.url.replace(/.*?:\/\//g, '');
        // const routeName = route.split('/')[0];
        const deepLinkToken = route.split('/')[1];
        this.props.onSaveDeepLinkToken(deepLinkToken);
        this.props.navigation.navigate("ResetPasswordRoute")
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
                        response.data.accessToken,
                        response.data.refreshToken
                    );


                    // Set up onesignal notifications.
                    OneSignal.init("4a9de87e-f4be-42e2-a00a-0246fb25df01");
                    OneSignal.setSubscription(true);

                    this.setState({
                        isLoading: false,
                    });
                    if (response.data.user.signupComplete === true) {
                        this.storeUserAccessInfo(
                            response.data.accessToken,
                            response.data.refreshToken,
                            response.data.user.id,
                            response.data.user.role.id,
                        )
                        this.props.navigation.navigate('EventPageRoute');
                    } else {
                        this.props.navigation.navigate('CreateAccountPageRoute', {
                            parentRoute: "LoginRoute",
                        });
                    }
                })
                .catch((error) => {
                    this.showToasterHandler(error.response.data.message, false);
                    console.log(error);
                    this.setState({ isLoading: false })
                });
        })

    }

    storeUserAccessInfo = async (accessToken, refreshToken, userID, roleID) => {
        try {
            await AsyncStorage.setItem('REFRESH_TOKEN', refreshToken);
            await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
            await AsyncStorage.setItem('USER_ID', String(userID)); //castar som string så att det funkar på android
            await AsyncStorage.setItem('ROLE_ID', String(roleID));
        } catch (error) {
            console.log(error);
        }
    };

    lostPasswordHandler = () => {
        let forgottenPassword = this.state.forgottenPassword
        this.setState({ forgottenPassword: !forgottenPassword })
    }

    showToasterHandler = (toasterResponse, success) => {
        this.setState({ toasterMessageSuccess: success })
        let errorString = String(toasterResponse);
        this.refs.toast.show(errorString, 2000);
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={this.state.toasterMessageSuccess ? toasterStyle.successMessage : toasterStyle.errorMessage}
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

const mapStateToProps = state => {
    return {
        deepLinkToken: state.informationHandler.deepLinkToken,
        showToasterMessage: state.form.showToasterMessage,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveUser: (userID, roleID, accessToken, refreshToken) => dispatch(informationHandlerActions.saveUser(userID, roleID, accessToken, refreshToken)),
        onSaveDeepLinkToken: (deepLinkToken) => dispatch(informationHandlerActions.saveDeepLinkToken(deepLinkToken)),
        setToasterHide: () => dispatch(formActions.setToasterHide()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);