import React from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';

import styles from './BackButton.style'

const backArrowIcon = <FontAwesome5 size={20} name={'arrow-circle-left'} solid color="rgba(0,0,0,1)" />;

const backButton = props => {
    return (
    <TouchableOpacity style={styles.backButton}
        onPress={() => props.navigation.goBack()}>
        <View style={styles.backButtonIconContainer}>{backArrowIcon}</View><Text style={styles.backButtonTxt}>Back</Text>
    </TouchableOpacity>  
    );
};

export default withNavigation(backButton);
