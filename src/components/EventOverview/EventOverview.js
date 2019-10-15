import React, { Component } from 'react';
import Toaster, { ToastStyles } from 'react-native-toaster';
import {
    View,
    Text,
    ScrollView,
    Button,
} from 'react-native';

import axios from 'axios';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {toasterCallback} from '../../helpers/toasterCallback';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';
import SettingsModal from '../SettingsModal/SettingsModal'

import styles from './EventOverview.style.js';
import ToasterStyle from '../GeneralStyle/ToasterStyle.style.js';



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
            uID: null,
            showModal: false,
            goodToKnow: '',
            showModal: false,
            showEditButton: false,
            roleID: null,
            token: '',

            actionMessage: null,
            haveChanged: false,
        }

        props.navigation.addListener('willFocus', () => {
            toasterCallback(this)
            roleID = Number(this.props.navigation.getParam('roleID', ''))
            token = (this.props.navigation.getParam('token', ''))
            if (roleID === 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
            this.setState({ 
                roleID: roleID,
                token: token })
        })
    };

    componentDidMount() {
        uID = Number(this.props.navigation.getParam('uID', ''))
        axios.get('http://localhost:3000/users/' + uID + '/currentevent')
            // axios.get('http://10.110.171.68:3000/users/' + uID + '/currentevent')
            .then((response) => {
                
                const startTime = moment(new Date(response.data.startTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm');
                const endTime = moment(new Date(response.data.endTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm');

                this.setState({
                    eventTitle: response.data.title,
                    eventId: response.data.id,
                    eventDesc: response.data.description,
                    eventLocation: response.data.location,
                    goodToKnow:response.data.goodToKnow,
                    startTime: startTime,
                    endTime: endTime,
                    uID: uID,
                    actionMessage: null,
                    haveChanged: false,
                    roleID: roleID
                })
            })
            .catch((error) => {
                console.log(error);
            });

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
            goodToKnow: input.goodToKnow,
            eventLocation: input.location,
            startTime: input.startTime,
            endTime: input.endTime,
            actionMessage: null,
            haveChanged: false,
        });
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
                    value: this.state.eventDesc,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences', 
                },
                location: {
                    label: 'Location',
                    value: this.state.eventLocation,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                startTime: {
                    label: 'Start Date',
                    value: this.state.startTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none', 
                },
                endTime: {
                    label: 'End Date',
                    value: this.state.endTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none', 
                },
                goodToKnow: {
                    label: 'Good-to-know',
                    value: this.state.goodToKnow,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences', 
                },
            }
        });
    }

    render() {

        return (
            <View style={styles.pageContainer}>

                {!!this.state.actionMessage &&
                    (
                        <View style={{ ...styles.toasterMessage, zIndex: 2 }}>
                            <Toaster message={this.state.actionMessage} />
                        </View>
                    )
                }

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
                        <Text style={styles.subTitles}>Good-to-know</Text>
                        <Text style={styles.ordinaryText}>{this.state.goodToKnow}</Text>

                    </View>
                </ScrollView>

                <Footer roleID={this.state.roleID} uID={this.state.uID} eventTitle={this.state.eventTitle} />
            </View>
        )
    }
}

export default EventOverview;