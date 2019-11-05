import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './Footer.style';

const infoIcon = <FontAwesome5 size={25} name={'info-circle'} solid color="black" />;
const infoIconDisabled = <FontAwesome5 size={25} name={'info-circle'} solid color="lightgray" />;
const usersIcon = <FontAwesome5 size={25} name={'users'} solid color="black" />;
const usersIconDisabled = <FontAwesome5 size={25} name={'users'} solid color="lightgray" />;
const calendarIcon = <FontAwesome5 size={25} name={'calendar-alt'} solid color="black" />;
const calendarIconDisabled = <FontAwesome5 size={25} name={'calendar-alt'} solid color="lightgray" />;
// const commentsIcon = <FontAwesome5 size={25} name={'comments'} solid color="black" />; //Should be re-imported in V0.2

const footer = props => {
    return (
        <View style={styles.footerContainer}>

            <TouchableOpacity
                style={styles.footerButton}
                disabled={(props.currentPage === 'eventPage')}
                onPress={() => props.navigation.navigate('EventPageRoute')}>
                {!(props.currentPage === 'eventPage')?
                    <View>{infoIcon}</View> :
                    <View>{infoIconDisabled}</View>
                }
                <Text style={styles.footerIconTxt}>
                    Event info
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.footerButton}
                disabled={(props.currentPage === 'showParticipants')}
                onPress={() => props.navigation.navigate('ShowParticipantsRoute', {
                    event: true,
                })}>
                {!(props.currentPage === 'showParticipants')?
                    <View>{usersIcon}</View> :
                    <View>{usersIconDisabled}</View>
                }
                <Text style={styles.footerIconTxt}>
                    Participants
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.footerButton}
                disabled={(props.currentPage === 'calendar')}
                onPress={() => props.navigation.navigate('CalendarRoute')}>
                {!(props.currentPage === 'calendar')?
                    <View>{calendarIcon}</View> :
                    <View>{calendarIconDisabled}</View>
                }
                <Text style={styles.footerIconTxt}>
                    Schedule
                </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.footerButton}>
                {commentsIcon}
                <Text style={styles.footerIconTxt}>
                    Event Updates
                </Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default withNavigation(footer);
