import React from 'react';
import {
    View, 
    StyleSheet, 
    Dimensions, 
    TextInput,
    Text
} from 'react-native';

const formDescription = props => {
    return (
    <View style={styles.descContainer}>
        <Text style={styles.descText}>{props.children}</Text>
     </View>     
    );
};

const styles = StyleSheet.create({
    descContainer:{
        width: Dimensions.get('window').width -55,
        fontSize: 25,
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginBottom: 25,
    },
    descText:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '200',
        marginVertical: 25,
        color: 'grey',
    }

  });

export default formDescription;
