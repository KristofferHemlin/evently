import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
} from 'react-native';

import SettingsModal from '../SettingsModal/SettingsModal'
import NotificationModal from '../NotificationModal/NotificationModal'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import OneSignal from 'react-native-onesignal';

import styles from './Header.style';

const bell_icon = <FontAwesome5 size={25} name={'bell'} light color="white" />;
const user_cog = <FontAwesome5 size={25} name={'user-cog'} light color="white" />;

// TODO Borde inte vara hårdkodat
let COMPANY_NAME = 'Claremont'

class Header extends Component {

    constructor(props) {
        super(props)

        OneSignal.inFocusDisplaying(2);
        console.log('mounted');
        OneSignal.addEventListener('received', this.onReceived);

        this.state = {
            showBellModal: false,
            showUserModal: false,
            showNotificationBadge: false,
        }
    }

    componentDidMount() {
        this._retrieveData();
      
    }

    componentWillUnmount() {
        console.log('unmounted');
        OneSignal.removeEventListener('received', this.onReceived);
    }

    onReceived = (notification) => {
        console.log('onReceived');
        this.setState({showNotificationBadge:true}, 
            () =>this._storeData());
        
    }

    _retrieveData = async () => {
        console.log('_retrieveData');
        try {
            const showNotificationBadge = await AsyncStorage.getItem('showNotificationBadge');
            showNotificationBadgeParsed = Boolean(JSON.parse(showNotificationBadge));
            
            if (showNotificationBadgeParsed !== null){
                this.setState({
                    showNotificationBadge: showNotificationBadgeParsed
                })
            }
            } catch (error) {
                console.log('retrieveDAta header', error);
          // Error retrieving data
        }
      };

    _storeData = async () => {
        try {
          await AsyncStorage.setItem('showNotificationBadge', JSON.stringify(this.state.showNotificationBadge));
        } catch (error) {
          console.log('_storeData header', error);
        }
      };

    notificationIconClickHandler = () => {
        console.log('notificationIconClickHandler');
        this.setState({
            showBellModal: true,
            showNotificationBadge: false,
        }, () => this._storeData());
        
    }
    render = () => {
        var { eventTitle } = this.props
        // functional styling to place Header Modals above all of app
        return <View style={{ zIndex: 1 }}>
            {this.state.showUserModal ?
                <SettingsModal
                    eventTitle={eventTitle || ''}
                    exitModal={() => this.setState({ showUserModal: false })}
                /> : <View />}
            {this.state.showBellModal ?
                <NotificationModal
                    eventTitle={eventTitle || ''}
                    exitModal={() => this.setState({ showBellModal: false })}
                /> : <View />}
            <View style={styles.headerContainer}>
                <View style={styles.headerLogo}>
                    <Text style={styles.headerTxt}>{COMPANY_NAME}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.notificationIcon}
                        onPress={this.notificationIconClickHandler}>
                        {this.state.showNotificationBadge ?
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
export default Header;
