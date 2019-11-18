import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './HeadlineOverview.style.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const infoCircleIcon = <FontAwesome5 size={20} name={'info-circle'} solid color="rgba(74,144,226,1)" />;

const headlineOverview = props => {
    return (
        <View>
            <View style={styles.mainTitleView}>
                <View style={styles.mainTitleViewLeft}> 
                    <Text style={styles.mainTitle}>{props.children}</Text>
                    {props.infoButtonStatus ?
                        <TouchableOpacity style={styles.infoButton}>
                        {infoCircleIcon}
                        </TouchableOpacity>:
                        null
                    }
                </View>
                        <TouchableOpacity
                        onPress={props.onEditPress}>
                          {props.editButtonStatus ? <Text style={styles.editButton}> Edit </Text>: null}  
                        </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
        </View>
    );
};

export default headlineOverview;
