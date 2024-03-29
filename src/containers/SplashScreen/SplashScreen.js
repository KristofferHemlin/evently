import React, { Component } from 'react';
import { View, Linking } from 'react-native';

import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import styles from './SplashScreen.style';
import * as informationHandlerActions from '../../utilities/store/actions/informationHandler';
import URL from '../../config';

class SplashScreen extends Component {

    componentDidMount() {
        Linking.addEventListener('url', this.handleOpenURL)
        this.checkToken();
    }


    componentWillUnmount() {
        // deep linking stuff
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    
// deep linking stuff
    handleOpenURL = (event) => {
        const route = event.url.replace(/.*?:\/\//g, '');
        // const routeName = route.split('/')[0];
        const deepLinkToken = route.split('/')[1]
        this.props.onSaveDeepLinkToken(deepLinkToken)
    }


    checkToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
            const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
            const userID = await AsyncStorage.getItem('USER_ID');
            const roleID = await AsyncStorage.getItem('ROLE_ID');

            if (refreshToken && accessToken && userID && roleID) {
                this.props.onSaveUser(
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
        onSaveUser: (userID, roleID, accessToken, refreshToken) => dispatch(informationHandlerActions.saveUser(userID, roleID, accessToken, refreshToken)),
        onSaveDeepLinkToken: (deepLinkToken) => dispatch(informationHandlerActions.saveDeepLinkToken(deepLinkToken)),
    };
};

export default connect(null, mapDispatchToProps)(SplashScreen);