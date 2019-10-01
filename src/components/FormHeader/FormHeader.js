import React from 'react';
import {
    View, 
    Text
} from 'react-native';

import styles from './FormHeader.style'

const formHeader = props => {
    return (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTxt}>{props.children}</Text>
     </View>     
    );
};

export default formHeader;
