import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({

    pageContainer:{
        flex:1,
    },

    eventImage:{
        width: '100%',
        height: 250,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },

    eventNameView:{
        padding:10,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    eventName:{
        fontSize: 25,
        color: 'white',
        fontWeight: '800',
    },

    eventInfo:{
        height:1000,
        backgroundColor: 'white',
    },

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
        //Ska CCS:as till höger.
        // alignItems: 'self-end',
       color: 'rgba(74,144,226,1)',
       borderWidth: 1,
       borderColor: 'rgba(74,144,226,1)',
       borderRadius: 3,
       fontSize: 16,
       paddingTop: 3,
       paddingBottom: 3,
       paddingLeft: 7,
       paddingRight: 7,
    },

    infoButton:{
        margin:5,
    },

    titles:{
        fontWeight: '600',
        fontSize: 16,
        color: 'black',
    },

    mainTitle:{
        fontSize: 22,
    },

    subTitles:{
        marginLeft: 30,
        marginTop: 30,
    },

   ordinaryText:{
        color: 'gray',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
    },

    line:{
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginLeft: 30,
        marginRight: 30,
    },

});