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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import SettingsModal from '../SettingsModal/SettingsModal';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BackButton from '../BackButton/BackButton';
import styles from './ChangeUserProfile.style';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

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
        ],
        image: Croatia,
        uID: null,
        eventTitle: '',
        showModal: false,
    }

    componentDidMount() {
        const uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        const eventTitle = this.props.navigation.getParam('eventTitle', '');
        axios.get('http://localhost:3000/users/' + uID)
            // axios.get('http://10.110.171.68:3000/users/' + uID)
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
                    phone: response.data.phone,
                    uID: uID,
                    eventTitle: eventTitle,
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
        console.log("CLICK!", this.state.uID)
        this.setState({ isLoading: true }, () => {
            axios.put('http://localhost:3000/users/' + this.state.uID, {
                // axios.put('http://10.110.171.68:3000/users/' + this.state.uID, {
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
                        roleID: this.state.roleID,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false })
                })
        })

    }

    showModalHandler = () => {
        let showModal = this.state.showModal
        this.setState({ showModal: !showModal })
        console.log(this.state.showModal)
    }
    modalNavigationHandler = () => {
        let showModal = this.state.showModal;
        this.setState({ showModal: !showModal }); 
        this.props.navigation.navigate('UserProfileRoute', {
            uID: this.state.uID,
            eventTitle: this.state.eventTitle,
            roleID: this.state.roleID,
        });          
    }
    render() {

        return (
            <View style={styles.pageContainer}>
                {this.state.showModal ?
                    <SettingsModal
                        exitModal={this.showModalHandler}
                        navigationModal={this.modalNavigationHandler}

                    /> : null}
                <Header showModal={this.showModalHandler} />
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

                <Footer roleID={this.state.roleID} uID={this.state.uID} eventTitle={this.state.eventTitle} />
            </View>
        )
    }
}

export default ChangeUserProfile;
