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

    inputForm:{
        marginLeft: 30,
        marginRight: 30,
    },

    inputFormTitle:{
        paddingTop: 10,
        paddingBottom: 10,
    },

    input:{
        fontSize: 16,
        backgroundColor: '#FFF',
        color: "gray",
        borderWidth: 1,
        borderColor: "gray",
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 20,
        borderRadius: 3,
      },
    
    inputContainer:{
        marginBottom: 10,
      },
    
      buttonContainer:{
          backgroundColor: '#5A90DC',
          height: 50,
          opacity: 0.8,
          justifyContent: 'center',
          borderRadius: 5,
          marginBottom: 40,
      },

    buttonText:{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },

});