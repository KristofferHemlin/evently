import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    creatAccContainer:{
        flex: 1,
        alignItems: 'center',
    },
    inputForm:{
        width: Dimensions.get('window').width -55,
    },
    input:{
      fontSize: 16,
      backgroundColor: '#FFF',
      color: "rgb(56,56,56)",
      fontWeight: '500',
      borderWidth: 2,
      borderColor: "black",
      paddingHorizontal: 15,
      paddingVertical: 20,
      marginBottom: 20,
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
