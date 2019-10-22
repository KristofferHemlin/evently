import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funkade

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BackButton from '../BackButton/BackButton';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

import URL from '../../config';
import styles from './ChangeUserProfile.style';
import Croatia from '../EventImageHeader/images/CROT.jpg';


class ChangeUserProfile extends Component {

    static navigationOptions = {
        header: null,
    };

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
                key: 'aboutMe',
                name: 'About Me',
                type: 'text',
                value: '',
                secureText: false,
            },
            {
                key: 'allergies',
                name: 'Allergies',
                type: 'text',
                value: '',
                secureText: false,
            },
        ],
        image: Croatia,
    }

    componentDidMount() {
            axios.get( URL + 'users/' + this.props.userID)
            .then((response) => {
                console.log(response)
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
                    if (field.key === 'aboutMe') {
                        field.value = responseArray[0].aboutMe
                    }
                    if (field.key === 'allergies') {
                        field.value = responseArray[0].allergiesOrPreferences
                    }
                })
                this.setState({
                    fields: fields,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phone: response.data.phone,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleInputChange = (value, i) => {
        let fields = [...this.state.fields];
        fields[i].value = value;
        this.setState({ fields: fields });
        console.log(this.state.fields)
    };

    handleSubmit = () => {
        this.setState({ isLoading: true }, () => {
                axios.put(URL + 'users/' + this.props.userID, {
                firstName: this.state.fields[0].value,
                lastName: this.state.fields[1].value,
                email: this.state.fields[2].value,
                phone: this.state.fields[3].value,
                aboutMe: this.state.fields[4].value,
                allergiesOrPreferences: this.state.fields[5].value,
            })
                .then((response) => {
                    this.setState({
                        isLoading: false,
                        wantToEdit: false,
                    });
                    this.props.navigation.navigate('UserProfileRoute');
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false })
                })
        })

    }

    render() {

        return (
            <View style={styles.pageContainer}>
                <Header/>
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View style={styles.userInfo}>
                            <BackButton />
                            <HeadlineOverview
                                infoButtonStatus={false}
                                editButtonStatus={this.state.wantToEdit}
                            >Change User Profile Info</HeadlineOverview>

                            <View style={styles.profilePictureView}>
                                <Image source={this.state.image} style={styles.profilePicture} />
                                <Text style={styles.nameText}>{this.state.firstName} {this.state.lastName}</Text>
                                {/* <Text style={styles.companyText}>{this.state.company}</Text>         */}
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.inputForm}>
                                {this.state.fields.map((input, idx) => {
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
                                                onChangeText={(value) => this.handleInputChange(value, idx)}
                                            />
                                        </View>
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

                <Footer/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
    }
}

export default connect(mapStateToProps)(ChangeUserProfile);
