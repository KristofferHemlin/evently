import React from 'react';
import {
    View, 
    TouchableOpacity,
    Text,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './Footer.style';

const infoIcon = <FontAwesome5 size={25} name={'info-circle'} solid color="black" />;
const usersIcon = <FontAwesome5 size={25} name={'users'} solid color="black" />;
const calendarIcon = <FontAwesome5 size={25} name={'calendar-alt'} solid color="black" />;
const commentsIcon = <FontAwesome5 size={25} name={'comments'} solid color="black" />;


const footer = props => {
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.footerButton}>
                {infoIcon}
                <Text style ={styles.footerIconTxt}>
                    Event info
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
                {usersIcon}
                <Text style ={styles.footerIconTxt}>
                    Participants
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
                {calendarIcon}
                <Text style ={styles.footerIconTxt}>
                    Schedule
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
                {commentsIcon}
                <Text style ={styles.footerIconTxt}>
                    Event Updates
                </Text>
            </TouchableOpacity>
        </View>
   
    );
};
export default footer;