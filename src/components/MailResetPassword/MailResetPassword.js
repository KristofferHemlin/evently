import React, { Component } from 'react';
import {
    View, 
    StyleSheet, 
    Dimensions, 
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';

import styles from './MailResetPassword.style'

class MailResetPassword extends Component{

    state = {
        email: '',
        isLoading: false
    }

    checkEmail = () => {
        this.setState({isLoading:true}, () => { // so we can show loading indicator while fetching data
            axios.post('http://192.168.12.117:3000/authenticate', {
            })
            .then((response) => {
                console.log(response);
                })
            .catch((error) => {
                alert(error);
                console.log(error);
                this.setState({isLoading: false})
            });
        })
      
    }
    render(){
        return (
            <View style={styles.inputForm}>
                    <View style={styles.inputContainer}>
                    <TextInput 
                    value = {this.state.email}
                    autoCapitalize = {'none'}
                    autoCorrect = {false}
                    type = {'email'}
                    style={styles.input}
                    placeholder={'Email'}
                    placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                    onChangeText={(email) => this.setState({email})}
                    />
                    </View>
                     <TouchableOpacity style={styles.buttonContainer} onPress={this.checkEmail}>
                    {this.state.isLoading ? <ActivityIndicator size={'small'} color={'#FFF'}/> :<Text style = {styles.buttonText}> Send Mail</Text>}
                    </TouchableOpacity>
                
            </View>
             
                 
        );

    }

};

export default MailResetPassword;
