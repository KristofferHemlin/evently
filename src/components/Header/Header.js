import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Text,
    AsyncStorage,
} from 'react-native';

import SettingsModal from '../SettingsModal/SettingsModal'
import NotificationModal from '../NotificationModal/NotificationModal'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import OneSignal from 'react-native-onesignal';

import styles from './Header.style';
import bgImage from '../Login/images/login-bg.jpeg'; // TODO: Hitta bättre bild??

const bell_icon = <FontAwesome5 size={25} name={'bell'} light color="white" />;
const user_cog = <FontAwesome5 size={25} name={'user-cog'} light color="white" />;

// TODO Borde inte vara hårdkodat
let COMPANY_NAME = 'Claremont'

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
        this._retrieveData();
      
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
    }

    onReceived = (notification) => {
        this.setState({showNotificationBadge:true}, 
            () =>this._storeData());
        
    }

    _retrieveData = async () => {
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
        this.setState({
            showBellModal: true,
            showNotificationBadge: false,
        }, () => this._storeData());
        
    }
    render = () => {
        var { uID, eventTitle } = this.props
        // functional styling to place Header Modals above all of app
        return <View style={{ zIndex: 1 }}>
            {this.state.showUserModal ?
                <SettingsModal
                    uID={uID || null}
                    eventTitle={eventTitle || ''}
                    exitModal={() => this.setState({ showUserModal: false })}
                /> : <View />}
            {this.state.showBellModal ?
                <NotificationModal
                    uID={uID || null}
                    eventTitle={eventTitle || ''}
                    exitModal={() => this.setState({ showBellModal: false })}
                /> : <View />}
            <ImageBackground source={bgImage} style={styles.headerContainer}>
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
            </ImageBackground>
        </View>
    }
}

export default Header;
