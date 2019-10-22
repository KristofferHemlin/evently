import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

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
            about: '',
            allergies: '',
        }
        props.navigation.addListener('willFocus', () => {

            this.fetchUserData(this.props.userID);

        })
        console.disableYellowBox = true;
    }

    fetchUserData = (userID) => {
        axios.get(URL + 'users/' + userID)
            .then((response) => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phone: response.data.phone,
                    about: response.data.aboutMe,
                    allergies: response.data.allergiesOrPreferences,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    editButtonHandler = () => {
        this.props.navigation.navigate('ChangeUserProfileRoute')
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
                                editButtonStatus={true}
                                onEditPress={this.editButtonHandler}
                            >User Profile</HeadlineOverview>
                            <View style={styles.profilePictureView}>
                                <View>{profileAvatar}</View>
                                <Text style={styles.nameText}>{this.state.firstName} {this.state.lastName}</Text>
                            </View>
                            <View style={styles.line}></View>

                            <View>
                                <Text style={styles.subTitles}>Email</Text>
                                <Text style={styles.ordinaryText}>{this.state.email}</Text>
                                <Text style={styles.subTitles}>Phone</Text>
                                <Text style={styles.ordinaryText}>{this.state.phone}</Text>
                                <Text style={styles.subTitles}>About Me</Text>
                                <Text style={styles.ordinaryText}>{this.state.about}</Text>
                                <View>
                                    <Text style={styles.subTitles}>Allergies</Text>
                                    <Text style={styles.ordinaryText}>{this.state.allergies}</Text>
                                </View>


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
        roleID: state.roleID
    }
}


export default connect(mapStateToProps)(UserProfile);
