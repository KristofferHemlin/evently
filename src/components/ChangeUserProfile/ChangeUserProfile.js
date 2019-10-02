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
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka


import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './ChangeUserProfile.style';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

import Croatia from '../EventOverview/images/CROT.jpg';



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
        ],
        image: Croatia,
    }

    componentDidMount() {
        // uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        axios.get('http://localhost:3000/users/109')
            .then((response) => {
                // console.log(response)
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
                })
                this.setState({
                    fields: fields, 
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phone: response.data.phone
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
        console.log("CLICK!")
        this.setState({ isLoading: true }, () => {
            axios.put('http://localhost:3000/users/109', {
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
                <Header />

                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View style={styles.userInfo}>

                            <HeadlineOverview
                                infoButtonStatus={false}
                                editButtonStatus={this.state.wantToEdit}
                            >User Profile</HeadlineOverview>

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

                <Footer />
            </View>
        )
    }
}

export default ChangeUserProfile;
