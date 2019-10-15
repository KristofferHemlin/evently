import styles from './NotificationModal.style.js'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation';


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const infoCircleIcon = <FontAwesome5 size={40} name={'times'} solid color="white" />;

var SERVER_ENDPOINT = 'http://localhost:3000'

class NotificationOverview extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notifications: [{
                itemTitle: '',
                itemID: '',
                routeType: ''
            }]  
        }
        props.navigation.addListener('willFocus', () => {
            console.log('willFocus showparticipants');
            this.fetchNotifications()
        })
    }


    fetchNotifications() {
        var uID = this.props.navigation.getParam('uID', '')
        console.log('uID') 
        
        axios.get(SERVER_ENDPOINT + '/users/' + uID + '/notifications')
            .then((results) => { 
                console.log('notificatiobn')

                this.setState({...{ notifications: results }, routeType: 'ActivityOverviewRoute'}); 
            })
            
    }

    navigateTo(routeType, itemID) {
        console.log('asdagsdf', routeType, itemID)
        this.props.navigation.navigate(routeType, { activityID: itemID })
        this.props.exitModal()
    }

    render() {
        var {exitModal} = this.props
        return <View style={styles.modalContainer}>
            <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={exitModal}>
                        <View style={styles.cancelIcon}>
                            {infoCircleIcon}
                        </View>
                    </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
            {this.state.notifications.map(({ itemTitle, itemID, routeType }) => {
                return <NotificationLine
                    key={itemID}
                    id={itemID}
                    title={itemTitle}
                    navigationCallback={() => this.navigateTo(routeType, itemID)} />
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
