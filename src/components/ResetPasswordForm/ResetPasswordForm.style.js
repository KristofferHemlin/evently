import { StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    
    inputForm:{
        width: Dimensions.get('window').width -55,
    },
    input:{
      fontSize: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: "#FFF",
      borderWidth: 2,
      borderColor: "#5da6d0",
      paddingHorizontal: 15,
      paddingVertical: 20,
    },
    inputContainer:{
      marginBottom: 10,
    },
    buttonContainer:{
      backgroundColor: '#3498db',
      height: 50,
      opacity: 0.8,
      justifyContent: 'center',
      
  },
  buttonText:{
      textAlign: 'center',
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
  },

});