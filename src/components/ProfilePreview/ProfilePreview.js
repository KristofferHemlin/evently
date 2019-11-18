import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './ProfilePreview.style.js'

const profile_image_icon = <FontAwesome5 size={40} name={'user-circle'} solid color="lightgrey" />;

const profilePreview = props => {

    return (
        <TouchableOpacity
            onPress={props.onClick}>
            <View style={styles.profileOverviewView}>
                {props.source.uri ?
                    <Image source={{ uri: props.source.uri }} style={styles.previewImg}></Image>:
                    <View>{profile_image_icon}</View>
                }
                <View style={styles.profileOverviewViewRight}>
                    <Text style={styles.textName}>{props.children}</Text>
                    <Text style={styles.textTitle}>{props.companyDepartment}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default profilePreview;
