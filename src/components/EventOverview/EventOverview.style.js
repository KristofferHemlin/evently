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

    subTitles:{
        fontWeight: '600',
        fontSize: 16,
        color: 'black',
        marginLeft: 30,
        marginTop: 30,
    },

   ordinaryText:{
        color: 'gray',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
    },

});