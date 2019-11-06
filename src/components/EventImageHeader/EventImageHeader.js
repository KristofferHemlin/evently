import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
} from 'react-native';

import styles from './EventImageHeader.style.js';

const EventImageHeader = props => {
    return (
        <ImageBackground source={{ uri: props.source }} style={styles.eventImage}>
            <View style={styles.eventNameView}>
                <Text style={styles.eventName}>{props.eventTitle}</Text>
            </View>
        </ImageBackground>
    )
}

export default EventImageHeader;