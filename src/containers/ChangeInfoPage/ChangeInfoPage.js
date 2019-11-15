import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast'

import BackButton from '../../components/BackButton/BackButton';
import HeadlineOverview from '../../components/HeadlineOverview/HeadlineOverview';
import ImageSelector from '../../components/ImageSelector/ImageSelector';
import URL from '../../config';
import * as formActions from '../../utilities/store/actions/form';
import styles from './ChangeInfoPage.style';
import toasterStyle from '../../components/ToasterStyle/ToasterStyle.style';
import {
    formValid,
    dateRegex,
    dateTimeRegex,
    emailRegex,
    phoneRegex
} from '../../helpers/formValidation';


class ChangeInfoPage extends Component {


    static navigationOptions = {
        header: null
    };

    state = {
        parentRoute: this.props.navigation.getParam('parentRoute', ''),
        http_update_url: this.props.navigation.getParam('http_update_url', ''),
        fields: this.props.navigation.getParam('fields', ''),
        formErrors: this.props.navigation.getParam('formErrors', ''),
        wantToEdit: false,
        imageData: null,
        imageUrl: this.props.navigation.getParam('imageUrl', null),
        showImagePicker: this.props.navigation.getParam('showImagePicker', true),
        headlineTitle: this.props.navigation.getParam('headlineTitle', ''),
    }

    componentDidMount() {
        this.props.onInitSaveFormData()
    }

    componentDidUpdate() {
        if (this.props.showToasterMessage === true && this.props.formDataSaved === false) {
            this.refs.toast.show(this.props.formError.response.data.message, 2000);
            this.props.setToasterHide();
        }
        if (this.props.formDataSaved) {
            this.props.navigation.navigate(this.state.parentRoute)
        }
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
            case 'Company Department':
                formErrors.companyDepartment = value.length < 1 || value.length > 3 ? "Invalid department" : "";
                break;
            case 'Password':
                formErrors.password = value.length < 6 ? "Minimum 6 characters required" : "";
                formErrors.confirmPassword = value === fields['confirmPassword'].value ? "" : "Passwords must match";
                break;
            case 'New Password':
                formErrors.password = value.length < 6 ? "Minimum 6 characters required" : "";
                formErrors.confirmPassword = value === fields['confirmPassword'].value ? "" : "Passwords must match";
                break;
            case 'Confirm Password':
                formErrors.confirmPassword = value === fields['newPassword'].value ? "" : "Passwords must match";
                break;
            default:
                break;
        }
        this.setState({ fields: fields, formErrors: formErrors });
    };

    handleSubmit = () => {

        if (formValid(this.state.formErrors)) {
            var body = Object.keys(this.state.fields).reduce((map, key) => {
                map.append(key, this.state.fields[key].value)
                return map
            }, new FormData())
            body.append("title", this.props.eventTitle);

            if (this.state.showImagePicker) {
                let image = null;
                if (this.state.imageData) {
                    image = {
                        name: this.state.imageData.fileName,
                        type: this.state.imageData.type,
                        uri:
                            Platform.OS === "android" ? this.state.imageData.uri : this.state.imageData.uri.replace("file://", "")
                    }
                }
                if (this.state.imageUrl == null) {
                    image = null;
                    let axiosUrl;
                    if (this.state.parentRoute === "ProfilePageRoute") {
                        axiosUrl = URL + 'users/' + this.props.userID + '/profileimage';
                    } else {
                        axiosUrl = this.state.http_update_url + '/coverimage';
                    }

                    axios.delete(axiosUrl)
                        .catch((error) => {
                            console.log(error);
                        })
                }
                body.append("image", image)
            }
            this.props.onSaveFormData(this.state.http_update_url, body);

        } else {
            this.showToasterHandler("One or more invalid fields!");
        }
    }

    saveImageHandler = (image) => {
        this.setState({
            imageData: image,
            imageUrl: image.uri,
        });
    }

    deleteImageHandler = () => {
        this.setState({ imageUrl: null });
    }

    showToasterHandler = (toasterResponse) => {
        let errorString = String(toasterResponse);
        this.refs.toast.show(errorString, 2000);
    }

    render() {
        return (
            !this.state ? <View /> :
                <View style={styles.pageContainer}>
                    <View style={toasterStyle.container}>
                        <Toast ref="toast"
                            style={toasterStyle.errorMessage}
                            position='top'
                            positionValue={0} />
                    </View>
                    <ScrollView>
                        <KeyboardAwareScrollView>
                            <BackButton />
                            <HeadlineOverview
                                infoButtonStatus={false}
                                editButtonStatus={this.state.wantToEdit}
                            >{'Edit ' + this.state.headlineTitle}
                            </HeadlineOverview>

                            {
                                this.state.showImagePicker ?
                                    <ImageSelector
                                        saveImageHandler={this.saveImageHandler}
                                        deleteImageHandler={this.deleteImageHandler}
                                        parentRoute={this.state.parentRoute}
                                        source={{ uri: this.state.imageUrl }}>
                                        Press to change photo
                                    </ImageSelector> :
                                    null
                            }

                            <View style={styles.editFormContainer}>
                                <EditableForm
                                    fields={this.state.fields}
                                    formErrors={this.state.formErrors}
                                    handleSubmit={this.handleSubmit}
                                    isLoading={this.props.saveFormDataLoading}
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
        eventTitle: state.informationHandler.eventInformation.title,
        userID: state.informationHandler.userID,
        token: state.informationHandler.token,
        saveFormDataLoading: state.form.saveFormDataLoading,
        formDataSaved: state.form.formDataSaved,
        formError: state.form.formError,
        showToasterMessage: state.form.showToasterMessage,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setToasterShow: () => dispatch(formActions.setToasterShow()),
        setToasterHide: () => dispatch(formActions.setToasterHide()),
        onSaveFormData: (http_update_url, body) => dispatch(formActions.saveFormData(http_update_url, body)),
        onInitSaveFormData: () => dispatch(formActions.saveFormDataInit()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfoPage);


const EditableForm = ({ fields, formErrors, handleSubmit, isLoading, handleInputChange, formStyle }) => {

    return <View style={formStyle.inputForm}>
        {Object.keys(fields).map((key) => {

            return (
                <View key={key}>
                    <Text style={styles.inputFormTitle}>{fields[key].label}</Text>
                    {Platform.OS === 'ios' ?
                        <React.Fragment>
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
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <TextInput
                                value={fields[key].value}
                                type={fields[key].type}
                                label={fields[key].label}
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
                        </React.Fragment>

                    }
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

