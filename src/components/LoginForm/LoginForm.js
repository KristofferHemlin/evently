import React, {Component} from 'react';
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

import styles from './LoginForm.style'

class LoginForm extends Component{

    state = {
        username: '',
        password: '',
        isLoading: false,
        token: null,
    }

    authUser = () => {
        this.setState({isLoading:true}, () => { // so we can show loading indicator while fetching data
            axios.post('http://192.168.12.117:3000/authenticate', {
                email: this.state.username,
                password: this.state.password
                 // jane.doe@test.com
                // cocacola123
            })
            .then((response) => {
                alert(response.data.message)
                this.setState({
                    token: response.data.token,
                    isLoading: false});
                this.props.navigation.navigate('EventOverviewRoute') 
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
                    value = {this.state.username}
                    autoCapitalize = {'none'}
                    style={styles.input}
                    placeholder={'Username'}
                    placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                    onChangeText={(username) => this.setState({username})}
                    onSubmitEditing={() => this.passwordInput.focus()} // så den fokuserar på password rutan när man infogar username
                    />
                </View>
                    <View style={styles.inputContainer}>
                    <TextInput 
                    value = {this.state.password}
                    autoCapitalize = {'none'}
                    style={styles.input}
                    placeholder={'Password'}
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                    ref={(input) => this.passwordInput = input} // ref så man kan hoppa till password efter username
                    />
                    </View> 
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.authUser}>
                    {this.state.isLoading ? <ActivityIndicator size={'small'} color={'#FFF'}/> :<Text style = {styles.buttonText}>Login </Text>}
                    </TouchableOpacity>
                    <Text style={styles.forgottenPasswordTxt}
                        onPress={() => Linking.openURL('#')}>
                        Forgotten your password?
                    </Text>
            </View>
             
                 
        );

    }

};

export default LoginForm;
