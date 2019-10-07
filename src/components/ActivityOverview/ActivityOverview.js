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
        activityTitle: '',
        activityId: null,
        activityLocation: '',
        activityDesc: '',
        startTime: '',
        endTime: '',
        contact: '',
        uID: null,
    }
    

    componentDidMount() {
        uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        axios.get('http://localhost:3000/activities/1')

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
                <ScrollView>

                    <EventImageHeader activityTitle={this.state.activityTitle}></EventImageHeader>

                    <View style={styles.eventInfo}>

                        <HeadlineOverview infoButtonStatus={false} editButtonStatus={false}>{this.state.activityTitle}</HeadlineOverview>

                        <View style={styles.line}></View>
                        <Text style={[styles.titles, styles.subTitles]}>When?</Text>
                        <Text style={styles.ordinaryText}>{this.state.startTime}</Text>
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

                <Footer />
            </View>
        )
    }
}

export default ActivityOverview;