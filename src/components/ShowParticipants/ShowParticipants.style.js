import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({

    pageContainer:{
        flex:1,
    },

    searchBar:{
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        // textAlign:'center',
        paddingLeft: 15,
        color: "lightgray",
    },

    subTitles:{
        fontWeight: '600',
        fontSize: 16,
        color: 'black',
        marginLeft: 30,
        marginTop: 20,
    },

    line:{
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30,
    },

    loadingIcon:{
        marginTop: 30,
    },

});