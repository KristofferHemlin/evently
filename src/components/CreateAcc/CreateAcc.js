
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
import BackButton from '../BackButton/BackButton';
// import ImageSelector from '../ImageSelector/ImageSelector';

import URL from '../../config';
import styles from './CreateAcc.style';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';
import {
    formValid,
    emailRegex,
    phoneRegex
} from '../../helpers/formValidation'


class CreateAcc extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        fields: {
            firstName: {
                key: 'firstName',
                name: 'First Name',
                type: 'text',
                label: 'First Name',
                value: '',
                secureText: false,
            },
            lastName: {
                key: 'lastName',
                name: 'Last Name',
                type: 'text',
                label: 'Last Name',
                value: '',
                secureText: false,
            },
            email: {
                key: 'email',
                name: 'Email',
                type: 'email',
                label: 'Email',
                value: '',
                secureText: false,
            },
            phone: {
                key: 'phone',
                name: 'Phone',
                type: 'text',
                label: 'Phone',
                value: '',
                secureText: false,
            },
            department: {
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
            password: {
                key: 'password',
                name: 'Password',
                type: 'password',
                label: 'Password',
                value: '',
                secureText: true,
            },
            confirmPassword: {
                key: 'confirmPassword',
                name: 'confirmPassword',
                type: 'password',
                label: 'Confirm Password',
                value: '',
                secureText: true,
            }

        },
        formErrors: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            department: '',
            password: 'Minimum 6 characters required',
            confirmPassword: '',
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
        let fields = {...this.state.fields}
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
                formErrors.confirmPassword = value === fields['confirmPassword'].value ? "" : "Passwords must match";
                break;
            case 'Confirm Password':
                formErrors.confirmPassword = value === fields['password'].value ? "" : "Passwords must match";
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
            this.showToasterHandler("One or more invalid fields!", false);
        }

    }

    render() {
        return (
            <View style={styles.creatAccContainer}>
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={this.messageColor(this.state.messageColor)}
                        position='top'
                        positionValue={0} />
                </View>
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <BackButton style={{ top: 50 }} />
                        <FormHeader>Create your profile</FormHeader>
                        <FormDescription>Welcome! Fill in the form below to set up your company and user account.</FormDescription>
                        {/* <ImageSelector>Please upload a photo of yourself</ImageSelector> */}
                        <EditableForm
                            fields={this.state.fields}
                            formErrors={this.state.formErrors}
                            handleSubmit={this.handleSubmit}
                            isLoading={this.state.isLoading}
                            handleInputChange={this.handleInputChange}
                            formStyle={styles} />
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
    }
}
export default connect(mapStateToProps)(CreateAcc);

const EditableForm = ({ fields, formErrors, handleSubmit, isLoading, handleInputChange, formStyle }) => {

    return <View style={formStyle.inputForm}>
        {Object.keys(fields).map((key) => {
            return (
                <View key={key}>
                    <Text style={styles.inputFormTitle}>{fields[key].label}</Text>
                    <TextInput
                        value={fields[key].value}
                        type={fields[key].type}
                        label={fields[key].label}
                        multiline={fields[key].multiline}
                        keyboardType={fields[key].keyboardType}
                        placeholder={fields[key].value}
                        onChangeText={(value) => handleInputChange(value, key)}
                        secureTextEntry={fields[key].secureText}
                        autoCapitalize={fields[key].autoCapitalize}
                        style={formStyle.input}
                    />
                    <View style={styles.inputErrorMessageContainer}>
                        {formErrors[fields[key].key] ? <Text style={styles.inputErrorMessageText} >{formErrors[fields[key].key]}</Text> : null}
                    </View>
                </View>
            )
        })}
        <TouchableOpacity
            style={formStyle.buttonContainer}
            onPress={handleSubmit}>
            {isLoading ? <ActivityIndicator size='small' color='white' /> : <Text style={formStyle.buttonText}>Submit</Text>}
        </TouchableOpacity>
    </View>
}