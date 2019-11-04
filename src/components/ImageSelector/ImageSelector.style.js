import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
    },

    imageSelectorContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    
    ImageSelectorBtn:{
        // marginVertical: 20,
    },

    profileImage:{
        width: 150, 
        height: 150,
        borderRadius: 75,
    }, 
    
    ImageSelectorTxt:{
        fontSize: 17,
        fontWeight: '500',
        paddingVertical:10,
    },

    removeIconButton: {
        position: 'absolute',
        zIndex: 1,
        margin: 10,
    },
    
    notificationIconCircle: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    ImageSelectorButton: {
    }

});