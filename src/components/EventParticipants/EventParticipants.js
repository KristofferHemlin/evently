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

import styles from './EventParticipants.style.js';

class EventParticipants extends Component{

    static navigationOptions = {
        header : null,
      };

      state = {
        firstName: '',
        lastName: '', 
        companyDepartment: '',
        uID: null,

        filterWord: '',
        profileArray: [],

        eventName: 'Kroatien'
    }

    componentDidMount () {
        uID = Number(this.props.navigation.getParam('uID', ''));
        // axios.get('http://localhost:3000/users/' + uID + '/currentevent')
        axios.get('http://localhost:3000/events/1/users')
        .then((response) => {

        // console.log(response);

        profileArray = response.data.map((user) => ({
            firstName:user.firstName,
            lastName:user.lastName,
            companyDepartment:user.companyDepartment
        }));

        this.setState({
            profileArray: profileArray
        })

        })
        .catch((error) => {
            console.log(error);
        });     
    }
 
    render(){

        const filterWord = this.state.filterWord;

        this.state.profileArray = this.state.profileArray.filter(function(person) {
            return person.firstName.includes(filterWord);
        });

        return(
            <View style={styles.pageContainer}>
                <Header/>
                <ScrollView>
                    <EventImageHeader eventTitle={this.state.eventName}/>
                    <HeadlineOverview infoButtonStatus={false} editButtonStatus={false}>Event Participants</HeadlineOverview>

                    <TextInput style={styles.searchBar}
                        placeholder = "Search current event participants ..."
                        onChangeText={(filterWord) => this.setState({filterWord})}
                        value={this.state.filterWord}
                    >
                    </TextInput>

                    <Text style={styles.subTitles}>Participants</Text>
                    <View style={styles.line}></View>


                    <View style={styles.profileList}>
                        {this.state.profileArray.map((input, index) => {
                            return <ProfilePreview
                                key={index}
                                companyDepartment={profileArray[index].companyDepartment}>
                                {profileArray[index].firstName} {profileArray[index].lastName}
                                </ProfilePreview>
                            })}
                    </View>

                </ScrollView>
                <Footer/>
            </View>
        )
    }
}

export default EventParticipants;