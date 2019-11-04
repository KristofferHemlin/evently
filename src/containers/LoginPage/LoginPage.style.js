import { StyleSheet, Dimensions, Platform } from 'react-native';

export default StyleSheet.create({
    pageContainer: {
        flex: 1,
        alignItems: 'center',
    },

    logoContainer: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',

        ...Platform.select({
            ios: {
                top: Dimensions.get('window').height * 0.13,
            },
            android: {
                top: Dimensions.get('window').height * 0.08,
            },
        }),

    },

    logotype: {
        width: 300,
        height: 100,
    },

    logoText: {
        color: "white",
        fontSize: 20,
        fontWeight: '700',
    },

    signUpContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '5%',
    },

    signText: {
        color: "white",
        fontSize: 20,
        fontWeight: '400',
        alignSelf: 'center',
    },

    inputForm: {
        width: Dimensions.get('window').width * 0.85,
    },

    input: {
        fontSize: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: "#FFF",
        // TODO:inputfärgen blir werid, beror förmodligen på background color
        borderWidth: 2,
        borderColor: "#5da6d0",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },

    inputContainer: {
        marginBottom: 10,
    },

    buttonContainer: {
        backgroundColor: '#3498db',
        height: 50,
        opacity: 0.8,
        justifyContent: 'center',
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },

    forgottenPasswordTxt: {
        color: "#FFF",
        marginTop: 10,
    }

});
