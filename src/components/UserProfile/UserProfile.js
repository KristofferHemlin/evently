import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './UserProfile.style';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import SettingsModal from '../SettingsModal/SettingsModal';

import URL from '../../config';

import Croatia from '../EventImageHeader/images/CROT.jpg';



class UserProfile extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {

        firstName: '',
        lastName: '',
        // company: '',
        // role: '', 
        email: '',
        phone: '070 999 999',
        about: 'nah bruh',
        allergies: 'Ogillar papaya',
        uID: null,
        eventTitle: '',
        image: Croatia,

        ownProfilePage: true,
        showModal: false,


    }

    fetchUserData = (uID, eventTitle) => {
        console.log(uID);
        // axios.get('http://localhost:3000/users/' + uID)
        axios.get(URL + 'users/' + uID)
            .then((response) => {
                this.setState({
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

    componentDidMount() {
        const uID = Number(this.props.navigation.getParam('uID', ''));
        const eventTitle = this.props.navigation.getParam('eventTitle', '');
        this.fetchUserData(uID, eventTitle);
    }

    componentDidUpdate() {
        // TODO kolla om dåligt för prestandan att ha componentdidupdate såhär
        console.log("UPDATEEEEE!")
        uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        // axios.get('http://localhost:3000/users/' + uID)
        axios.get(URL + 'users/' + uID)
            .then((response) => {
                // sorry för fulkod, fixar det sen
                if (this.state.firstName !== response.data.firstName ||
                    this.state.lastName !== response.data.lastName ||
                    this.state.email !== response.data.email ||
                    this.state.phone !== response.data.phone) {
                    this.setState({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        phone: response.data.phone,
                        uID: uID,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    editButtonHandler = () => {
        this.props.navigation.navigate('ChangeUserProfileRoute', {
            uID: this.state.uID,
            eventTitle: this.state.eventTitle,
        });
    }

    showModalHandler = () => {
        let showModal = this.state.showModal
        this.setState({ showModal: !showModal })
        console.log(this.state.showModal)
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                {this.state.showModal ? <SettingsModal exitModal={this.showModalHandler} /> : null}
                <Header showModal={this.showModalHandler} />
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View style={styles.userInfo}>

                            <HeadlineOverview
                                infoButtonStatus={false}
                                editButtonStatus={true}
                                onEditPress={this.editButtonHandler}
                            >User Profile</HeadlineOverview>

                            <View style={styles.profilePictureView}>
                                <Image source={this.state.image} style={styles.profilePicture} />
                                <Text style={styles.nameText}>{this.state.firstName} {this.state.lastName}</Text>
                                {/* <Text style={styles.companyText}>{this.state.company}</Text>         */}
                            </View>

                            <View style={styles.line}></View>

                            <View>
                                {/* <Text style={styles.subTitles}>Role</Text>
                <Text style={styles.ordinaryText}>{this.state.role}</Text> */}
                                <Text style={styles.subTitles}>Email</Text>
                                <Text style={styles.ordinaryText}>{this.state.email}</Text>
                                <Text style={styles.subTitles}>Phone</Text>
                                <Text style={styles.ordinaryText}>{this.state.phone}</Text>
                                <Text style={styles.subTitles}>About</Text>
                                <Text style={styles.ordinaryText}>{this.state.about}</Text>
                                <Text style={styles.subTitles}>Allergies</Text>
                                <Text style={styles.ordinaryText}>{this.state.allergies}</Text>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
                <Footer  uID={this.state.uID} eventTitle={this.state.eventTitle}/>
            </View>
        )
    }
}

export default UserProfile;
