import React from 'react';
import {
    View, 
    StyleSheet, 
    Dimensions, 
    Text
} from 'react-native';

const formHeader = props => {
    return (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTxt}>{props.children}</Text>
     </View>     
    );
};

const styles = StyleSheet.create({
    headerContainer:{
        width: Dimensions.get('window').width -55,
        fontSize: 25,
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    headerTxt:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
        marginTop: 35,
        marginBottom: 25,
    }

  });

export default formHeader;
