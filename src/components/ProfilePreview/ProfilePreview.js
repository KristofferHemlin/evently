import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

import Croatia from '../../../images/CROT.jpg';
import leftPad from 'left-pad';
import styles from './ProfilePreview.style.js'

class ProfilePreview extends Component{

    state = {
        name: 'Marcus Nilsson', 
        title: 'Company manager',
        profilePicture: Croatia,
    }

    render(){
        return(
            <TouchableOpacity>
                <View style={styles.profileOverviewView}>
                    <Image source={this.state.profilePicture} style={styles.previewImg}></Image>
                    <View style={styles.profileOverviewViewRight}>
                        <Text style={styles.textName}>{this.state.name}</Text>
                        <Text style={styles.textTitle}>{this.state.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default ProfilePreview;
