import React from 'react';
import {
    View, 
    Text
} from 'react-native';

import styles from './FormDescription.style'

const formDescription = props => {
    return (
    <View style={styles.descContainer}>
        <Text style={styles.descText}>{props.children}</Text>
     </View>     
    );
};

export default formDescription;
