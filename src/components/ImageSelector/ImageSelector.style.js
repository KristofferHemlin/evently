import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
    },

    imageSelectorContainer:{
        flexDirection: 'column',
    },
    
    profileImage:{
        width: 150, 
        height: 150,
        borderRadius: 75,
    },
    
    eventImage:{
        width: Dimensions.get('window').width * 0.85,
        height: 200,
    },
    
    ImageSelectorTxt:{
        fontSize: 17,
        fontWeight: '500',
        paddingVertical: 10,
    },
    
    removeIconButton: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-end',
    },
    
    removeIconCircle: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    
    ImageSelectorButton: {
        // marginVertical: 20,
    },

});