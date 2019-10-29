import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    pageContainer: {
        flex: 1,
    },

    editFormContainer: {
        alignItems: 'center',
    },

    inputForm: {
        marginTop: 25,
        width: Dimensions.get('window').width * 0.85,
    },

    inputErrorMessageContainer: {
        height: 20,
        marginTop: 5,
      },
    inputErrorMessageText: {
        color: 'red',
        fontWeight: '700',
    },

    inputFormTitle: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 16,
        fontWeight: '600',
    },

    input: {
        fontSize: 16,
        backgroundColor: '#FFF',
        color: "rgb(80,80,80)",
        fontWeight: '500',
        borderWidth: 2,
        borderColor: "black",
        paddingHorizontal: 15,
        paddingVertical: 20,
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
});