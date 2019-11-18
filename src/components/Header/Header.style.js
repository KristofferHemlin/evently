import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    headerContainer:{
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#211F57',
        height: (Platform.OS === 'ios') ? 80 : 60,
        zIndex: 1,
    }, 
    headerLogo:{
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        marginLeft: 15,
        marginBottom: 5,
    },
    headerLogoImage:{
        width: 70,
        height: 40,
    },
    iconContainer:{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginBottom: 15,
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
    modalContainer:{
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
    },
});