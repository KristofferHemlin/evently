import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerContainer:{
        backgroundColor: '#211F57',
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
    },
    profileIcon:{
        marginRight: 20,

    }
});