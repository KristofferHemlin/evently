import React from 'react';
import {
    View, 
    StyleSheet, 
    Dimensions, 
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';

const loginForm = props => {
    return (
    
        <View style={styles.inputForm}>
                <View style={styles.inputContainer}>
                <TextInput 
                style={styles.input}
                placeholder={'Username'}
                placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                onSubmitEditing={() => this.passwordInput.focus()} // så den fokuserar på password rutan när man infogar username
                />
            </View>
                <View style={styles.inputContainer}>
                <TextInput 
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                ref={(input) => this.passwordInput = input} // ref så man kan hoppa till password efter username
                />
                </View> 
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style = {styles.buttonText}>Login </Text>
                </TouchableOpacity>
                <Text style={styles.forgottenPasswordTxt}
                    onPress={() => Linking.openURL('#')}>
                    Forgotten your password?
                </Text>
        </View>
         
             
    );
};

const styles = StyleSheet.create({
    inputForm:{
        width: Dimensions.get('window').width -55,
        //TODO:inte bästa lösningen
    },
    input:{
      fontSize: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: "#FFF",
      // TODO:inputfärgen blir werid, beror förmodligen på background color
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
    forgottenPasswordTxt:{
        color: "#FFF",
        marginTop: 10,
    }
    

  });

export default loginForm;
