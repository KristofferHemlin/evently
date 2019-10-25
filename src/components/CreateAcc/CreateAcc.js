
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka

import FormDescription from '../FormDescription/FormDescription';
import FormHeader from '../FormHeader/FormHeader';
// import ImageSelector from '../ImageSelector/ImageSelector';

import URL from '../../config';
import styles from './CreateAcc.style';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';

const formValid = (formErrors, fields) => {
    let valid = true;

    Object.values(formErrors).forEach(
        val => {
            val.length > 0 && (valid = false)
        });

    Object.values(fields).forEach(
        field => {
            console.log('field.bal', field.value);
            field.value === '' && (valid = false)
        }
    )

    return valid;
}

const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const phoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);

class CreateAcc extends Component {

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
                type: 'email',
                label: 'Email',
                value: '',
                secureText: false,
            },
            {
                key: 'phone',
                name: 'Phone',
                type: 'text',
                label: 'Phone',
                value: '',
                secureText: false,
            },
            {
                key: 'department',
                name: 'Company Department',
                type: 'text',
                label: 'Department',
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
        formErrors: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            department: '',
            password: '',
        },
        isLoading: false,
        messageColor: null,
    }


    componentDidMount() {
        axios.get(URL + 'users/' + this.props.userID)
            .then((response) => {
                let responseArray = []
                let fields = [...this.state.fields];
                for (key in response) {
                    responseArray.push(response[key]);
                }
                fields.forEach(field => {
                    if (field.key === 'firstName') {
                        field.value = responseArray[0].firstName
                    }
                    if (field.key === 'lastName') {
                        field.value = responseArray[0].lastName
                    }
                    if (field.key === 'email') {
                        field.value = responseArray[0].email
                    }
                    if (field.key === 'phone') {
                        field.value = responseArray[0].phone
                    }
                    if (field.key === 'department') {
                        field.value = responseArray[0].companyDepartment
                    }
                })

                this.setState({ fields: fields });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleInputChange = (value, i) => {
        let fields = [...this.state.fields];
        let formErrors = this.state.formErrors;
        const label = fields[i].label;
        fields[i].value = value;
        switch (label) {
            case 'First Name':
                formErrors.firstName = value.length < 1 ? "Minimum 2 characters required" : "";
                break;
            case 'Last Name':
                formErrors.lastName = value.length < 1 ? "Minimum 2 characters required" : "";
                break;
            case 'Email':
                formErrors.email = emailRegex.test(value) ? "" : "Invalid email adress";
                break;
            case 'Phone':
                formErrors.phone = phoneRegex.test(value) ? "" : "Invalid phone number";
                break;
            case 'Department':
                formErrors.department = value.length < 1 || value.length > 3 ? "Invalid department" : "";
                break;
            case 'Password':
                formErrors.password = value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            default:
                break;
        }
        this.setState({ fields: fields, formErrors: formErrors })

    };

    showToasterHandler = (toasterResponse, success) => {
        if (success === true) {
            this.setState({ messageColor: "#4a90e2" })
        } else {
            this.setState({ messageColor: "#e24a4a" })
        }
        let errorString = String(toasterResponse);
        this.refs.toast.show(errorString, 2000);
    }

    messageColor = (color) => {
        return {
            backgroundColor: color,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: Dimensions.get('window').width,
            height: 100,
        }
    }



    handleSubmit = () => {
        if (formValid(this.state.formErrors, this.state.fields)) {
            this.setState({ isLoading: true }, () => {
                axios.put(URL + 'users/' + this.props.userID + '/firstlogin', {
                    firstName: this.state.fields[0].value,
                    lastName: this.state.fields[1].value,
                    email: this.state.fields[2].value,
                    phone: this.state.fields[3].value,
                    companyDepartment: this.state.fields[4].value,
                    password: this.state.fields[5].value,
                })
                    .then((response) => {
                        this.setState({ isLoading: false });
                        this.props.navigation.navigate('EventOverviewRoute')
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({ isLoading: false })
                    })
            })
        } else {
            this.showToasterHandler("ERROR", false);
        }

    }


    render() {
        return (
            <ScrollView>
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={this.messageColor(this.state.messageColor)}
                        position='top'
                        positionValue={0} />
                </View>
                <KeyboardAwareScrollView>
                    <View style={styles.creatAccContainer}>
                        <FormHeader>Create your profile</FormHeader>
                        <FormDescription>Welcome! Fill in the form below to set up your company and user account.</FormDescription>
                        {/* <ImageSelector>Please upload a photo of yourself</ImageSelector> */}
                        <View style={styles.inputForm}>
                            {this.state.fields.map((input, idx) => {
                                return (
                                    <React.Fragment key={input.key}>
                                        <View style={styles.inputErrorMessageContainer}>
                                            {this.state.formErrors[input.key] ? <Text style={styles.inputErrorMessageText} >{this.state.formErrors[input.key]}</Text> : null}
                                        </View>
                                        <TextInput
                                            value={input.value}
                                            style={styles.input}
                                            name={input.name}
                                            key={input.key}
                                            type={input.type}
                                            label={input.label}
                                            placeholder={input.name}
                                            placeholderTextColor={"rgb(128,128,128)"}
                                            secureTextEntry={input.secureText}
                                            onChangeText={(value) => this.handleInputChange(value, idx)}
                                        />
                                    </React.Fragment>
                                )
                            })}
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={this.handleSubmit}>
                                {this.state.isLoading ? <ActivityIndicator size='small' color='white' /> : <Text style={styles.buttonText}>Submit </Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
    }
}
export default connect(mapStateToProps)(CreateAcc); 