import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import axios from 'axios';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';
import SettingsModal from '../SettingsModal/SettingsModal';

import styles from './ActivityOverview.style.js';

class ActivityOverview extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

        this.state = {
            eventTitle: '',
            activityID: null,
            activityLocation: '',
            activityDesc: '',
            goodToKnow: '',
            startTime: '',
            endTime: '',
            contact: '',
            uID: null,
            showEditButton: false,
            showModal: false,
        }

        props.navigation.addListener('willFocus', () => {
            roleID = Number(this.props.navigation.getParam('roleID', ''))
            if (roleID === 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
            this.setState({ roleID: roleID })
        })
    }





    componentDidMount() {
        const uID = Number(this.props.navigation.getParam('uID', ''))
        const activityID = Number(this.props.navigation.getParam('activityID', null))
        const eventTitle = this.props.navigation.getParam('eventTitle', null)

        axios.get('http://localhost:3000/activities/' + activityID)
            .then((response) => {
          
                const startTime = moment(new Date(response.data.startTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm');
                const endTime = moment(new Date(response.data.endTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm');

                this.setState({
                    activityTitle: response.data.title,
                    activityID: activityID,
                    activityDesc: response.data.description,
                    activityLocation: response.data.location,
                    goodToKnow: response.data.goodToKnow,
                    startTime: startTime,
                    endTime: endTime,
                    eventTitle: eventTitle,
                    uID: uID
                }
                )
            })
            .catch((error) => {
                console.log(error);
            });

    }


    showParticipantsHandler = () => {

        this.props.navigation.navigate('ShowParticipantsRoute', {
            activity: true,
            activityID: this.state.activityID,
            activityTitle: this.state.activityTitle,
            roleID: this.state.roleID,
        })
    }

    onEditSubmit(input) {
        this.setState({
            activityDesc: input.description,
            activityLocation: input.location,
            startTime: input.startTime,
            endTime: input.endTime,
            goodToKnow: input.goodToKnow,
        })
    }

    handleEditPress = () => {
        this.onEditSubmit = this.onEditSubmit.bind(this)
        var uID = this.state.uID
        this.props.navigation.navigate('ChangeInfoRoute', {
            onEditSubmit: (input) => this.onEditSubmit(input),
            uID: uID,
            title: this.state.activityTitle,
            roleID: this.state.roleID,
            parentRoute: 'ActivityOverviewRoute',
            http_update_url: 'http://localhost:3000/activities/' + this.state.activityID,
            fields: {
                description: {
                    label: 'Description',
                    value: this.state.activityDesc,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences', 
                },
                location: {
                    label: 'Location',
                    value: this.state.activityLocation,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                startTime: {
                    label: 'startTime',
                    value: this.state.startTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none', 
                },
                endTime: {
                    label: 'endTime',
                    value: this.state.endTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none', 
                },
                endTime: {
                    label: 'endTime',
                    value: this.state.endTime
                },
                goodToKnow: {
                    label: 'Good-to-know',
                    value: this.state.goodToKnow
                },
            }
        });
    }


    showModalHandler = () => {
        let showModal = this.state.showModal
        this.setState({ showModal: !showModal })
    }
    modalNavigationHandler = () => {
        let showModal = this.state.showModal;
        this.setState({ showModal: !showModal });
        this.props.navigation.navigate('UserProfileRoute', {
            uID: this.state.uID,
            eventTitle: this.state.eventTitle,
            roleID: this.state.roleID,
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
                <Header showModal={this.showModalHandler} />
                <ScrollView>

                    <EventImageHeader eventTitle={this.state.eventTitle}></EventImageHeader>

                    <View style={styles.eventInfo}>

                        <HeadlineOverview
                            infoButtonStatus={false}
                            onEditPress={() => this.handleEditPress()}
                            editButtonStatus={this.state.showEditButton}>
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
                        <Text style={styles.ordinaryText}>{this.state.activityDesc}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Good-to-know</Text>
                        <Text style={styles.ordinaryText}>{this.state.goodToKnow}</Text>

                        <Text style={styles.subTitles}>Participants</Text>
                        <TouchableOpacity
                            onPress={this.showParticipantsHandler}
                        >
                            <Text style={[styles.ordinaryText, styles.participantsText]}>Click here to see activity participants</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Footer roleID={this.state.roleID} uID={this.state.uID} eventTitle={this.state.eventTitle} />
            </View>
        )
    }
}

export default ActivityOverview;