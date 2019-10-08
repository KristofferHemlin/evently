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

import styles from './ShowParticipants.style.js';

//SHOULD BE RENAMED TO 'ShowParticipants'
class ShowParticipants extends Component {

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

        eventName: 'Kroatien',

        headlineName: '',
    }

    componentDidMount() {
        let isEvent = this.props.navigation.getParam('event', false);
        let isActivity = this.props.navigation.getParam('activity', false);

        if(isEvent == true){
            console.log("Showing Event");
            this.setState({headlineName: 'Event Participants'})

            uID = Number(this.props.navigation.getParam('uID', ''));
            // axios.get('http://localhost:3000/users/' + uID + '/currentevent')
            axios.get('http://localhost:3000/events/1/users?sort=firstName:asc')
                .then((response) => {
                    profileArray = response.data.map((user) => ({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.firstName + " " + user.lastName,
                        companyDepartment: user.companyDepartment
                    }));
    
                    this.setState({
                        profileArray: profileArray,
                        profileArrayFiltered: profileArray
                    })
    
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if(isActivity == true){
            console.log("Showing Activity");
            this.setState({headlineName: 'Activity Participants'})

            uID = Number(this.props.navigation.getParam('uID', ''));
            // axios.get('http://localhost:3000/users/' + uID + '/currentevent')

            axios.get('http://localhost:3000/activities/1/users?sort=firstName:asc')
                .then((response) => {
    
                    profileArray = response.data.map((user) => ({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.firstName + " " + user.lastName,
                        companyDepartment: user.companyDepartment
                    }));
    
                    this.setState({
                        profileArray: profileArray,
                        profileArrayFiltered: profileArray
                    })
    
                })
                .catch((error) => {
                    console.log(error);
                });
        }

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
                <Header />
                <ScrollView>
                    <EventImageHeader eventTitle={this.state.eventName} />
        <HeadlineOverview infoButtonStatus={false} editButtonStatus={false}>{this.state.headlineName}</HeadlineOverview>

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

export default ShowParticipants;