import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './EventImageHeader.style.js';

const cover_photo_icon = <FontAwesome5 size={250} name={'image'} light color="lightgrey" />;

const EventImageHeader = props => {
    return (
        <View style={styles.container}>
            {props.source ?
                <Image source={{ uri: props.source }} style={styles.eventImage} />:
                <View style={styles.noCoverPhoto}>{cover_photo_icon}</View>
            }
            <View style={styles.eventNameView}>
                <Text style={styles.eventName}>{props.eventTitle}</Text>
            </View>
        </View>
    )
}

export default EventImageHeader;