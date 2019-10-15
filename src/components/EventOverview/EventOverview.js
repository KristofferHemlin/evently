import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import OneSignal from 'react-native-onesignal';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';
import SettingsModal from '../SettingsModal/SettingsModal'

import URL from '../../config';
import styles from './EventOverview.style.js';

class EventOverview extends Component {


    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        OneSignal.init("4a9de87e-f4be-42e2-a00a-0246fb25df01");

        this.state = {
            eventTitle: '',
            eventId: null,
            eventLocation: '',
            eventDesc: '',
            startTime: '',
            endTime: '',
            niceToKnow: '',
            uID: null,
            showModal: false,
        }
    }


    componentDidMount() {
        uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        // axios.get('http://localhost:3000/users/' + uID + '/currentevent')
        axios.get(URL + 'users/' + uID + '/currentevent')
            .then((response) => {
                const sTime = response.data.startTime.replace('T', ' ');
                startTime = sTime.split('.')[0]
                const eTime = response.data.endTime.replace('T', ' ');
                endTime = eTime.split('.')[0]

                this.setState({
                    eventTitle: response.data.title,
                    eventId: response.data.id,
                    eventDesc: response.data.description,
                    eventLocation: response.data.location,
                    startTime: startTime,
                    endTime: endTime,
                    uID: uID
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
            uID: this.state.uID,
            eventTitle: this.state.eventTitle,
        });
    }


    onEditSubmit(input) {
        this.setState({
            eventDesc: input.description,
            niceToKnow: input.niceToKnow,
            eventLocation: input.location,
            startTime: input.startTime,
            endTime: input.endTime,
        })
    }

    handleEditPress = () => {
        this.onEditSubmit = this.onEditSubmit.bind(this)
        var uID = this.state.uID
        this.props.navigation.navigate('ChangeInfoRoute', {
            onEditSubmit: (input) => this.onEditSubmit(input),
            uID: uID,
            title: this.state.eventTitle,
            parentRoute: 'EventOverviewRoute',
            http_update_url:  'http://localhost:3000/events/' + 1,
            http_get_url: 'http://localhost:3000/users/' + uID + '/currentevent',
            fields: {
                description: {
                    label: 'Description',
                    value: this.state.eventDesc
                },
                location: {
                    label: 'Location',
                    value: this.state.eventLocation
                },
                startTime: {
                    label: 'Start Date',
                    value: this.state.startTime
                },
                endTime: {
                    label: 'End Date',
                    value: this.state.endTime
                },
                niceToKnow: {
                    label: 'Nice-to-know',
                    value: this.state.niceToKnow
                },
            }
        }); 
    }


    render() {
        return (
            <View style={styles.pageContainer}>
                {this.state.showModal ?
                    <SettingsModal
                        exitModal={this.showModalHandler}
                        navigationModal={this.modalNavigationHandler}

                    /> : null}
                <Header
                    showModal={this.showModalHandler}
                    bellIconClicked={this.bellIconClickedHandler} />
                <ScrollView>
                    <EventImageHeader eventTitle={this.state.eventTitle}></EventImageHeader>
                    <View style={styles.eventInfo}>
                        <HeadlineOverview
                            onEditPress={() => this.handleEditPress()}
                            infoButtonStatus={false}
                            editButtonStatus={true}>
                                Event Overview
                        </HeadlineOverview>
                        <View style={styles.line}></View>
                        <Text style={[styles.titles, styles.subTitles]}>Event description</Text>
                        <Text style={styles.ordinaryText}>{this.state.eventDesc}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Location</Text>
                        <Text style={styles.ordinaryText}>{this.state.eventLocation}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Dates</Text>
                        <Text style={styles.ordinaryText}>{this.state.startTime} - {this.state.endTime}</Text>
                        <Text style={styles.subTitles}>Nice to know</Text>
                        <Text style={styles.ordinaryText}>{this.state.niceToKnow}</Text>
                    </View>
                </ScrollView>

                <Footer uID={this.state.uID} eventTitle={this.state.eventTitle} />
            </View>
        )
    }
}

export default EventOverview;