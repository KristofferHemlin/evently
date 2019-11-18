import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import axios from 'axios';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfilePreview from '../../components/ProfilePreview/ProfilePreview';
import HeadlineOverview from '../../components/HeadlineOverview/HeadlineOverview';

import URL from '../../config';
import styles from './ShowParticipantsPage.style';

class ShowParticipantsPage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            companyDepartment: '',
            profileImageUrl: null,
            profileArray: [],
            headlineName: '',
            isLoading: false,
            filterWord: '',
        }

        props.navigation.addListener('willFocus', () => {
            this.setState({filterWord: ''})
            this.fetchParticipants()
        })
        console.disableYellowBox = true;
    }

    fetchParticipants() {
        const isEvent = this.props.navigation.getParam('event', false);
        const isActivity = this.props.navigation.getParam('activity', false);
        const activityTitle = this.props.navigation.getParam('activityTitle', '');
        let url;

        if (isEvent === true) {
            url = URL + 'events/1/users?sort=firstName:asc'
            this.setState({ headlineName: 'Event Participants' })
        }
        if (isActivity === true) {
            url = URL + 'activities/' + this.props.activityID + '/users?sort=firstName:asc'
            this.setState({ headlineName: activityTitle })
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
                        profileImageUrl: user.profileImageUrl,
                    }));

                    this.setState({
                        profileArray: profileArray,
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
        return tempArray.filter(function (user) {
            return user.firstName.toLowerCase().includes(filterWord.toLowerCase())
                || user.lastName.toLowerCase().includes(filterWord.toLowerCase())
                || user.fullName.toLowerCase().includes(filterWord.toLowerCase())
                || user.companyDepartment.toLowerCase().includes(filterWord.toLowerCase())
        }).map(function ({ firstName, lastName, companyDepartment, participantID, profileImageUrl }) {
            return { firstName, lastName, companyDepartment, participantID, profileImageUrl };
        });
    }

    profilePreviewOnClickHandler = (participantID) => {
        this.props.navigation.navigate('UserPageRoute', {
            participantID: participantID,
            showParticipant: true,
        });
    }

    render() {

        let profileArrayFiltered = this.filterHandler(this.state.filterWord);

        return (
            <View style={styles.pageContainer}>
                <Header />
                <ScrollView>
                    <HeadlineOverview infoButtonStatus={false} editButtonStatus={false}>{this.state.headlineName}</HeadlineOverview>

                    <TextInput style={styles.searchBar}
                        placeholder="Search current event participants ..."
                        placeholderTextColor="gray"
                        autoCorrect={false}
                        value={this.state.filterWord}
                        onChangeText = { value => this.setState ({filterWord : value})}
                    >
                    </TextInput>

                    <Text style={styles.subTitles}>Participants</Text>
                    <View style={styles.line}></View>

                    {this.state.isLoading ?
                        <ActivityIndicator size={'small'} style={styles.loadingIcon} color={'#rgba(74,144,226,1)'} /> :
                        <View style={styles.profileList}>
                            {profileArrayFiltered.map((input, index) => {
                                return <ProfilePreview
                                    source={{ uri: profileArrayFiltered[index].profileImageUrl }}
                                    onClick={() => this.profilePreviewOnClickHandler(input.participantID)}
                                    key={index}
                                    companyDepartment={profileArrayFiltered[index].companyDepartment}>
                                    {profileArrayFiltered[index].firstName} {profileArrayFiltered[index].lastName}
                                </ProfilePreview>
                            })}
                        </View>
                    }

                </ScrollView>
                <Footer currentPage={'showParticipants'} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        activityID: state.informationHandler.activityID
    }
}

export default connect(mapStateToProps)(ShowParticipantsPage);