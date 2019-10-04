import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({

    pageContainer:{
        flex:1,
    },

    profilePicture:{
        width: 150, 
        height: 150,
        borderRadius: 75,
    },

    profilePictureView:{
        alignItems: "center",
        marginTop: 40,
    },

    nameText:{
        fontSize: 30,
        fontWeight: "200",
        marginTop: 20,
    },

    companyText:{
        color: "gray",
    },

    line:{
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
    },

    userInfo:{
        marginBottom: 30,
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