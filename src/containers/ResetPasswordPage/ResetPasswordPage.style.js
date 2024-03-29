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
        fontSize: 20,
        fontWeight: '700',
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
        fontWeight: '400',
        alignSelf:'center',
    },
    logotype:{
       width: 300,
       height: 100,
    }
});
