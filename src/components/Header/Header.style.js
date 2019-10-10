import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerContainer:{
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    headerLogo:{
        marginTop: 40,
    },
    headerTxt:{
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
    },
    iconContainer:{
        marginTop: 40,
        flexDirection: 'row',
    },
    notificationIcon:{
        marginRight: 30,
        alignContent: 'flex-end',
    },
    notificationIconCircle:{
        width: 10,
        height: 10,
        borderRadius: 10/2,
        backgroundColor: 'red',
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 1,
    },
    profileIcon:{
        marginRight: 20,
    },
});