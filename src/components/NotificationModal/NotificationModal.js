import styles from './NotificationModal.style.js'
import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { withNavigation } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import axios from 'axios';

import URL from '../../config';



import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const infoCircleIcon = <FontAwesome5 size={40} name={'times'} solid color="white" />;

class NotificationModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
            isLoading: false,
        }
    }

    componentDidMount() {
        this.fetchNotifications()
    }


    fetchNotifications() {
        // axios.get(URL + '/users/' + this.props.uID + '/notifications')
        this.setState({ isLoading: true }, () => {
            axios.get(URL + 'users/' + this.props.uID + '/notifications')
                .then((results) => {
                    console.log(results)
                    var filteredRes = (results.data || []).reduce((map, { activity: { title, id, updatedAt } }) => {
                        map[id] = {
                            title,
                            id,
                            updatedAt: moment(new Date(updatedAt.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm'),
                            routeType: 'ActivityOverviewRoute'
                        }
                        return map
                    }, {})
                    this.setState({
                        notifications: Object.keys(filteredRes).map(key => filteredRes[key]),
                        isLoading: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false })
                });
        })
    }

    navigateTo(routeType, itemID) {
        this.setState({ notifications: [] })
        this.props.exitModal()
        this.props.navigation.navigate(routeType, { activityID: itemID })
    }

    render() {
        var { exitModal } = this.props
        return <View style={styles.modalContainer}>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={exitModal}>
                    <View style={styles.cancelIcon}>
                        {infoCircleIcon}
                    </View>
                </TouchableOpacity>
            </View>
            {this.state.isLoading ?
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

export default withNavigation(NotificationModal)

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
