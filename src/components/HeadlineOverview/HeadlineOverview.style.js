import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({
    mainTitleView:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 30,
        paddingBottom: 1,
    },

    mainTitleViewLeft:{
        flexDirection: 'row',
    // inte den snyggaste lösningen...?
    },

    editButton:{
        // alignItems: 'self-end',
       color: 'rgba(74,144,226,1)',
       borderWidth: 2,
       borderColor: 'rgba(74,144,226,1)',
       borderRadius: 3,
       fontSize: 16,
       fontWeight: '500',
       paddingLeft: 7,
       paddingRight: 7,
    },

    infoButton:{
        margin:5,
    },
    
    eventInfo:{
        height:1000,
        backgroundColor: 'white',
    },

    mainTitle:{
        fontWeight: '600',
        fontSize: 22,
        color: 'black',
    },

    line:{
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30,
    },

  });