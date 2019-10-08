import React, { Component } from 'react';
import styles from './ChangeEvent.style';
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


class ChangeEvent extends Component {

    static title = `Change Event Info`

    state = {
        fields: [
            {
                key: 'description',
                name: 'Event Description',
                type: 'text',
                label: 'Event Description',
                value: '',
                secureText: false,
            },
            {
                key: 'location',
                name: 'Location',
                type: 'text',
                label: 'Location',
                value: '',
                secureText: false,
            },
            {
                key: 'dates',
                name: 'Dates',
                type: 'text',
                label: 'Dates',
                value: '',
                secureText: false,
            },
            {
                key: 'niceToKnow',
                name: 'Nice-to-know',
                type: 'text',
                value: '',
                label: 'Nice-to-know',
                secureText: false,
            },
        ],
        uID: null,
    }

    handleInputChange = (value, i) => {

        let fields = [...this.state.fields];
        fields[i].value = value;
        this.setState({ fields: fields });
        console.log(this.state.fields)
    };

    handleSubmit = () => {

        console.log("CLICK!", this.state.uID)
        this.setState({ isLoading: true }, () => {
            axios.put('http://localhost:3000/users/' + this.state.uID, {
                // axios.put('http://10.100.134.115:3000/users/' + this.state.uID, {
                firstName: this.state.fields[0].value,
                lastName: this.state.fields[1].value,
                email: this.state.fields[2].value,
                phone: this.state.fields[3].value,
            })
                .then((response) => {
                    console.log(response)
                    alert("Information changed");
                    this.setState({
                        isLoading: false,
                        wantToEdit: false,
                    });
                    this.props.navigation.navigate('UserProfileRoute', {
                        uID: this.state.uID,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false })
                })
        })

    }


    componentDidMount() {

        uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?

        axios.get('http://localhost:3000/users/' + uID)
            // axios.get('http://10.100.134.115:3000/users/' + uID)
            .then((response) => {
                // console.log(response)
                let responseArray = []
                let fields = [...this.state.fields];
                for (key in response) {
                    responseArray.push(response[key]);
                }
                fields.forEach(field => { field.value = responseArray[0][field.key] })
                this.setState({
                    fields: fields,
                    description: response.data.description,
                    location: response.data.location,
                    dates: response.data.dates,
                    niceToKnow: response.data.niceToKnow,
                    uID: uID,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (<View style={styles.pageContainer}>
            <Header />
            <ScrollView>
                <KeyboardAwareScrollView>
                    <View style={styles.userInfo}>
                        <BackButton />
                        <HeadlineOverview
                            infoButtonStatus={false}
                            editButtonStatus={this.state.wantToEdit || false}
                        >
                        </HeadlineOverview>
                        <View style={styles.line}></View>
                        
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
            <Footer />
        </View>)
    }
}

export default ChangeEvent;





const EditableForm = ({ fields, handleSubmit, isLoading, handleInputChange }) =>
    <View style={styles.inputForm}>
        {fields.map((input, idx) => {
            return (
                <View key={input.key}>
                    <Text style={styles.inputFormTitle}>{input.name}</Text>
                    <TextInput
                        value={input.value}
                        style={styles.input}
                        name={input.name}
                        type={input.type}
                        label={input.label}
                        placeholder={input.value}
                        secureTextEntry={input.secureText}
                        onChangeText={(value) => handleInputChange(value, idx)}
                    />
                </View>
            )

        })}
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSubmit}>
            {isLoading ? <ActivityIndicator size='small' color='white' /> : <Text style={styles.buttonText}>Submit </Text>}
        </TouchableOpacity>
    </View>

