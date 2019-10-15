import React, { Component } from 'react';

import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BackButton from '../BackButton/BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import styles from './ChangeInfo.style';

class ChangeInfo extends Component {


    static navigationOptions = {
        header: null
    };

    state = {
            title: this.props.navigation.getParam('title', ''),
            parentRoute: this.props.navigation.getParam('parentRoute', ''),
            http_update_url: this.props.navigation.getParam('http_update_url', ''),
            fields: this.props.navigation.getParam('fields', ''),
            isLoading: false,
            wantToEdit: false,
            uID: this.props.navigation.getParam('uID', '')
    }

    handleInputChange = (value, key) => {
        let fields = this.state.fields
        fields[key].value = value;
        this.setState({ fields: fields });
    };

    handleSubmit = () => {
        var fields = Object.keys(this.state.fields).reduce((map, key) => {
            map[key] = this.state.fields[key].value
            return map
        }, {})
        fields.title = this.state.title

        this.setState({ isLoading: true }, () => {
            axios.put(this.state.http_update_url, fields)
                .then(() => this.props.navigation.state.params.onEditSubmit(fields))
                .then(() => this.props.navigation.navigate(this.state.parentRoute))
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false })
                })
        })
    }

    render() {
        return (
            !this.state ? <View /> :
                <View style={styles.pageContainer}>
                    <Header />
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
                                    handleSubmit={this.handleSubmit}
                                    isLoading={this.state.isLoading}
                                    handleInputChange={this.handleInputChange}
                                    formStyle={styles} />
                                    
                            </View>
                        </KeyboardAwareScrollView>
                    </ScrollView>
                    <Footer />
                </View>)
    }
}

export default ChangeInfo;





const EditableForm = ({ fields, handleSubmit, isLoading, handleInputChange, formStyle }) => {

    return <View style={formStyle.inputForm}>
        {Object.keys(fields).map((key) => {
            return (
                <View key={key}>
                    <Text style={styles.inputFormTitle}>{fields[key].label}</Text>
                    <TextInput
                        value={fields[key].value}
                        type={fields[key].type}
                        label={fields[key].label}
                        placeholder={fields[key].value}
                        onChangeText={(value) => handleInputChange(value, key)}
                        secureTextEntry={false}
                        style={formStyle.input}
                    />
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

