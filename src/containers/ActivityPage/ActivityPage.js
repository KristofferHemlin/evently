import React, { Component } from 'react';
import Toast from 'react-native-easy-toast'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';


import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HeadlineOverview from '../../components/HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../../components/EventImageHeader/EventImageHeader';

import URL from '../../config';
import styles from './ActivityPage.style';
import toasterStyle from '../../components/ToasterStyle/ToasterStyle.style';



class ActivityPage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

        this.state = {
            activityLocation: '',
            activityDesc: '',
            goodToKnow: '',
            startTime: '',
            endTime: '',
            contact: '',
            showEditButton: false,
            infoAllowedChange: true,
        }

        props.navigation.addListener('willFocus', () => {
            let infoChanged = Boolean(this.props.navigation.getParam('infoChanged', false));
            if (infoChanged && this.state.infoAllowedChange) {
                this.setState({ infoAllowedChange: false })
                this.refs.toast.show('Your changes have been submitted!', 2000);
            }

            if (this.props.roleID == 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
            this.fetchActivityData();
        })
        console.disableYellowBox = true;
    }

    fetchActivityData = () => {
        axios.get(URL + 'activities/' + this.props.activityID)
        .then((response) => {

            const startTime = moment(new Date(response.data.startTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm');
            const endTime = moment(new Date(response.data.endTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm');

            this.setState({
                activityTitle: response.data.title,
                activityDesc: response.data.description,
                activityLocation: response.data.location,
                goodToKnow: response.data.goodToKnow,
                startTime: startTime,
                endTime: endTime,
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
            activityTitle: this.state.activityTitle,
        })
    }

    handleEditPress = () => {
        this.props.navigation.navigate('ChangeInfoRoute', {
            uID: this.props.userID,
            title: this.state.activityTitle,
            roleID: this.props.roleID,
            parentRoute: 'ActivityOverviewRoute',
            http_update_url: URL + 'activities/' + this.props.activityID,
            fields: {
                description: {
                    label: 'Description',
                    key: 'description',
                    value: this.state.activityDesc,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                    multiline: 'true',
                },
                location: {
                    label: 'Location',
                    key: 'location',
                    value: this.state.activityLocation,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                startTime: {
                    label: 'Start Time',
                    key: 'startTime',
                    value: this.state.startTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                endTime: {
                    label: 'End Time',
                    key: 'endTime',
                    value: this.state.endTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                goodToKnow: {
                    label: 'Good-to-know',
                    key: 'goodToKnow',
                    value: this.state.goodToKnow
                },
            },
            formErrors: {
                description: '',
                location: '',
                startTime: '',
                endTime: '',
                goodToKnow: '',
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
                        positionValue={0}/>
                </View>

                <Header/>
                <ScrollView>

                    <EventImageHeader eventTitle={this.props.eventTitle}></EventImageHeader>

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

                <Footer/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
        roleID: state.roleID,
        eventTitle: state.eventTitle,
        activityID: state.activityID
    }
}

export default connect(mapStateToProps)(ActivityPage);