import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';

import styles from './BackButton.style'

const backArrowIcon = <FontAwesome5 size={20} name={'chevron-left'} solid color="rgba(90,144,220,1)" />;

const backButton = props => {

    return (
        <TouchableOpacity style={styles.backButton}
            //Going back, needs parentRoute to work}
            onPress={() => props.navigation.navigate(props.navigation.state.params.parentRoute, { infoChanged: false })} >
            <View>{backArrowIcon}</View>
            <Text style={styles.backButtonTxt}>Back</Text>
        </TouchableOpacity>
    );
};

export default withNavigation(backButton);
