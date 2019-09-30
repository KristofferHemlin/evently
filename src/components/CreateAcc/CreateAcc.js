import axios from 'axios';
import React, { Component } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka
import FormDescription from '../FormDescription';
import FormHeader from '../FormHeader';
import ImageSelector from '../ImageSelector/ImageSelector';
import styles from './CreateAcc.style';



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
            //   {
            //     key: 'companyName',
            //     name: 'Company Name',
            //     type: 'text',
            //     label: 'Company Name',
            //     placeholder: 'Test Company',
            //     value: '',
            //     secureText: false,
            //   },
            //   {
            //     key: 'companyDepartment',
            //     name: 'Company Department',
            //     type: 'text',
            //     label: 'Company Department',
            //     value: '',
            //     secureText: false,
            //   },
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
    }

    

    componentDidMount(){
        axios.get('http://192.168.12.197:3000/users/50')
        .then((response) => {            
            let responseArray = []
            let fields = [...this.state.fields];
            for (key in response) {
                responseArray.push(response[key]);
              }
              fields.forEach(field => {
                if(field.key === 'firstName'){
                    field.value = responseArray[0].firstName
                }
                if(field.key === 'lastName'){
                field.value = responseArray[0].lastName
                }
                if(field.key === 'email'){
                    field.value = responseArray[0].email
                }    
                if(field.key === 'phone'){
                    field.value = responseArray[0].phone
                }  
              })

            this.setState({fields: fields});
        })
        .catch((error) => {
            console.log(error);
        });          
}
    handleInputChange = (value, i) => {
        let fields = [...this.state.fields];
        fields[i].value = value;
        this.setState({fields : fields});
        console.log(fields);
        
    };

    handleSubmit = () =>{
        console.log("CLICK!")
        axios.put('http://192.168.12.197:3000//users/50/firstlogin', {
            firstName: this.state.fields[0].value,
            lastName: this.state.fields[1].value,
            email: this.state.fields[2].value,
            phone: this.state.fields[3].value,
            newPassword: this.state.fields[4].value
        })
        .then((response) => {
            alert(response.data.message)
            this.setState({
                isLoading: false});
            // this.props.navigation.navigate('EventOverviewRoute') 
        })
        .catch((error) => {
            console.log[error];
            this.setState({isLoading: false})
        })
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
                                value={input.value}
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