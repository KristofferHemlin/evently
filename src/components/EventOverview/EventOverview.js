import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import URL from '../../config';
import * as actionTypes from '../../store/actions';
import EventImageHeader from '../EventImageHeader/EventImageHeader';
import Footer from '../Footer/Footer';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';
import Header from '../Header/Header';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import styles from './EventOverview.style.js';
import store from '../../store/store';

import NavigationService from '../../navigation/NavigationService';

axios.interceptors.request.use(request => {
    const state = store.getState();
    console.log('request', request);
    request.headers.Authorization = "Bearer " + state.accessToken;
    return request;
})
axios.interceptors.response.use(response => {
    return response;
}, error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.headers.retry) {
        const state = store.getState();
        originalRequest.headers.retry = true;

        return axios.post(URL + 'tokens/refresh', {
            refreshToken: state.refreshToken,
            userId: state.userID,
        })
            .then((response) => {
                store.dispatch({
                    type: actionTypes.SAVE_TOKENS, payload: {
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }
                })
                return axios(originalRequest);
            })
            .catch((error) => {
                NavigationService.navigate('LoginRoute', {
                    showErrorMessage: true
                });
                return Promise.reject(error);
            })
    }
    return Promise.reject(error);
})



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
            infoAllowedChange: true,
        }

        props.navigation.addListener('willFocus', () => {
            let infoChanged = Boolean(this.props.navigation.getParam('infoChanged', false));
            if (infoChanged && this.state.infoAllowedChange) {
                this.setState({ infoAllowedChange: false })
                this.refs.toast.show('Your changes have been submitted!', 2000);
            }

            if (this.props.roleID === 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
        })
        console.disableYellowBox = true;
    }

    componentDidMount() {
        axios.get(URL + 'users/' + this.props.userID + '/currentevent')
            .then((response) => {

                const startTime = moment(new Date(response.data.startTime.replace(' ', 'T'))).format('YYYY-MM-DD');
                const endTime = moment(new Date(response.data.endTime.replace(' ', 'T'))).format('YYYY-MM-DD');
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
                    key: 'description',
                    value: this.state.eventDesc,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                    multiline: 'true'
                },
                location: {
                    label: 'Location',
                    key: 'location',
                    value: this.state.eventLocation,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                startTime: {
                    label: 'Start Date',
                    key: 'startDate',
                    value: this.state.startTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                endTime: {
                    label: 'End Date',
                    key: 'endDate',
                    value: this.state.endTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                goodToKnow: {
                    label: 'Good-to-know',
                    key: 'goodToKnow',
                    value: this.state.goodToKnow,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
            },
            formErrors: {
                description: '',
                location: '',
                startDate: '',
                endDate: '',
                goodToKnow: ''
            }
        });
    }


    render() {
        return (
            <View style={styles.pageContainer}>
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={toasterStyle.successMessage}
                        position='top'
                        positionValue={0} />
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
                <Footer currentPage={'eventOverview'} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
        roleID: state.roleID,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveEventTitle: (eventTitle) => dispatch({
            type: actionTypes.SAVE_EVENT_TITLE,
            payload: {
                eventTitle: eventTitle
            },
        }),
        onSaveAuthToken: (accessToken) => dispatch({
            type: actionTypes.SAVE_AUTH_TOKEN,
            payload: {
                accessToken: accessToken
            },
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventOverview);