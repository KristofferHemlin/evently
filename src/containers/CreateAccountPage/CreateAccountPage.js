
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    AsyncStorage,
    Platform
} from 'react-native';

import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka

import FormDescription from '../../components/FormDescription/FormDescription';
import FormHeader from '../../components/FormHeader/FormHeader';
import BackButton from '../../components/BackButton/BackButton';
import ImageSelector from '../../components/ImageSelector/ImageSelector';

import URL from '../../config';
import styles from './CreateAccountPage.style';
import * as dataActions from '../../utilities/store/actions/data';
import toasterStyle from '../../components/ToasterStyle/ToasterStyle.style';
import {
    formValid,
    emailRegex,
    phoneRegex
} from '../../helpers/formValidation'


class CreateAccountPage extends Component {

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
            companyDepartment: {
                key: 'companyDepartment',
                name: 'Company Department',
                type: 'text',
                label: 'Company Department',
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
        imageData: null,
        toasterMessageSuccess: false,
    }

    static getDerivedStateFromProps(props, state){
        console.log('props',props);
        console.log('state',state);
    }
    componentDidMount() {
        this.props.onInitUser(this.props.userID)
        console.log('this.props.userInformation', this.props.userInformation);
        if (this.props.userInformation) {
            this.populateTextFields(this.props.userInformation)
        }
        // axios.get(URL + 'users/' + this.props.userID)
        //     .then((response) => {
        //         let responseArray = []
        //         let fields = { ...this.state.fields };
        //         for (key in response) {
        //             responseArray.push(response[key]);
        //         }
        //         for (field in fields) {

        //             if (field === 'firstName') {
        //                 fields[field].value = responseArray[0].firstName
        //             }
        //             if (field === 'lastName') {
        //                 fields[field].value = responseArray[0].lastName
        //             }
        //             if (field === 'email') {
        //                 fields[field].value = responseArray[0].email
        //             }
        //             if (field === 'phone') {
        //                 fields[field].value = responseArray[0].phone
        //             }
        //             if (field === 'companyDepartment') {
        //                 fields[field].value = responseArray[0].companyDepartment
        //             }
        //         }
        //         this.setState({ fields: fields });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    populateTextFields = (userInformation) => {
        let fields = { ...this.state.fields };
        for (field in fields) {
            if (field === 'firstName') {
                fields[field].value = userInformation.firstName
            }
            if (field === 'lastName') {
                fields[field].value = userInformation.lastName
            }
            if (field === 'email') {
                fields[field].value = userInformation.email
            }
            if (field === 'phone') {
                fields[field].value = userInformation.phone
            }
            if (field === 'companyDepartment') {
                fields[field].value = userInformation.companyDepartment
            }
        }
        console.log('userInformation', userInformation);
        console.log('fields', fields);
        this.setState({ fields: fields });
    }

    handleInputChange = (value, i) => {
        let fields = { ...this.state.fields }
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
            case 'Company Department':
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
        this.setState({ toasterMessageSuccess: success })
        let errorString = String(toasterResponse);
        this.refs.toast.show(errorString, 2000);
    }

    handleSubmit = () => {
        const userData = new FormData();
        userData.append("firstName", this.state.fields['firstName'].value)
        userData.append("lastName", this.state.fields['lastName'].value)
        userData.append("email", this.state.fields['email'].value)
        userData.append("phone", this.state.fields['phone'].value)
        userData.append("companyDepartment", this.state.fields['companyDepartment'].value)
        userData.append("password", this.state.fields['password'].value)

        let image = this.state.imageData ? {
            name: this.state.imageData.fileName,
            type: this.state.imageData.type,
            uri:
                Platform.OS === "android" ? this.state.imageData.uri : this.state.imageData.uri.replace("file://", "")
        } :
            null;
        userData.append("image", image)

        if (formValid(this.state.formErrors, this.state.fields)) {
            this.setState({ isLoading: true }, () => {
                // axios.put(URL + 'users/' + this.props.userID + '/imageUpload', userData, {
                axios.put(URL + 'users/' + this.props.userID + '/firstlogin', userData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                    .then((response) => {

                        this.storeUserAccessInfo(
                            this.props.accessToken,
                            this.props.refreshToken,
                            this.props.userID,
                            this.props.roleID,
                        )
                        this.setState({ isLoading: false });
                        this.props.navigation.navigate('EventPageRoute')
                    })
                    .catch((error) => {
                        console.log('error', error.response);
                        this.setState({ isLoading: false })
                        this.showToasterHandler(error.response.data.message, false);
                    })
            })
        } else {
            this.showToasterHandler("One or more invalid fields!", false);
        }

    }

    storeUserAccessInfo = async (accessToken, refreshToken, userID, roleID) => {
        try {
            await AsyncStorage.setItem('REFRESH_TOKEN', refreshToken);
            await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
            await AsyncStorage.setItem('USER_ID', String(userID)); //castar som string så att det funkar på android
            await AsyncStorage.setItem('ROLE_ID', String(roleID));
        } catch (error) {
            console.log(error);
        }
    };


    saveImageHandler = (image) => {
        this.setState({ imageData: image });
    }

    deleteImageHandler = () => {
        this.setState({ imageData: null });
    }

    render() {
        console.log('this.props.userInformation', this.props.userInformation);
        return (
            <View style={styles.pageContainer}>
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={this.state.toasterMessageSuccess ? toasterStyle.successMessage : toasterStyle.errorMessage}
                        position='top'
                        positionValue={0} />
                </View>
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <BackButton />
                        <View style={styles.creatAccContainer}>
                            <FormHeader>Create your profile</FormHeader>
                            <FormDescription>Welcome! Fill in the form below to set up your company and user account.</FormDescription>
                            <ImageSelector
                                saveImageHandler={this.saveImageHandler}
                                deleteImageHandler={this.deleteImageHandler}
                                parentRoute={"CreateAccountPageRoute"}
                                source={{ uri: null }}>
                                Upload a profile image
                            </ImageSelector>
                            <EditableForm
                                fields={this.state.fields}
                                formErrors={this.state.formErrors}
                                handleSubmit={this.handleSubmit}
                                isLoading={this.state.isLoading}
                                handleInputChange={this.handleInputChange}
                                formStyle={styles} />
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInformation: state.userInformation,
        userID: state.userID,
        roleID: state.roleID,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitUser: (userID) => dispatch(dataActions.initUser(userID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountPage);

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