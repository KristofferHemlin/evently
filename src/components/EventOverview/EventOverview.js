import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';
import SettingsModal from '../SettingsModal/SettingsModal'
import styles from './EventOverview.style.js';

class EventOverview extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

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
            showEditButton: false,
            roleID: null
        }

        props.navigation.addListener('willFocus', () => {
            roleID = Number(this.props.navigation.getParam('roleID', ''))
            console.log('roleID', roleID);
            if (roleID === 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
            this.setState({ roleID: roleID })
        })
    }





    componentDidMount() {
        uID = Number(this.props.navigation.getParam('uID', ''))

        axios.get('http://localhost:3000/users/' + uID + '/currentevent')
            // axios.get('http://10.110.171.68:3000/users/' + uID + '/currentevent')
            .then((response) => {
                console.log('response', response);
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
                    uID: uID,
                    roleID: roleID
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    showModalHandler = () => {
        let showModal = this.state.showModal;
        this.setState({ showModal: !showModal });
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
            roleID: this.state.roleID,
            title: this.state.eventTitle,
            parentRoute: 'EventOverviewRoute',
            http_update_url: 'http://localhost:3000/events/' + 1,
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
                <Header showModal={this.showModalHandler} />
                <ScrollView>

                    <EventImageHeader eventTitle={this.state.eventTitle}></EventImageHeader>

                    <View style={styles.eventInfo}>

                        <HeadlineOverview
                            onEditPress={() => this.handleEditPress()}
                            infoButtonStatus={false}
                            editButtonStatus={this.state.showEditButton}>
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

                <Footer roleID={this.state.roleID} uID={this.state.uID} eventTitle={this.state.eventTitle} />
            </View>
        )
    }
}

export default EventOverview;