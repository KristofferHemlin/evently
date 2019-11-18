import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({

    headerContainer:{
        width: Dimensions.get('window').width * 0.85,
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