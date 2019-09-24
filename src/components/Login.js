import React, { Component } from 'react';
import {
    StyleSheet, 
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
} from 'react-native';

import bgImage from '../../images/login-bg.png';
import LoginForm from './LoginForm';

class Login2 extends Component{
    render(){
        return(
            <ImageBackground source={bgImage} style={styles.pageContainer}>
                <View style = {styles.logoContainer}>
                    <Text style = {styles.logoText}>EVENTLY</Text>
                </View>
                <LoginForm/>
                <View style={styles.signUpContainer}>
                    <TouchableOpacity>
                        <Text style = {styles.signText}>Don't have an account yet?</Text>
                        <Text style = {styles.signText}>Click here to sign up!</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    pageContainer:{
        flex:1,
        alignItems: 'center',
    },

    logoContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoText:{
        color: "white",
        fontSize: 40,
        fontWeight: '200',
    },

    signUpContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '5%',
    },

    signText:{
        color: "white",
        fontSize: 20,
        fontWeight: '200',
        alignSelf:'center',
    }

});

export default Login2;