import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
} from 'react-native';

import { connect } from 'react-redux';
import SettingsModal from '../SettingsModal/SettingsModal'
import NotificationModal from '../NotificationModal/NotificationModal'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import OneSignal from 'react-native-onesignal';

import styles from './Header.style';
import * as actionTypes from '../../store/actions'

const bell_icon = <FontAwesome5 size={25} name={'bell'} light color="white" />;
const user_cog = <FontAwesome5 size={25} name={'user-cog'} light color="white" />;

// TODO Borde inte vara hårdkodat
const COMPANY_NAME = 'Zington'

class Header extends Component {

    constructor(props) {
        super(props)

        OneSignal.inFocusDisplaying(2);
        OneSignal.addEventListener('received', this.onReceived);

        this.state = {
            showBellModal: false,
            showUserModal: false,
            showNotificationBadge: false,
        }
    }

    componentDidMount() {
        console.log('mounts');
        this._retrieveData();

    }

    componentWillUnmount() {
        console.log('unmounts');
    }

    onReceived = (notification) => {
        this.props.onSaveNotificationStatus(true)
        this._storeData(true);
        // console.log('onReceived!!!!');
        // console.log('showNotificationBadge1', this.state.showNotificationBadge);
        // this.setState({ showNotificationBadge: true },
        //     () => this._storeData());

    }

    _retrieveData = async () => {
        try {
            const showNotificationBadge = await AsyncStorage.getItem('showNotificationBadge');
            showNotificationBadgeParsed = Boolean(JSON.parse(showNotificationBadge));

            if (showNotificationBadgeParsed !== null) {
                console.log('showNotificationBadgeParsed',showNotificationBadgeParsed);
               this.props.onSaveNotificationStatus(showNotificationBadgeParsed)
            }
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    };

    _storeData = async (notificationStatus) => {
        try {
            await AsyncStorage.setItem('showNotificationBadge', JSON.stringify(notificationStatus));
        } catch (error) {
            console.log(error);
        }
    };

    notificationIconClickHandler = () => {
        this.props.onSaveNotificationStatus(false);
        this._storeData(false);
        this.setState({
                showBellModal: true,
        })
        // this.setState({
        //     showBellModal: true,
        //     showNotificationBadge: false,
        // }, () => this._storeData());
    
    }
    render = () => {
        // functional styling to place Header Modals above all of app
        return <View style={{ zIndex: 1 }}>
            {this.state.showUserModal ?
                <SettingsModal
                    exitModal={() => this.setState({ showUserModal: false })}
                /> : <View />}
            {this.state.showBellModal ?
                <NotificationModal
                    exitModal={() => this.setState({
                        showBellModal: false,
                    })}
                /> : <View />}
            <View style={styles.headerContainer}>
                <View style={styles.headerLogo}>
                    <Text style={styles.headerTxt}>{COMPANY_NAME}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.notificationIcon}
                        onPress={this.notificationIconClickHandler}>
                        {this.props.notificationStatus ?
                            <View style={styles.notificationIconCircle} />
                            : null}
                        {bell_icon}

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.profileIcon}
                        onPress={() => this.setState({ showUserModal: true })}>
                        {user_cog}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
}

const mapStateToProps = state => {
    console.log('state', state);
    return {
        notificationStatus: state.notificationStatus
        
    }
}

const mapDispatchToProps = dispatch => {
    console.log('dispatch', dispatch);
    return {
        onSaveNotificationStatus: (notificationStatus) => dispatch({
            type: actionTypes.SAVE_NOTIFICATION_STATUS,
            payload:{
                notificationStatus: notificationStatus
            }
        }),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Header);
