import React from 'react';
import {Button} from 'react-native';

const loginButton = props => {
    return (
    <View>
       <View style={styles.inputContainer}>
        <TextInput 
        style={styles.input}
        placeholder={'Username'}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        />
    </View>
        <View style={styles.inputContainer}>
        <TextInput 
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry={true}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        />
        </View> 
    </View>
       
    );
};


export default loginButton;
