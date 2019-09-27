import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    footerContainer:{
        backgroundColor:'rgb(239,239,239)',
        height: 100,
        borderTopWidth: 1,
        borderTopColor: 'rgb(230,230,230)',
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',        
    }, 
    footerButton: {
        flex: 1,
        alignItems: 'center',
    },
    footerIconTxt:{
        fontSize: 12,
        fontWeight:'400',
        marginTop: 5,
    }
});
