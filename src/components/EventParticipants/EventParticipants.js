import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
} from 'react-native';

import axios from 'axios';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfilePreview from '../ProfilePreview/ProfilePreview';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';
import SettingsModal from '../SettingsModal/SettingsModal';

import styles from './EventParticipants.style.js';

class EventParticipants extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        firstName: '',
        lastName: '',
        companyDepartment: '',
        uID: null,

        filterWord: '',
        profileArray: [],
        profileArrayFiltered: [],
        showModal: false,

        eventName: 'Kroatien'
    }

    componentDidMount() {
        uID = Number(this.props.navigation.getParam('uID', ''));
        // axios.get('http://localhost:3000/users/' + uID + '/currentevent')
        axios.get('http://localhost:3000/events/1/users?sort=firstName:asc')
            .then((response) => {

                // console.log(response);

                profileArray = response.data.map((user) => ({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    fullName: user.firstName + " " + user.lastName,
                    companyDepartment: user.companyDepartment
                }));

                this.setState({
                    profileArray: profileArray,
                    profileArrayFiltered: profileArray,
                    uID: uID,
                })

            })
            .catch((error) => {
                console.log(error);
            });
    }

    showModalHandler = () => {
        let showModal = this.state.showModal;
        this.setState({ showModal: !showModal });
        console.log(this.state.showModal);
    }

    modalNavigationHandler = () => {
        let showModal = this.state.showModal;
        this.setState({ showModal: !showModal }); 
        this.props.navigation.navigate('UserProfileRoute', {
            uID: this.state.uID
        });          
    }

    filterHandler(filterWord) {

        let tempArray = this.state.profileArray;

        tempArray = tempArray.filter(function (user) {
            return user.firstName.toLowerCase().includes(filterWord.toLowerCase())
            || user.lastName.toLowerCase().includes(filterWord.toLowerCase())
            || user.fullName.toLowerCase().includes(filterWord.toLowerCase())
            || user.companyDepartment.toLowerCase().includes(filterWord.toLowerCase())
        }).map(function ({ firstName, lastName, companyDepartment }) {
            return { firstName, lastName, companyDepartment };
        });

        this.setState({ profileArrayFiltered: tempArray });

    }

    render() {

        const filterWord = this.state.filterWord;

        return (
            <View style={styles.pageContainer}>
            {this.state.showModal ? 
                    <SettingsModal 
                    exitModal={this.showModalHandler} 
                    navigationModal={this.modalNavigationHandler}

                /> : null}
                <Header showModal={this.showModalHandler}/>
                <ScrollView>
                    <EventImageHeader eventTitle={this.state.eventName} />
                    <HeadlineOverview infoButtonStatus={false} editButtonStatus={false}>Event Participants</HeadlineOverview>

                    <TextInput style={styles.searchBar}
                        placeholder="Search current event participants ..."
                        onChangeText={(filterWord) => this.filterHandler(filterWord)}
                        // autoCapitalize={'none'}
                    >
                    </TextInput>

                    <Text style={styles.subTitles}>Participants</Text>
                    <View style={styles.line}></View>


                    <View style={styles.profileList}>
                        {this.state.profileArrayFiltered.map((input, index) => {
                            return <ProfilePreview
                                key={index}
                                companyDepartment={this.state.profileArrayFiltered[index].companyDepartment}>
                                {this.state.profileArrayFiltered[index].firstName} {this.state.profileArrayFiltered[index].lastName}
                            </ProfilePreview>
                        })}
                    </View>

                </ScrollView>
                <Footer />
            </View>
        )
    }
}

export default EventParticipants;