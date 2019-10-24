import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

export default StyleSheet.create({
    modalContainer:{
    },
    iconContainer:{
        alignItems: 'flex-end',
    },
    cancelIcon: {
        marginTop: 35,
        marginRight: 25,
    },
    menuContainer:{
        alignSelf: 'center',
        marginTop: 100,
    },
    menuTitle:{
        color: 'white',
        fontSize: 36,
        fontWeight: '500',
    },
    menuTxt:{
        color: 'white',
        fontSize: 24,
        paddingTop: 30,
        fontWeight: '300',
    },
    line:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginTop: 5,
    },
})