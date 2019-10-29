import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({

    pageContainer: {
        flex: 1,
    },

    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },

    profilePictureView: {
        alignItems: "center",
        marginTop: 40,
    },

    nameText: {
        fontSize: 30,
        fontWeight: "200",
        marginTop: 20,
    },

    companyText: {
        color: "gray",
    },

    line: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
    },

    userInfo: {
        marginBottom: 30,
    },

    inputForm: {
        marginLeft: 30,
        marginRight: 30,
    },

    inputFormTitle: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: '600',
    },

    input: {
        paddingTop: 15,
        alignItems: "center",
        fontSize: 16,
        backgroundColor: '#FFF',
        color: "gray",
        borderWidth: 1,
        borderColor: "gray",
        paddingHorizontal: 15,
        paddingVertical: 20,
        // marginBottom: 20,
        borderRadius: 3,
    },
    inputErrorMessageContainer: {
        height: 20,
        marginTop: 5,
      },
    inputErrorMessageText: {
        color: 'red',
        fontWeight: '700',
    },
    buttonContainer: {
        backgroundColor: '#5A90DC',
        height: 50,
        opacity: 0.8,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 40,
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    backButton: {
        borderWidth: 2,
        borderColor: 'rgb(176,176,176)',
        borderRadius: 5,
        flexDirection: 'row',
        width: '30%',
        marginTop: 20,
        marginLeft: 20,
    },
    backButtonTxt: {
        fontSize: 18,
        marginLeft: 5,
        padding: 3,
    },
    backButtonIconContainer: {
        marginLeft: 5,
        padding: 3,
    }

});