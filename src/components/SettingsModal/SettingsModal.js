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
        this.props.navigation.navigate('UserProfileRoute')
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
                        <TouchableOpacity onPress={this.props.navigationModal}>
                            <Text style={styles.menuTxt}>User Profile Info</Text>
                        </TouchableOpacity>
                        <Text style={styles.menuTxt}>Change Account Password</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default withNavigation(SettingsModal);