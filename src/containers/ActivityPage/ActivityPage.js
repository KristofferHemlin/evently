import React, { Component } from 'react';
import Toast from 'react-native-easy-toast'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HeadlineOverview from '../../components/HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../../components/EventImageHeader/EventImageHeader';

import URL from '../../config';
import * as dataActions from '../../utilities/store/actions/data';
import styles from './ActivityPage.style';
import toasterStyle from '../../components/ToasterStyle/ToasterStyle.style';



class ActivityPage extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        showEditButton: false,
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            if (this.props.roleID == 1) {
                this.setState({ showEditButton: true })
            } else {
                this.setState({ showEditButton: false })
            }
            this.fetchActivityData();
        })
    }

    componentDidUpdate = () => {
        if(this.props.showToasterMessage){
            this.refs.toast.show('Your changes have been submitted!', 2000);
            this.props.setToasterHide();
        }
    }

    fetchActivityData = () => {
        this.props.onInitActivity(this.props.activityID)
    }

    showParticipantsHandler = () => {
        this.props.navigation.navigate('ShowParticipantsRoute', {
            activity: true,
            activityTitle: this.props.activityInformation.title,
        })
    }

    handleEditPress = () => {
        this.props.navigation.navigate('ChangeInfoRoute', {
            title: this.props.activityInformation.title,
            parentRoute: 'ActivityOverviewRoute',
            http_update_url: URL + 'activities/' + this.props.activityInformation.id,
            imageUrl: this.props.activityInformation.coverImageUrl,
            infoChanged: null,
            fields: {
                description: {
                    label: 'Description',
                    key: 'description',
                    value: this.props.activityInformation.description,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                    multiline: 'true',
                },
                location: {
                    label: 'Location',
                    key: 'location',
                    value: this.props.activityInformation.location,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                startTime: {
                    label: 'Start Time',
                    key: 'startTime',
                    value: this.props.activityInformation.startTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                endTime: {
                    label: 'End Time',
                    key: 'endTime',
                    value: this.props.activityInformation.endTime,
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                goodToKnow: {
                    label: 'Good-to-know',
                    key: 'goodToKnow',
                    value: this.props.activityInformation.goodToKnow,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',

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
                        positionValue={0} />
                </View>
                <Header />
                <ScrollView>

                    <EventImageHeader
                        eventTitle={this.props.eventInformation ? this.props.eventInformation.title : ""}
                        source={this.props.activityInformation ? this.props.activityInformation.coverImageUrl : null}>
                    </EventImageHeader>
                    <View style={styles.eventInfo}>
                        <HeadlineOverview
                            infoButtonStatus={false}
                            onEditPress={() => this.handleEditPress()}
                            editButtonStatus={this.state.showEditButton}>
                            {this.props.activityInformation ? this.props.activityInformation.title : ""}
                        </HeadlineOverview>
                        <View style={styles.line}></View>
                        <Text style={[styles.titles, styles.subTitles]}>When?</Text>
                        <Text style={styles.ordinaryText}>{this.props.activityInformation ? this.props.activityInformation.startTime : ""} - {this.props.activityInformation ? this.props.activityInformation.endTime : ""}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Where?</Text>
                        <Text style={styles.ordinaryText}>{this.props.activityInformation ? this.props.activityInformation.location : ""}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>What?</Text>
                        <Text style={styles.ordinaryText}>{this.props.activityInformation ? this.props.activityInformation.description : ""}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Good-to-know</Text>
                        <Text style={styles.ordinaryText}>{this.props.activityInformation ? this.props.activityInformation.goodToKnow : ""}</Text>
                        <Text style={styles.subTitles}>Participants</Text>
                        <TouchableOpacity
                            onPress={this.showParticipantsHandler}
                        >
                            <Text style={[styles.ordinaryText, styles.participantsText]}>Click here to see activity participants</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Footer />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        activityInformation: state.activityInformation,
        eventInformation: state.eventInformation,
        userID: state.userID,
        roleID: state.roleID,
        activityID: state.activityID,
        showToasterMessage: state.showToasterMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitActivity: (activityID) => dispatch(dataActions.initActivity(activityID)),
        setToasterHide: () => dispatch(dataActions.setToasterHide()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);