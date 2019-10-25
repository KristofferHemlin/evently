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

            if (this.props.roleID === 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
        })
        console.disableYellowBox = true;
    }





    componentDidMount() {
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
                    label: 'startTime',
                    key: 'startTime',
                    value: this.state.startTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                endTime: {
                    label: 'endTime',
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

export default connect(mapStateToProps)(ActivityOverview);