import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },

    imageSelectorContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
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