import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
    Modal,
} from 'react-native';

import SettingsModal from '../SettingsModal/SettingsModal'
import NotificationModal from '../NotificationModal/NotificationModal'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import OneSignal from 'react-native-onesignal';

import styles from './Header.style';

const bell_icon = <FontAwesome5 size={25} name={'bell'} light color="white" />;
const user_cog = <FontAwesome5 size={25} name={'user-cog'} light color="white" />;

// TODO Borde inte vara hårdkodat
let COMPANY_NAME = 'Zington'

class Header extends Component {

    constructor(props) {
        super(props)

        OneSignal.inFocusDisplaying(2);
        OneSignal.addEventListener('received', this.onReceived);

        this.state = {
            showBellModal: false,
            showUserModal: false,
            showNotificationBadge: false,

            modalVisible: false,
        }
    }

    componentDidMount() {
        this._retrieveData();

    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
    }

    onReceived = (notification) => {
        this.setState({ showNotificationBadge: true },
            () => this._storeData());

    }

    _retrieveData = async () => {
        try {
            const showNotificationBadge = await AsyncStorage.getItem('showNotificationBadge');
            showNotificationBadgeParsed = Boolean(JSON.parse(showNotificationBadge));

            if (showNotificationBadgeParsed !== null) {
                this.setState({
                    showNotificationBadge: showNotificationBadgeParsed
                })
            }
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    };

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('showNotificationBadge', JSON.stringify(this.state.showNotificationBadge));
        } catch (error) {
            console.log(error);
        }
    };

    notificationIconClickHandler = () => {
        this.setState({
            showBellModal: true,
            showNotificationBadge: false,
        }, () => this._storeData());

    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render = () => {
        // functional styling to place Header Modals above all of app
        return <View style={{ zIndex: 1 }}>

            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View>
                    <Text>Hello World!</Text>
                    <TouchableOpacity
                        style={{ top: 400 }}
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>Hide Modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity
                style={{ top: 400 }}
                onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Show Modal</Text>
            </TouchableOpacity>


            {this.state.showUserModal ?
                <SettingsModal
                    exitModal={() => this.setState({ showUserModal: false })}
                /> : <View />}
            {this.state.showBellModal ?
                <NotificationModal
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
