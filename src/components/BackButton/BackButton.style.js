import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({

    backButton: {
        flexDirection: 'row',
        width: '30%',

        ...Platform.select({
            ios: {
                marginTop: 50,
                marginLeft: 20,
            },
            android: {
                marginTop: 30,
                marginLeft: 20,
                alignItems: 'center',
            },
        }),
    },

    backButtonTxt: {
        fontSize: 18,
        marginLeft: 5,
        color: '#5A90DC',
    },
});