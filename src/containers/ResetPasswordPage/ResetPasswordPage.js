import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    Image,
} from 'react-native';


import bgImage from '../../images/login-bg.jpg';
import logotype from '../../images/Logotype.png';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import toasterStyle from '../../components/ToasterStyle/ToasterStyle.style';
import Toast from 'react-native-easy-toast'

import styles from './ResetPasswordPage.style';

class ResetPasswordPage extends Component {
    static navigationOptions = {
        header: null,
    };

    showToasterHandler = (toasterResponse) => {
        let errorString = String(toasterResponse);
        this.refs.toast.show(errorString, 2000);
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={toasterStyle.errorMessage}
                        position='top'
                        positionValue={0} />
                </View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logotype} source={logotype} />
                    <Text style={styles.logoText}>Eventapp</Text>
                </View>
                <ResetPasswordForm fromLoginScreen={false} showToasterHandler={this.showToasterHandler} />
                <View style={styles.signUpContainer}>
                </View>
            </ImageBackground>
        )
    }
}



export default ResetPasswordPage;