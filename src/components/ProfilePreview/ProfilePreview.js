import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

import Croatia from '../EventImageHeader/images/CROT.jpg';
import leftPad from 'left-pad';
import styles from './ProfilePreview.style.js'

// class ProfilePreview extends Component{

const profilePreview = props => {

    state = {
        profilePicture: Croatia,
    }

    return(
        <TouchableOpacity
        onPress={props.onClick}>
            <View style={styles.profileOverviewView}>
                <Image source={this.state.profilePicture} style={styles.previewImg}></Image>
                <View style={styles.profileOverviewViewRight}>
                    <Text style={styles.textName}>{props.children}</Text>
                    <Text style={styles.textTitle}>{props.companyDepartment}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default profilePreview;
