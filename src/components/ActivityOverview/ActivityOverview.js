import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import axios from 'axios';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';

import styles from './ActivityOverview.style.js';

class ActivityOverview extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        eventTitle: '',
        activityID: null,
        activityLocation: '',
        activityDesc: '',
        startTime: '',
        endTime: '',
        contact: '',
        uID: null,
    }


    componentDidMount() {
        const uID = Number(this.props.navigation.getParam('uID', ''))
        const activityID = Number(this.props.navigation.getParam('activityID', null))
        const eventTitle = this.props.navigation.getParam('eventTitle', null)

        axios.get('http://localhost:3000/activities/' + activityID)
            .then((response) => {
                // convertion of the date to right format.
                const sTime = response.data.startTime.replace('T', ' ');
                startTime = sTime.split('.')[0]
                const eTime = response.data.endTime.replace('T', ' ');
                endTime = eTime.split('.')[0]

                this.setState({
                    activityTitle: response.data.title,
                    activityID: activityID,
                    activityDesc: response.data.description,
                    activityLocation: response.data.location,
                    startTime: startTime,
                    endTime: endTime,
                    eventTitle: eventTitle,
                    // uID: uID
                }
                )
            })
            .catch((error) => {
                console.log(error);
            });

    }


    showParticipantsHandler = () => {
        console.log('activityID', this.state.activityID);

        this.props.navigation.navigate('ShowParticipantsRoute', {
            activity: true,
            activityID: this.state.activityID,
            activityTitle: this.state.activityTitle,
        })
    }

    onEditSubmit(input) {
        this.setState({
            activityDesc: input.description,
            activityLocation: input.location,
            startTime: input.startTime,
            endTime: input.endTime,
        })
    }

    handleEditPress = () => {
        this.onEditSubmit = this.onEditSubmit.bind(this)
        var uID = this.state.uID
        console.log(this.state.activityID)
        this.props.navigation.navigate('ChangeInfoRoute', {
            onEditSubmit: (input) => this.onEditSubmit(input),
            uID: uID,
            title: this.state.activityTitle,
            parentRoute: 'ActivityOverviewRoute',
            http_update_url: 'http://localhost:3000/activities/' + this.state.activityID,
            fields: {
                description: {
                    label: 'Description',
                    value: this.state.activityDesc
                },
                location: {
                    label: 'Location',
                    value: this.state.activityLocation
                },
                startTime: {
                    label: 'startTime',
                    value: this.state.startTime
                },
                endTime: {
                    label: 'endTime',
                    value: this.state.endTime
                },
            }
        });
        console.log('leaving ActivityOverview', this.state.uID)
    }

    render() {

        return (
            <View style={styles.pageContainer}>
                <Header showModal={this.showModalHandler} />
                <ScrollView>

                    <EventImageHeader eventTitle={this.state.eventTitle}></EventImageHeader>

                    <View style={styles.eventInfo}>

                        <HeadlineOverview
                            infoButtonStatus={false}
                            onEditPress={() => this.handleEditPress()}
                            editButtonStatus={true}>
                            {this.state.activityTitle}
                        </HeadlineOverview>

                        <View style={styles.line}></View>
                        <Text style={[styles.titles, styles.subTitles]}>When?</Text>
                        <Text style={styles.ordinaryText}>{this.state.startTime} - {this.state.endTime}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Where?</Text>
                        <Text style={styles.ordinaryText}>{this.state.activityLocation}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>What?</Text>
                        <Text style={styles.ordinaryText}>{this.state.activityDesc}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Who to contact?</Text>

                        <Text style={styles.subTitles}>Participants</Text>
                        <TouchableOpacity
                            onPress={this.showParticipantsHandler}
                        >
                            <Text style={[styles.ordinaryText, styles.participantsText]}>Click here to see activity participants</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Footer uID={this.state.uID} eventTitle={this.state.eventTitle} />
            </View>
        )
    }
}

export default ActivityOverview;