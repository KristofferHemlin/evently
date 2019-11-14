import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import axios from 'axios';

import * as dataActions from '../../utilities/store/actions/data';

import URL from '../../config';
import styles from './SettingsModal.style'

const infoCircleIcon = <FontAwesome5 size={40} name={'times'} solid color="white" />;

class SettingsModal extends Component {

    static navigationOptions = {
        header: null,
    };


    userInfoNavigationHandler = () => {
        this.props.exitModal();
        this.props.navigation.navigate('ProfilePageRoute', { infoChanged: false });
    }

    logoutHandler = () => {
        axios.post(URL + 'logout')
            .then((response) => {
                OneSignal.setSubscription(false); // Mark device as unsubscribed
                this.props.clearDataOnLogout();
                this.props.exitModal();
                this.props.navigation.navigate('LoginRoute');
            })
            .catch((error) => {
                console.log(error);
            })

    }


    changePasswordNavigationHandler = () => {
        this.props.exitModal();
        this.props.navigation.navigate('ChangeInfoRoute', {
            uID: this.props.userID,
            title: 'Change Password',
            parentRoute: 'EventPageRoute',
            http_update_url: URL + 'account/password',
            showImagePicker: false,
            fields: {
                currentPassword: {
                    label: 'Current Password',
                    value: '',
                    key: 'currentPassword',
                    autoCapitalize: 'none',
                    secureText: true,
                },
                newPassword: {
                    label: 'New Password',
                    value: '',
                    key: 'password',
                    autoCapitalize: 'none',
                    secureText: true,
                },
                confirmPassword: {
                    label: 'Confirm Password',
                    value: '',
                    key: 'confirmPassword',
                    autoCapitalize: 'none',
                    secureText: true,
                }
            },
            formErrors: {
                password: 'Minimum 6 characters required',
                confirmPassword: '',
            },
        })
    }

    render() {
        return (
            <View style={styles.modalContainer}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={this.props.exitModal}>
                        <View style={styles.cancelIcon}>
                            {infoCircleIcon}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuContainer}>
                    <View style={styles.menuTitle}>
                        <Text style={styles.menuTitle}>User Profile Menu</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.menuAlternatives}>
                        <TouchableOpacity onPress={this.userInfoNavigationHandler}>
                            <Text style={styles.menuTxt}>User Profile Info</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.changePasswordNavigationHandler}>
                            <Text style={styles.menuTxt}>Change Account Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.logoutHandler}>
                            <Text style={styles.menuTxt}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearDataOnLogout: () => dispatch(dataActions.clearDataOnLogout())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SettingsModal));