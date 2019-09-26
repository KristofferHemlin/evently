import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    pageContainer:{
        flex:1,
        alignItems: 'center',
    },

    logoContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoText:{
        color: "white",
        fontSize: 40,
        fontWeight: '200',
    },

    signUpContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '5%',
    },

    signText:{
        color: "white",
        fontSize: 20,
        fontWeight: '200',
        alignSelf:'center',
    }
});
