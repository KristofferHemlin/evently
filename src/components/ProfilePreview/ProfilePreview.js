import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

import styles from './ProfilePreview.style.js'

const profilePreview = props => {

    console.log("GIT PULL: ", props.source.uri);

    return (
        <TouchableOpacity
            onPress={props.onClick}>
            <View style={styles.profileOverviewView}>
                <Image source={{ uri: props.source.uri }} style={styles.previewImg}></Image>
                <View style={styles.profileOverviewViewRight}>
                    <Text style={styles.textName}>{props.children}</Text>
                    <Text style={styles.textTitle}>{props.companyDepartment}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default profilePreview;
