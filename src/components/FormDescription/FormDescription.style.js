import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({

    descContainer:{
        width: Dimensions.get('window').width * 0.85,
        fontSize: 25,
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    descText:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '200',
        marginVertical: 25,
        color: 'grey',
    }
});