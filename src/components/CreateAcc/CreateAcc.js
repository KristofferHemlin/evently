import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' // Använde ett package då vanliga avoidkeybord inte funka

import styles from './CreateAcc.style';
import FormHeader from '../FormHeader';
import FormDescription from '../FormDescription';
import ImageSelector from '../ImageSelector/ImageSelector';

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
              // {
              //   key: 'rePassword',
              //   name: 'rePassword',
              //   type: 'password',
              //   label: 'Re-type Password',
              //   value: '',
              //   secureText: true,
              // }
        ],
        firstName : null,
    }

    handleInputChange = (value, i) => {
        let fields = [...this.state.fields];
        fields[i].value = value;
        this.setState({fields : fields});
        console.log(fields);
        
    };

    handleSubmit = () =>{
        console.log("CLICK!")
        this.props.navigation.navigate('EventOverviewRoute')
        // TODO: FIX SUBMIT LOGIC
    }


    render(){
        return(
            <ScrollView>
            <KeyboardAwareScrollView>
                <View style={styles.creatAccContainer}>
                    <FormHeader>Create your profile</FormHeader>
                    <FormDescription>Welcome! Fill in the form below to set up your company and user account.</FormDescription>
                    <ImageSelector>Please upload a photo of yourself</ImageSelector>
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
                                <Text style = {styles.buttonText}>Submit </Text>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </KeyboardAwareScrollView> 
            </ScrollView>        
        )
    }
}
  export default CreateAcc; 