import React, { Component } from 'react';
import {
    StyleSheet, 
    View,
    ImageBackground,
    Text,
} from 'react-native';

import bgImage from '../../images/login-bg.png';
import LoginForm from './LoginForm';

class Login extends Component{
    render(){
        return(
            <ImageBackground  source={bgImage} style={styles.backgroundContainer}>
                <View style ={styles.logoContainer}>
                    <Text style={styles.logoText}>Evently</Text>
                </View>
                <LoginForm/>
                <View style={styles.bottom}>
                    <Text style={styles.signUpTxt}
                        onPress={() => Linking.openURL('#')}>
                        Sign up here!
                    </Text>
                </View>    
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer:{
     flex: 1,
     width: null,
     height: null,
     alignItems: 'center',
  
   },
    logoContainer:{
      alignItems: 'center',
      marginTop: 150,
      marginBottom: 120 
    },
    logoText:{
      color: "white",
      fontSize: 40,
      fontWeight: '200',
    },
    bottom:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 50
    },
    signUpTxt:{
        color:'#FFF',
        fontSize: 20,
        fontWeight: '700',
    }
  });

  export default Login; 