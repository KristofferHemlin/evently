import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import URL from '../../config';
import styles from './ResetPasswordForm.style'
import { withNavigation } from 'react-navigation';
import * as formActions from '../../utilities/store/actions/form';

class ResetPasswordForm extends Component {

    state = {
        email: '',
        password: '',
        isLoading: false,
        loginScreen: this.props.fromLoginScreen,
    }

    checkEmail = () => {
        this.setState({ isLoading: true }, () => { 
            axios.post(URL + 'resetpassword', {
                email: this.state.email
            })
                .then((response) => {
                    this.props.showToasterHandler("Mail sent!", true);
                    this.setState({ isLoading: false })
                })
                .catch((error) => {
                    console.log(error);
                    this.props.showToasterHandler(error.response.data.message, false);
                    this.setState({ isLoading: false })
                });
        })

    }

    resetPassword = () => {
        this.setState({ isLoading: true }, () => { 
            axios.post(URL + 'resetpassword/' + this.props.deepLinkToken, {
                password: this.state.password
            })
                .then((response) => {
                    console.log('response', response);
                    this.props.setToasterShow();
                    this.setState({ isLoading: false }, () => {
                        this.props.navigation.navigate('LoginRoute')
                    })
                })
                .catch((error) => {
                    this.props.showToasterHandler(error.response.data.message);
                    console.log(error.response.data);
                    this.setState({ isLoading: false })
                });
        })

    }
    render() {
        return (
            <View style={styles.inputForm}>
                <View style={styles.inputContainer}>
                    {this.state.loginScreen ?
                        <TextInput
                            value={this.state.email}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={'email-address'}
                            style={styles.input}
                            placeholder={'Email'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                            onChangeText={(email) => this.setState({ email })}
                        /> :
                        <TextInput
                            value={this.state.password}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            type={'password'}
                            style={styles.input}
                            placeholder={'New Password'}
                            secureTextEntry={true}
                            placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                            onChangeText={(password) => this.setState({ password })}
                        />}
                </View>
                {this.state.loginScreen ?
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.checkEmail}>
                        {this.state.isLoading ?
                            <ActivityIndicator size={'small'} color={'#FFF'} /> : <Text style={styles.buttonText}> Send Mail</Text>}
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.resetPassword}>
                        {this.state.isLoading ?
                            <ActivityIndicator size={'small'} color={'#FFF'} /> : <Text style={styles.buttonText}>Change Password</Text>}
                    </TouchableOpacity>}

            </View>


        );

    }

};

const mapStateToProps = state => {
    return {
        deepLinkToken: state.informationHandler.deepLinkToken,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setToasterShow: () => dispatch(formActions.setToasterShow()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(ResetPasswordForm));
