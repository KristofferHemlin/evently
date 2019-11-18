import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({

    container:{
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 250,
    },
    
    eventImage:{
        position: 'absolute',
        width: '100%',
        height: 250,
        paddingBottom: 50,
    },

    eventNameView:{
        padding:10,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: 40,
    },
    
    eventName:{
        fontSize: 25,
        color: 'white',
        fontWeight: '800',
    },
    
    noCoverPhoto:{
        position: 'absolute',
        justifyContent: 'flex-start',
    },

});