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


import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';

import URL from '../../config';
import styles from './ActivityOverview.style.js';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';

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
            showEditButton: false,
            infoAllowedChange: true,
        }

        props.navigation.addListener('willFocus', () => {
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
        })
        console.disableYellowBox = true;
    }





    componentDidMount() {
        const activityID = Number(this.props.navigation.getParam('activityID', null))
        const eventTitle = this.props.navigation.getParam('eventTitle', null)
        console.log('eventTitle', eventTitle);
        // axios.get('http://localhost:3000/activities/' + activityID)
        axios.get(URL + 'activities/' + activityID)
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
        })
    }

    onEditSubmit(input) {
        this.setState({
            activityDesc: input.description,
            activityLocation: input.location,
            startTime: input.startTime,
            endTime: input.endTime,
            goodToKnow: input.goodToKnow,
            infoAllowedChange: true,
        })
    }

    handleEditPress = () => {
        this.onEditSubmit = this.onEditSubmit.bind(this)
        this.props.navigation.navigate('ChangeInfoRoute', {
            onEditSubmit: (input) => this.onEditSubmit(input),
            uID: this.props.userID,
            title: this.state.activityTitle,
            roleID: this.props.roleID,
            parentRoute: 'ActivityOverviewRoute',
            http_update_url: URL + 'activities/' + this.state.activityID,
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

    render() {

        return (
            <View style={styles.pageContainer}>

                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={toasterStyle.successMessage}
                        position='top' />
                </View>

                <Header/>
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

                <Footer eventTitle={this.state.eventTitle} />
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

export default connect(mapStateToProps)(ActivityOverview);