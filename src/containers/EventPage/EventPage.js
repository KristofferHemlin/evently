import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';

import axios from 'axios';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';

import EventImageHeader from '../../components/EventImageHeader/EventImageHeader';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HeadlineOverview from '../../components/HeadlineOverview/HeadlineOverview';

import URL from '../../config';
import * as informationHandlerActions from '../../utilities/store/actions/informationHandler';
import * as formActions from '../../utilities/store/actions/form';
import toasterStyle from '../../components/ToasterStyle/ToasterStyle.style';
import styles from './EventPage.style';

class EventPage extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        showEditButton: false,
    }

    componentDidMount() {
        // Add eventListener for when oneSignal id is available
        OneSignal.addEventListener('ids', this.onIds);

        this.props.navigation.addListener('willFocus', () => {
            if (this.props.roleID == 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
            this.fetchEventData();
        })
    }

    componentDidUpdate = () => {
        if(this.props.showToasterMessage){
            this.refs.toast.show('Your changes have been submitted!', 2000);
            this.props.setToasterHide();
        }
    }

    fetchEventData = () => {
        this.props.onInitEvent(this.props.userID)
    }

    // Skickar onesignal ID till databasen
    onIds = (device) => {
        // Send player_id to BE   
        axios.post(URL + 'users/' + this.props.userID + "/playerids", {
            playerId: device.userId,
        })
        // tar bort onesignal listener
        OneSignal.removeEventListener('ids', this.onIds);
    }

    handleEditPress = () => {
        this.props.navigation.navigate('ChangeInfoRoute', {
            parentRoute: 'EventPageRoute',
            http_update_url: URL + 'events/' + 1,
            http_get_url: URL + 'users/' + this.props.userID + '/currentevent',
            imageUrl: this.props.eventInformation.coverImageUrl,
            headlineTitle: this.props.eventInformation.title,
            infoChanged: null,
            fields: {
                description: {
                    label: 'Description',
                    key: 'description',
                    value: this.props.eventInformation.description,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                    multiline: 'true'
                },
                location: {
                    label: 'Location',
                    key: 'location',
                    value: this.props.eventInformation.location,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                startTime: {
                    label: 'Start Date',
                    key: 'startDate',
                    value: this.props.eventInformation.startTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                endTime: {
                    label: 'End Date',
                    key: 'endDate',
                    value: this.props.eventInformation.endTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                goodToKnow: {
                    label: 'Good-to-know',
                    key: 'goodToKnow',
                    value: this.props.eventInformation.goodToKnow,
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
                    <EventImageHeader
                        eventTitle={this.props.eventInformation ? this.props.eventInformation.title : ""}
                        source={this.props.eventInformation ? this.props.eventInformation.coverImageUrl : null}>
                    </EventImageHeader>

                    <View style={styles.eventInfo}>
                        <HeadlineOverview
                            onEditPress={() => this.handleEditPress()}
                            infoButtonStatus={false}
                            editButtonStatus={this.state.showEditButton}>
                            Event Overview
                        </HeadlineOverview>

                        <View style={styles.line}></View>
                        <Text style={[styles.titles, styles.subTitles]}>Event description</Text>
                        <Text style={styles.ordinaryText}>{this.props.eventInformation ? this.props.eventInformation.description : ""}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Location</Text>
                        <Text style={styles.ordinaryText}>{this.props.eventInformation ? this.props.eventInformation.location : ""}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Dates</Text>
                        <Text style={styles.ordinaryText}>{this.props.eventInformation ? this.props.eventInformation.startTime : ""} - {this.props.eventInformation ? this.props.eventInformation.endTime : ""}</Text>
                        <Text style={styles.subTitles}>Good-to-know</Text>
                        <Text style={styles.ordinaryText}>{this.props.eventInformation ? this.props.eventInformation.goodToKnow : ""}</Text>

                    </View>
                </ScrollView>
                <Footer currentPage={'eventPage'} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        eventInformation: state.informationHandler.eventInformation,
        userID: state.informationHandler.userID,
        roleID: state.informationHandler.roleID,
        accessToken: state.informationHandler.accessToken,
        refreshToken: state.informationHandler.refreshToken,
        showToasterMessage: state.form.showToasterMessage,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitEvent: (userID) => dispatch(informationHandlerActions.initEvent(userID)),
        setToasterHide: () => dispatch(formActions.setToasterHide()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);