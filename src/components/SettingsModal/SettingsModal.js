import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import OneSignal from 'react-native-onesignal';

import * as actionTypes from '../../utilities/store/actions';

import URL from '../../config';
import styles from './SettingsModal.style'

const infoCircleIcon = <FontAwesome5 size={40} name={'times'} solid color="white" />;

class SettingsModal extends Component {

    static navigationOptions = {
        header: null,
    };


    userInfoNavigationHandler = () => {
        this.props.exitModal();
        this.props.navigation.navigate('ProfilePageRoute');
    }

    logoutHandler = () => {
        OneSignal.setSubscription(false); // Mark device as unsubscribed
        this.props.onDeleteToken();
        this.props.exitModal();
        this.props.navigation.navigate('LoginRoute');
    }

    changePasswordNavigationHandler = () => {
        this.props.navigation.navigate('ChangeInfoRoute', {
            onEditSubmit: () => { },
            uID: this.props.userID,
            title: 'Change Password',
            parentRoute: 'ProfilePageRoute',
            http_update_url: URL + 'account/password',
            fields: {
                currentPassword: {
                    label: 'Current Password',
                    value: '',
                    autoCapitalize: 'none',
                    secureText: true,

                },
                newPassword: {
                    label: 'New Password',
                    value: '',
                    autoCapitalize: 'none',
                    secureText: true,
                }
            }
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
                        {/* <TouchableOpacity onPress={this.changePasswordNavigationHandler}>
                            <Text style={styles.menuTxt}>Change Account Password</Text>
                        </TouchableOpacity> */}
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
        onDeleteToken: () => dispatch({
            type: actionTypes.ON_DELETE_TOKEN,
        }),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SettingsModal));