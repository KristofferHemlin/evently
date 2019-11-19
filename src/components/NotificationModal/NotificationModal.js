import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';

import * as informationHandlerActions from '../../utilities/store/actions/informationHandler';
import styles from './NotificationModal.style.js'



import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const cancelIcon = <FontAwesome5 size={40} name={'times'} solid color="white" />;

class NotificationModal extends Component {

    state = {
        notifications: [],
    }

    componentDidMount() {
        this.fetchNotifications()
    }

    componentDidUpdate(props) {
        if ((props !== this.props) && this.props.notificationInformation) {
            const filteredRes = (this.props.notificationInformation || []).reduce((updatedArray, { activity: { title, id, updatedAt } }) => {
                updatedArray.push({
                    title,
                    id,
                    updatedAt: moment(new Date(updatedAt.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm'),
                    routeType: 'ActivityOverviewRoute'
                });
                return updatedArray;
            }, [])
            this.setState({
                notifications: filteredRes,
            })
        }
    }


    fetchNotifications() {
        this.props.onInitNotifications(this.props.userID);
    }

    navigateTo(routeType, activityID) {
        // this.setState({ notifications: [] })
        this.props.onSaveActivityID(activityID)
        this.props.exitModal()
        this.props.navigation.navigate(routeType, { infoChanged: false })
    }

    render() {
        var { exitModal } = this.props
        return <View style={styles.modalContainer}>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={exitModal}>
                    <View style={styles.cancelIcon}>
                        {cancelIcon}
                    </View>
                </TouchableOpacity>
            </View>
            {this.props.getNotificationsLoading ?
                <ActivityIndicator size={'large'} style={styles.loadingIcon} color={'#FFF'} /> :
                <NavigationEvents onWillFocus={payload => this.fetchNotifications(payload)} />}
            <View style={styles.menuContainer}>
                {this.state.notifications.map(({ title, id, updatedAt, routeType }, index) => {
                    return <NotificationLine
                        key={id || index}
                        id={id || index}
                        title={title}
                        updatedAt={updatedAt}
                        navigationCallback={() => this.navigateTo(routeType, id)} />
                })}
            </View>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        notificationInformation: state.informationHandler.notificationInformation,
        getNotificationsLoading: state.informationHandler.getNotificationsLoading,
        userID: state.informationHandler.userID,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveActivityID: (activityID) => dispatch(informationHandlerActions.saveActivityID(activityID)),
        onInitNotifications: (userID) => dispatch(informationHandlerActions.initNotifications(userID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NotificationModal));

const NotificationLine = ({ id, title, navigationCallback, updatedAt }) => {

    return (
        <View style={styles.menuAlternatives}>
            <TouchableOpacity
                style={styles.notificationLink}
                onPress={navigationCallback}>
                <Text style={styles.menuTxt}>
                    {title} {"\n"}<Text style={{ fontWeight: "bold" }}>Updated at: </Text>{updatedAt}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
