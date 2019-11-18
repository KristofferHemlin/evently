import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    footerContainer:{
        backgroundColor:'rgb(239,239,239)',
        height: (Platform.OS === 'ios') ? 90 : 75,
        borderTopWidth: 1,
        borderTopColor: 'rgb(230,230,230)',
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,    
    }, 
    footerButton: {
        flex: 1,
        alignItems: 'center',
    },
    footerIconTxt:{
        fontSize: 12,
        fontWeight:'400',
        marginTop: 5,
    }
});
