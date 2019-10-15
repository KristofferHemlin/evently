import styles from './NotificationModal.style.js'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';

import axios from 'axios';


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const infoCircleIcon = <FontAwesome5 size={40} name={'times'} solid color="white" />;

var SERVER_ENDPOINT = 'http://localhost:3000'

class NotificationOverview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications: []  
        }
        props.navigation.addListener('didFocus', () => {
            
        })

        this.fetchNotifications()
    }



    fetchNotifications() {
        console.log('agajagjasdg',this.props.uID)
        axios.get(SERVER_ENDPOINT + '/users/' + this.props.uID + '/notifications')
            .then((results) => {
                console.log(results)
                var filteredRes = (results.data || []).reduce((map, {activity: {title, id, updatedAt}}) => {
                    map[id] = {title, id, updatedAt, routeType: 'ActivityOverviewRoute'}
                    return map
                }, {})
                this.setState({notifications: Object.keys(filteredRes).map(key => filteredRes[key])}); 
            })   

    }

    navigateTo(routeType, itemID) {
        this.setState({notifications: []})
        this.props.exitModal()
        this.props.navigation.navigate(routeType, { activityID: itemID })
    }

    render() {
        var {exitModal} = this.props
        return <View style={styles.modalContainer}>
            <NavigationEvents onWillFocus={payload => this.fetchNotifications(payload)} />
            <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={exitModal}>
                        <View style={styles.cancelIcon}>
                            {infoCircleIcon}
                        </View>
                    </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
            {this.state.notifications.map(({ title, id, updatedAt, routeType }, index) => {

                return <NotificationLine
                    key={id || index}
                    id={id || index}
                    title={title}
                    navigationCallback={() => this.navigateTo(routeType, id)} />
            })}
            </View>
        </View>
    }
}

export default withNavigation(NotificationOverview)

const NotificationLine = ({ id, title, navigationCallback }) => {

    return (<View style={styles.menuAlternatives}>
        <TouchableOpacity onPress={navigationCallback}>
            <Text style={styles.menuTxt}>
                {title}
            </Text>
        </TouchableOpacity>
    </View>)
}
