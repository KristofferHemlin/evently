import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BackButton from '../BackButton/BackButton';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

import styles from './ChangeInfo.style';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';

const formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach(
        val => {
            val.length > 0 && (valid = false)
        });

    return valid;
}

const dateRegex = RegExp(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/);
const dateTimeRegex = RegExp(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/)
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const phoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);

class ChangeInfo extends Component {


    static navigationOptions = {
        header: null
    };

    state = {
        title: this.props.navigation.getParam('title', ''),
        parentRoute: this.props.navigation.getParam('parentRoute', ''),
        http_update_url: this.props.navigation.getParam('http_update_url', ''),
        fields: this.props.navigation.getParam('fields', ''),
        formErrors: this.props.navigation.getParam('formErrors', ''),
        isLoading: false,
        wantToEdit: false,
    }

    handleInputChange = (value, key) => {
        const fields = this.state.fields
        fields[key].value = value;
        const formErrors = this.state.formErrors;
        const label = fields[key].label;
        switch (label) {
            case 'Location':
                formErrors.location = value.length < 1 ? "A location is required" : "";
                break;
            case 'Start Date':
                formErrors.startDate = dateRegex.test(value) ? "" : "Please write date on format YYYY-DD-MM";
                break;
            case 'End Date':
                formErrors.endDate = dateRegex.test(value) ? "" : "Please write date on format YYYY-DD-MM";
                break;
            case 'Start Time':
                formErrors.startTime = dateTimeRegex.test(value) ? "" : "Correct format YYYY-DD-MM HH:MM";
                break;
            case 'End Time':
                formErrors.endTime = dateTimeRegex.test(value) ? "" : "Correct format YYYY-DD-MM HH:MM";
                break;
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
            default:
                break;
        }
        this.setState({ fields: fields, formErrors: formErrors }, () => console.log('formError', this.state.formErrors));
    };

    handleSubmit = () => {
        if (formValid(this.state.formErrors, this.state.fields)) {
            var body = Object.keys(this.state.fields).reduce((map, key) => {
                map[key] = this.state.fields[key].value
                return map
            }, {})
            body.title = this.state.title;
            body.token = this.props.token;

            this.setState({ isLoading: true }, () => {
                axios.put(this.state.http_update_url, body)
                    .then(() => this.props.navigation.state.params.onEditSubmit(body))
                    .then(() =>
                        this.setState({ isLoading: false }, () => {
                            this.props.navigation.navigate(this.state.parentRoute, {
                                infoChanged: true,
                            })
                        })
                    )
                    .catch((error) => {
                        console.log(error);
                        this.setState({ isLoading: false })
                    })
            })
        } else {
            this.showToasterHandler("ERROR", false);
        }

    }

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

    render() {
        return (
            !this.state ? <View /> :
                <View style={styles.pageContainer}>
                    <View style={toasterStyle.container}>
                        <Toast ref="toast"
                            style={this.messageColor(this.state.messageColor)}
                            position='top'
                            positionValue={0} />
                    </View>
                    <ScrollView>
                        <KeyboardAwareScrollView>
                            <View style={styles.userInfo}>
                                <BackButton />
                                <HeadlineOverview
                                    infoButtonStatus={false}
                                    editButtonStatus={this.state.wantToEdit}
                                >{'Edit ' + this.state.title}
                                </HeadlineOverview>
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
                </View>)
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
        token: state.token,
    }
}

export default connect(mapStateToProps)(ChangeInfo);





const EditableForm = ({ fields, formErrors, handleSubmit, isLoading, handleInputChange, formStyle }) => {

    return <View style={formStyle.inputForm}>
        {Object.keys(fields).map((key) => {
            console.log('fields[key]', formErrors);
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

