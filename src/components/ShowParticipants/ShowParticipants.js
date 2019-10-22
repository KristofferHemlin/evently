import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    ActivityIndicator,
} from 'react-native';


import axios from 'axios';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfilePreview from '../ProfilePreview/ProfilePreview';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

import URL from '../../config';
import styles from './ShowParticipants.style.js';

class ShowParticipants extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            companyDepartment: '',
            filterWord: '',
            profileArray: [],
            profileArrayFiltered: [],
            activityID: null,
            headlineName: '',
            isLoading: false,
        }

        props.navigation.addListener('willFocus', () => {
            this.fetchParticipants()
        })
        console.disableYellowBox = true;
    }

    fetchParticipants() {
        const isEvent = this.props.navigation.getParam('event', false);
        const isActivity = this.props.navigation.getParam('activity', false);
        const activityID = this.props.navigation.getParam('activityID', null);
        const activityTitle = this.props.navigation.getParam('activityTitle', '');
        let url;
      
        if(isEvent === true){
            // url = 'http://localhost:3000/events/1/users?sort=firstName:asc'
            url = URL + 'events/1/users?sort=firstName:asc'
            this.setState({headlineName: 'Event Participants'})
        }
        if(isActivity === true){
            // url = 'http://localhost:3000/activities/' + activityID + '/users?sort=firstName:asc'
            url = URL + 'activities/' + activityID + '/users?sort=firstName:asc'
            this.setState({headlineName: activityTitle})
        }
        this.setState({ isLoading: true }, () => {
            axios.get(url)
                .then((response) => {
                    profileArray = response.data.map((user) => ({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        participantID: user.id,
                        fullName: user.firstName + " " + user.lastName,
                        companyDepartment: user.companyDepartment,
                    }));

                    this.setState({
                        profileArray: profileArray,
                        profileArrayFiltered: profileArray,
                        activityID: activityID,
                        isLoading: false,
                    })

                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false })
                });
        })
    }


    filterHandler(filterWord) {

        let tempArray = this.state.profileArray;
        console.log('tempArray1', tempArray);
        tempArray = tempArray.filter(function (user) {
            return user.firstName.toLowerCase().includes(filterWord.toLowerCase())
                || user.lastName.toLowerCase().includes(filterWord.toLowerCase())
                || user.fullName.toLowerCase().includes(filterWord.toLowerCase())
                || user.companyDepartment.toLowerCase().includes(filterWord.toLowerCase())
        }).map(function ({ firstName, lastName, companyDepartment, participantID }) {
            return { firstName, lastName, companyDepartment, participantID };
        });

        console.log('tempArray2', tempArray);

        this.setState({ profileArrayFiltered: tempArray });

    }

    profilePreviewOnClickHandler = (participantID) => {
        console.log('participantID', participantID);
        this.props.navigation.navigate('ParticipantOverviewRute', {
            participantID: participantID,
            showParticipant: true,
        });
    }

    render() {

        return (
            <View style={styles.pageContainer}>
                <Header/>
                <ScrollView>
                    <HeadlineOverview infoButtonStatus={false} editButtonStatus={false}>{this.state.headlineName}</HeadlineOverview>

                    <TextInput style={styles.searchBar}
                        placeholder="Search current event participants ..."
                        onChangeText={(filterWord) => this.filterHandler(filterWord)}
                    >
                    </TextInput>

                    <Text style={styles.subTitles}>Participants</Text>
                    <View style={styles.line}></View>

                    {this.state.isLoading ? <ActivityIndicator size={'small'} style={styles.loadingIcon} color={'#rgba(74,144,226,1)'} /> :
                        <View style={styles.profileList}>
                            {this.state.profileArrayFiltered.map((input, index) => {
                                return <ProfilePreview
                                    onClick={() => this.profilePreviewOnClickHandler(input.participantID)}
                                    key={index}
                                    companyDepartment={this.state.profileArrayFiltered[index].companyDepartment}>
                                    {this.state.profileArrayFiltered[index].firstName} {this.state.profileArrayFiltered[index].lastName}
                                </ProfilePreview>
                            })}
                        </View>
                    }

                </ScrollView>
                <Footer/>
            </View>
        )
    }
}

export default ShowParticipants;