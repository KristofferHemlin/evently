import React, { Component } from 'react';
import { View } from 'react-native';

import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import styles from './SplashScreen.style';
import * as dataActions from '../../utilities/store/actions/data';
import URL from '../../config';

class SplashScreen extends Component {

    componentDidMount() {
        this.checkToken();
    }

    checkToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
            const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
            const userID = await AsyncStorage.getItem('USER_ID');
            const roleID = await AsyncStorage.getItem('ROLE_ID');

            if (refreshToken && accessToken && userID && roleID) {
                this.props.saveUser(
                    userID,
                    roleID,
                    accessToken,
                    refreshToken
                );
                axios.get(URL + 'tokens/validate')
                    .then((response) => {
                        if (response.status === 204) {
                            this.props.navigation.navigate('AppStack')
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.props.navigation.navigate('AuthStack')

                    })
            }
            else {
                this.props.navigation.navigate('AuthStack')
            }
        }
        catch (error) {            
            console.log(error);
            this.props.navigation.navigate('AuthStack')
        }
    };

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.pageContainer}>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveUser: (userID, roleID, accessToken, refreshToken) => dispatch(dataActions.saveUser(userID, roleID, accessToken, refreshToken)),
    };
};

export default connect(null, mapDispatchToProps)(SplashScreen);