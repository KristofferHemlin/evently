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
    constructor(props) {
        super(props)
        this.state = {
            title: props.navigation.getParam('title', ''),
            parentRoute: props.navigation.getParam('parentRoute', ''),
            http_update_url: props.navigation.getParam('http_update_url', ''),
            http_get_url: props.navigation.getParam('http_get_url', ''),
            fields: props.navigation.getParam('fields', ''),
            isLoading: false,
            wantToEdit: false,
            uID: props.navigation.getParam('uID', '')
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange = (value, key) => {
        let fields = this.state.fields
        fields[key].value = value;
        this.setState({ fields: fields });
    };

    handleSubmit = () => {
        console.log("CLICK!", this.state.fields)
        var fields = Object.keys(this.state.fields).reduce((map, key) => {
            map[key] = this.state.fields[key].value
            return map
        }, {})
        fields.title = this.state.title
        console.log('handleSubmit', fields)
        this.setState({ isLoading: true }, () => {
            axios.put(this.state.http_update_url, fields
            )
                .then((response) => {
                    console.log(response)
                    alert("Information changed");
                    this.setState({
                        isLoading: false,
                        wantToEdit: false,
                    });
                    this.props.navigation.navigate(this.state.parentRoute, {
                        uID: this.state.uID,
                    });
                }).
                then(() => {
                    console.log('bla blal', this.props)
                    this.props.navigation.state.params.onEditSubmit(fields)
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false })
                })
        })

    }


    

    componentDidMount() {

        uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?

        axios.get(this.props.http_get_url)
            .then((response) => {
                let responseArray = []
                let fields = this.state.fields
                for (key in response) {
                    responseArray.push(response[key]);
                }
                fields.forEach(field => { field.value = responseArray[0][field.key] })
                console.log('component did mount', fields)
                this.setState({
                    fields: fields,
                    uID: uID,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        console.log('render', this.state)

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
                                editButtonStatus={this.state.wantToEdit ? true : false}
                            >{'Edit ' + this.state.title}
                            </HeadlineOverview>
                            <View style={styles.line}></View>
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
                        style={formStyle.input}
                        type={fields[key].type}
                        label={fields[key].label}
                        placeholder={fields[key].value}
                        secureTextEntry={false}
                        onChangeText={(value) => handleInputChange(value, key)}
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

