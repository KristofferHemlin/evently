import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Toast from 'react-native-easy-toast'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';

import URL from '../../config';
import * as actionTypes from '../../store/actions';
import styles from './EventOverview.style.js';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';

class EventOverview extends Component {


    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            eventTitle: '',
            eventId: null,
            eventLocation: '',
            eventDesc: '',
            startTime: '',
            endTime: '',
            goodToKnow: '',
            showEditButton: false,
            token: '',
            infoAllowedChange: true,
        }

        props.navigation.addListener('willFocus', () => {
            token = (this.props.navigation.getParam('token', ''))
            let infoChanged = Boolean(this.props.navigation.getParam('infoChanged', false));
            if (infoChanged && this.state.infoAllowedChange) {
                this.setState({ infoAllowedChange: false })
                this.refs.toast.show('Your changes have been submitted!', 1500);
            }

            if (this.props.roleID === 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
            this.setState({
                token: token
            })
        })
        console.disableYellowBox = true;
    }

    componentDidMount() {
        axios.get(URL + 'users/' + this.props.userID + '/currentevent')
            .then((response) => {

                const startTime = moment(new Date(response.data.startTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm');
                const endTime = moment(new Date(response.data.endTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm');
                this.props.onSaveEventTitle(response.data.title)
                
                this.setState({
                    eventTitle: response.data.title,
                    eventId: response.data.id,
                    eventDesc: response.data.description,
                    eventLocation: response.data.location,
                    goodToKnow: response.data.goodToKnow,
                    startTime: startTime,
                    endTime: endTime,
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    onEditSubmit(input) {
        this.setState({
            eventDesc: input.description,
            goodToKnow: input.goodToKnow,
            eventLocation: input.location,
            startTime: input.startTime,
            endTime: input.endTime,
            infoAllowedChange: true,
        })
    }

    handleEditPress = () => {
        this.onEditSubmit = this.onEditSubmit.bind(this)
        this.props.navigation.navigate('ChangeInfoRoute', {
            onEditSubmit: (input) => this.onEditSubmit(input),
            uID: this.props.userID,
            roleID: this.props.roleID,
            title: this.state.eventTitle,
            parentRoute: 'EventOverviewRoute',
            http_update_url: URL + 'events/' + 1,
            http_get_url: URL + 'users/' + this.props.userID + '/currentevent',
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
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={toasterStyle.successMessage}
                        position='top' />
                </View>
                <Header />
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
                <Footer/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
        roleID: state.roleID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveEventTitle: (eventTitle) => dispatch({
            type: actionTypes.SAVE_EVENT_TITLE,
            payload:{
                eventTitle: eventTitle
            }
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventOverview);