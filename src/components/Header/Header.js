import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Text,
} from 'react-native';

import SettingsModal from '../SettingsModal/SettingsModal'
import NotificationModal from '../NotificationModal/NotificationModal'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './Header.style';
<<<<<<< HEAD
import bgImage from '../Login/images/login-bg.jpeg'; // TODO: Hitta bättre bild??



// TODO Borde inte vara hårdkodat
let COMPANY_NAME = 'Claremont'

class Header extends Component {

    state = {
        showBellModal: false,
        showUserModal: false
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
                        onPress={() => this.setState({ showBellModal: true })}>
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
=======
import bgImage from './images/login-bg.png'; // TODO: Hitta bättre bild??



const header = props => {
    // let bellColor = '';
    // {props.showNotificationBadge ? bellColor='red' : bellColor='white'}
    const bell_icon = <FontAwesome5 size={25} name={'bell'} light color={"white"} />; // best pratice att lägga en const utanför huvudfunktionen i react?? 
    const user_cog = <FontAwesome5 size={25} name={'user-cog'} light color="white" />;
    return (
        <ImageBackground source={bgImage} style={styles.headerContainer}>

            <View style={styles.headerLogo}>
                <Text style={styles.headerTxt}>Claremont</Text>
                {/*TODO: borde inte vara hårdkodat */}
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={props.bellIconClicked}>
                    <View style={styles.notificationIcon}>
                        {props.showNotificationBadge ?
                            <View style={styles.notificationIconCircle}/>: null}
                        {bell_icon}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileIcon}
                    onPress={props.showModal}>
                    {user_cog}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default header;
>>>>>>> c3fe37b5894d49c7b963bedcb4988d77fec27a06
