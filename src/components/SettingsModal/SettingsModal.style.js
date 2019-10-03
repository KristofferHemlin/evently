import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modalContainer:{
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(40, 41, 45, 0.9)',
        height:'100%',
        width: '100%',
        zIndex: 9000,
        flexDirection: 'column',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    iconContainer:{
        alignItems: 'flex-end',
    },
    cancelIcon: {
        // position: "absolute",
        // top: '1%',
        // right: '1%',
        marginTop: 25,
        marginRight: 25,
        // alignSelf: 'flex-end',
        // justifyContent: 'flex-start'
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
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
        marginTop: 5,
    },
})