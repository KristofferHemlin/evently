import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';

import styles from './SettingsModal.style'
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview'

const infoCircleIcon = <FontAwesome5 size={40} name={'times'} solid color="white" />;

class SettingsModal extends Component {

    static navigationOptions = {
        header: null,
    };

    changeUserInfoNavigationHandler = () => {
<<<<<<< HEAD
        this.props.navigation.navigate('UserProfileRoute')
=======
        this.props.navigation.navigate('CreateAccRoute')
>>>>>>> 92f007f646eae3ebc0a94512de0546d9cefae036
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
<<<<<<< HEAD
                    <View style={styles.line}></View>
                    <View style={styles.menuAlternatives}>
                        <TouchableOpacity onPress={this.props.navigationModal}>
                            <Text style={styles.menuTxt}>User Profile Info</Text>
                        </TouchableOpacity>
=======
                    <View style={styles.menuAlternatives}>
                        <TouchableOpacity onPress={this.changeUserInfoNavigationHandler}>
                            <Text style={styles.menuTxt}>User Profile Info</Text>
                        </TouchableOpacity>

>>>>>>> 92f007f646eae3ebc0a94512de0546d9cefae036
                        <Text style={styles.menuTxt}>Change Account Password</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default withNavigation(SettingsModal);