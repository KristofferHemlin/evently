import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import OneSignal from 'react-native-onesignal';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfilePreview from '../ProfilePreview/ProfilePreview';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';
import SettingsModal from '../SettingsModal/SettingsModal'

import URL from '../../config';
import styles from './EventOverview.style.js';

// import Croatia from './images/CROT.jpg';

const infoCircleIcon = <FontAwesome5 size={20} name={'info-circle'} solid color="rgba(74,144,226,1)" />;

class EventOverview extends Component {


    static navigationOptions = {
        header: null,
    };

    constructor(properties) {
        super(properties);
        OneSignal.init("4a9de87e-f4be-42e2-a00a-0246fb25df01");
        OneSignal.inFocusDisplaying(2);
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);

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
            ifNotification: false,
        }
    }


    componentDidMount() {
        uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        // axios.get('http://localhost:3000/users/' + uID + '/currentevent')
        axios.get(URL + 'users/' + uID + '/currentevent')
            .then((response) => {

                // convertion of the date to right format.
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
                }
                )
            })
            .catch((error) => {
                console.log(error);
            });

    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived = (notification) => {
        console.log('onrecevied', this.state.ifNotification);
        this.setState({ ifNotification: true }, () => {
            console.log('onrecevied2', this.state.ifNotification);
        })
        console.log("Notification received: ", notification);
    }

    // onOpened(openResult) {
    //     console.log('Message: ', openResult.notification.payload.body);
    //     console.log('Data: ', openResult.notification.payload.additionalData);
    //     console.log('isActive: ', openResult.notification.isAppInFocus);
    //     console.log('openResult: ', openResult);
    // }

    // onIds(device) {
    //     console.log('Device info: ', device);
    // }

    bellIconClickedHandler = () => {
        this.setState({ ifNotification: false })
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


    render() {
        console.log('render', this.state.ifNotification);

        const isEditUser = this.state.isEditUser;

        return (
            <View style={styles.pageContainer}>
                {this.state.showModal ?
                    <SettingsModal
                        exitModal={this.showModalHandler}
                        navigationModal={this.modalNavigationHandler}

                    /> : null}
                <Header
                    showModal={this.showModalHandler}
                    showNotificationBadge={this.state.ifNotification}
                    bellIconClicked={this.bellIconClickedHandler} />
                <ScrollView>

                    <EventImageHeader eventTitle={this.state.eventTitle}></EventImageHeader>

                    <View style={styles.eventInfo}>

                        <HeadlineOverview infoButtonStatus={true} editButtonStatus={true}>Event Overview</HeadlineOverview>
                        {/* <View style={styles.mainTitleView}>
                            <View style={styles.mainTitleViewLeft}> 
                                <Text style={[styles.titles, styles.mainTitle]}>Event overview</Text>
                                <TouchableOpacity style={styles.infoButton}>
                                 {infoCircleIcon}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                            <Text style={styles.editButton}> Edit </Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.line}></View>
                        <Text style={[styles.titles, styles.subTitles]}>Event description</Text>
                        <Text style={styles.ordinaryText}>{this.state.eventDesc}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Location</Text>
                        <Text style={styles.ordinaryText}>{this.state.eventLocation}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Dates</Text>
                        <Text style={styles.ordinaryText}>{this.state.startTime} - {this.state.endTime}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Organizers</Text>

                        <ProfilePreview />

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