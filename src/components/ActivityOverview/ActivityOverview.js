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
        activityId: null,
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
        console.log('eventTitle', eventTitle);
        axios.get('http://localhost:3000/activities/' + activityID)
        // axios.get('http://10.110.171.68:3000/activities/' + activityID)

            .then((response) => {

                console.log(response);

                // convertion of the date to right format.
                const sTime = response.data.startTime.replace('T', ' ');
                startTime = sTime.split('.')[0]
                const eTime = response.data.endTime.replace('T', ' ');
                endTime = eTime.split('.')[0]

                this.setState({
                    activityTitle: response.data.title,
                    activityId: response.data.id,
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


    eventParticipantsHandler = () => {
        this.props.navigation.navigate('EventParticipantsRoute', {
        })
    }


    render() {

        return (
            <View style={styles.pageContainer}>
            <Header showModal={this.showModalHandler} />
                <ScrollView>

                    <EventImageHeader eventTitle={this.state.eventTitle}></EventImageHeader>

                    <View style={styles.eventInfo}>

                        <HeadlineOverview infoButtonStatus={false} editButtonStatus={false}>{this.state.activityTitle}</HeadlineOverview>

                        <View style={styles.line}></View>
                        <Text style={[styles.titles, styles.subTitles]}>When?</Text>
                        <Text style={styles.ordinaryText}>{this.state.startTime} - {this.state.endTime}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Where?</Text>
                        <Text style={styles.ordinaryText}>{this.state.activityLocation}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>What?</Text>
                        <Text style={styles.ordinaryText}>{this.state.activityDesc}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Who to contact?</Text>
                        {/* Finns ingen att kontakta i databasen atm */}

                        <Text style={styles.subTitles}>Participants</Text>
                        <TouchableOpacity
                            onPress = {this.eventParticipantsHandler}
                        >
                            <Text style={[styles.ordinaryText, styles.participantsText]}>Click here to see activity participants</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Footer  uID={this.state.uID} eventTitle={this.state.eventTitle}/>
            </View>
        )
    }
}

export default ActivityOverview;