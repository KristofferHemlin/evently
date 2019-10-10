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

import Croatia from '../EventImageHeader/images/CROT.jpg';



class UserProfile extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
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
            roleID: null,
        }
        props.navigation.addListener('willFocus', () => {
            const uID = Number(this.props.navigation.getParam('uID', ''));
            const participantID = Number(this.props.navigation.getParam('participantID', null));
            const eventTitle = this.props.navigation.getParam('eventTitle', '');
            const roleID = Number(this.props.navigation.getParam('roleID', ''));
            
            if(participantID === 0){
                console.log('null');
                this.fetchUserData(uID, eventTitle);
            } else {
                console.log('not null');
                this.fetchUserData(participantID, eventTitle);
            }
            if(participantID === uID || participantID === 0){
                this.setState({ownProfilePage: true})
            } else {
                this.setState({ownProfilePage: false})
            }

            this.setState({roleID: roleID})
                          
        })
    }



    fetchUserData = (uID, eventTitle) => {
        axios.get('http://localhost:3000/users/' + uID)
            // axios.get('http://10.110.171.68:3000/users/' + uID)
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

    editButtonHandler = () => {
        this.props.navigation.navigate('ChangeUserProfileRoute', {
            uID: this.state.uID,
            eventTitle: this.state.eventTitle,
            roleID: this.state.roleID,
        });
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

                            <HeadlineOverview
                                infoButtonStatus={false}
                                editButtonStatus={this.state.ownProfilePage}
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
                <Footer roleID={this.state.roleID} uID={this.state.uID} eventTitle={this.state.eventTitle} />
            </View>
        )
    }
}

export default UserProfile;
