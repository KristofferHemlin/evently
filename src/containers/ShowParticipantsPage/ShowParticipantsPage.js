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
            filterWord: '',
            profileArray: [],
            profileArrayFiltered: [],
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
        const activityTitle = this.props.navigation.getParam('activityTitle', '');
        let url;
      
        if(isEvent === true){
            url = URL + 'events/1/users?sort=firstName:asc'
            this.setState({headlineName: 'Event Participants'})
        }
        if(isActivity === true){
            url = URL + 'activities/' + this.props.activityID + '/users?sort=firstName:asc'
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
        tempArray = tempArray.filter(function (user) {
            return user.firstName.toLowerCase().includes(filterWord.toLowerCase())
                || user.lastName.toLowerCase().includes(filterWord.toLowerCase())
                || user.fullName.toLowerCase().includes(filterWord.toLowerCase())
                || user.companyDepartment.toLowerCase().includes(filterWord.toLowerCase())
        }).map(function ({ firstName, lastName, companyDepartment, participantID }) {
            return { firstName, lastName, companyDepartment, participantID };
        });

        this.setState({ profileArrayFiltered: tempArray });

    }

    profilePreviewOnClickHandler = (participantID) => {
        this.props.navigation.navigate('UserPageRoute', {
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
                        placeholderTextColor="gray"
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
                <Footer currentPage={'showParticipants'}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        activityID: state.activityID
    }
}

export default connect(mapStateToProps)(ShowParticipantsPage);