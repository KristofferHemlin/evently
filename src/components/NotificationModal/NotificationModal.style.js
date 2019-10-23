import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

export default StyleSheet.create({
    modalContainer:{
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(40, 41, 45, 0.9)',
        height:Dimensions.get('window').height ,
        width: Dimensions.get('window').width ,
        zIndex: 9000,
        flexDirection: 'column',
    },
    iconContainer:{
        alignItems: 'flex-end',
        zIndex: 9000,
    },
    cancelIcon: {
        marginTop: 35,
        marginRight: 25,
    },
    menuContainer:{
        alignSelf: 'center',
        marginTop: 100,
        zIndex: 9000,
    },
    menuTitle:{
        color: 'white',
        fontSize: 36,
        fontWeight: '500',
        zIndex: 9000,
    },
    menuTxt:{
        color: 'white',
        fontSize: 24,
        paddingTop: 30,
        fontWeight: '300',
        zIndex: 9000,
    },
    line:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginTop: 5,
        zIndex: 9000,
    },
    loadingIcon:{
        marginTop: 100,
    },
})