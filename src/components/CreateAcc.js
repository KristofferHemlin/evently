import React, { Component } from 'react';
import {
    StyleSheet, 
    View,
    Text,
    Dimensions,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' // Använde ett package då vanliga avoidkeybord inte funka

import FormHeader from './FormHeader';
import FormDescription from './FormDescription';

class CreateAcc extends Component{

    state = {
        fields: [
            {
                key: 'firstName',
                name: 'First Name',
                type: 'text',
                label: 'First Name',
                value: '',
                secureText: false,      
            },
            {
                key: 'lastName',
                name: 'Last Name',
                type: 'text',
                label: 'Last Name',
                value: '',
                secureText: false,
              },
              {
                key: 'email',
                name: 'Email',
                type: 'text',
                label: 'Email',
                value: '',
                secureText: false,
              },
              {
                key: 'phone',
                name: 'Phone',
                type: 'text',
                value: '',
                secureText: false,
              },
              {
                key: 'companyName',
                name: 'Company Name',
                type: 'text',
                label: 'Company Name',
                placeholder: 'Test Company',
                value: '',
                secureText: false,
              },
              {
                key: 'companyDepartment',
                name: 'Company Department',
                type: 'text',
                label: 'Company Department',
                value: '',
                secureText: false,
              },
              {
                key: 'password',
                name: 'Password',
                type: 'password',
                label: 'Password',
                value: '',
                secureText: true,
              },
              {
                key: 'rePassword',
                name: 'rePassword',
                type: 'password',
                label: 'Re-type Password',
                value: '',
                secureText: true,
              },
        ],
        firstName : null,
    }

    handleInputChange = (value, i) => {
        let fields = [...this.state.fields];
        fields[i].value = value;
        this.setState({fields : fields});
        
    };

    handleSubmit = () =>{
        console.log("CLICK!")
        // TODO: FIX SUBMIT LOGIC
    }


    render(){
        return(
            <ScrollView>
            <KeyboardAwareScrollView>
                <View style={styles.creatAccContainer}>
                    <FormHeader>Create your profile</FormHeader>
                    <FormDescription>Welcome! Fill in the form below to set up your company and user account.</FormDescription>
                        <View style={styles.inputForm}>
                        {this.state.fields.map((input, idx) => {
                            return <TextInput
                                value={this.state.value}
                                style={styles.input}
                                name={input.name}
                                key={input.key}
                                type={input.type}
                                label={input.label}
                                placeholder={input.name}
                                secureTextEntry={input.secureText}
                                onChangeText={(value) => this.handleInputChange(value, idx)}
                            />
                            })}
                            <TouchableOpacity 
                                style={styles.buttonContainer}
                                onPress={this.handleSubmit}
                                >
                                <Text style = {styles.buttonText}>Login </Text>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </KeyboardAwareScrollView> 
            </ScrollView>        
        )
    }
}


  const styles = StyleSheet.create({
    creatAccContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    inputForm:{
        width: Dimensions.get('window').width -55,
    },
    input:{
      //TODO:inte bästa lösningen
      fontSize: 16,
      backgroundColor: '#FFF',
      color: "grey",
      // TODO:inputfärgen blir werid, beror förmodligen på background color
      borderWidth: 2,
      borderColor: "black",
      paddingHorizontal: 15,
      paddingVertical: 20,
      marginBottom: 20,
    },
    inputContainer:{
      marginBottom: 10,
    },
    buttonContainer:{
        backgroundColor: '#5A90DC',
        height: 50,
        opacity: 0.8,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 40,
    },
    buttonText:{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
  });

  export default CreateAcc; 