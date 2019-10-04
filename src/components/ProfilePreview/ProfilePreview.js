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
        // name: 'Marcus Nilsson', 
        // name: '',
        // surname: '', 
        title: 'Company manager',
        profilePicture: Croatia,
    }

    return(
        <TouchableOpacity>
            <View style={styles.profileOverviewView}>
                <Image source={this.state.profilePicture} style={styles.previewImg}></Image>
                <View style={styles.profileOverviewViewRight}>
                    {/* <Text style={styles.textName}>{this.state.name}</Text> */}
                    <Text style={styles.textName}>{props.children}</Text>
                    {/* <Text style={styles.textTitle}>{this.state.title}</Text> */}
                    <Text style={styles.textTitle}>{this.state.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default profilePreview;
