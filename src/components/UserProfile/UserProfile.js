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

import Croatia from '../EventOverview/images/CROT.jpg';



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
        image: Croatia,

        ownProfilePage: true,


    }

    componentDidMount() {
        // uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        axios.get('http://localhost:3000/users/109')
            .then((response) => {
                this.setState({
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

    componentDidUpdate() {
        // uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        axios.get('http://localhost:3000/users/109')
            .then((response) => {
                this.setState({
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
                <Footer />
            </View>
        )
    }
}

export default UserProfile;
