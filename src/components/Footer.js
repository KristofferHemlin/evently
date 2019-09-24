import React from 'react';
import {
    View, 
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Text,
} from 'react-native';

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const info_circ = <FontAwesome5 size={25} name={'info-circle'} brand color="black" />;
// const users = <FontAwesome5 size={25} name={'users'} brand color="black" />;

const footer = props => {
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.footerButton}>
                {/* {info_circ} */}
                <Text>
                    Company info
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
                {/* {users} */}
                <Text>
                    Employees
                </Text>
            </TouchableOpacity>
        </View>
   
    );
};

const styles = StyleSheet.create({
    footerContainer:{
        backgroundColor:'rgb(239,239,239)',
        height: 100,
        borderTopWidth: 1,
        borderTopColor: 'rgb(230,230,230)',
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
        backgroundColor: 'yellow'
    }, 
    footerButton: {
        flex: 1,
        alignItems: 'center',
    }

 
     });

export default footer;
