import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

import Croatia from '../EventImageHeader/images/CROT.jpg';  
import styles from './UserProfile.style';
import URL from '../../config';     

const profileAvatar = <FontAwesome5 size={130} name={'user-circle'} solid color="lightgray" />;

class UserProfile extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '070 999 999',
            about: '',
            allergies: '',
            uID: null,
            eventTitle: '',
            image: Croatia,
            ownProfilePage: true,
            isCompanyManager: false,
            roleID: null,
        }
        props.navigation.addListener('willFocus', () => {
            const uID = Number(this.props.navigation.getParam('uID', ''));
            const participantID = Number(this.props.navigation.getParam('participantID', null));
            let ifParticipant = this.props.navigation.getParam('showParticipant', false);
            const eventTitle = this.props.navigation.getParam('eventTitle', '');
            const roleID = Number(this.props.navigation.getParam('roleID', ''));


            if (ifParticipant === true) {
                this.fetchUserData(participantID, eventTitle);
            } else {
                this.fetchUserData(uID, eventTitle);
            }
            if (participantID === uID || participantID === 0) {
                this.setState({ ownProfilePage: true })
            } else {
                this.setState({ ownProfilePage: false })
            }
            if (roleID === 1) {
                this.setState({ isCompanyManager: true })
            }

            this.setState({ 
                roleID: roleID,
                uID: uID,
                eventTitle: eventTitle, })

        })
        console.disableYellowBox = true;
    }

    fetchUserData = (uID, eventTitle) => {
        console.log(uID);
        // axios.get('http://localhost:3000/users/' + uID)
        axios.get(URL + 'users/' + uID)
            .then((response) => {
                console.log('USerprof response', response);
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phone: response.data.phone,
                    about: response.data.aboutMe,
                    allergies: response.data.allergiesOrPreferences,
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

    render() {
        return (
            <View style={styles.pageContainer}>
                <Header uID= {this.state.uID}/>
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View style={styles.userInfo}>

                            <HeadlineOverview
                                infoButtonStatus={false}
                                editButtonStatus={this.state.ownProfilePage}
                                onEditPress={this.editButtonHandler}
                            >User Profile</HeadlineOverview>
                            <View style={styles.profilePictureView}>


                                <View>{profileAvatar}</View>

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
                                <Text style={styles.subTitles}>About Me</Text>
                                <Text style={styles.ordinaryText}>{this.state.about}</Text>
                                {this.state.ownProfilePage || this.state.isCompanyManager ?
                                    <View>
                                        <Text style={styles.subTitles}>Allergies</Text>
                                        <Text style={styles.ordinaryText}>{this.state.allergies}</Text>
                                    </View> : null}


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
