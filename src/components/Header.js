import React from 'react';
import {
    View, 
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Text,
} from 'react-native';

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import bgImage from '../../images/login-bg.png'; // TODO: Hitta bättre bild??

// const bell_icon = <FontAwesome5 size={25} name={'bell'} brand color="white" />; // best pratice att lägga en const utanför huvudfunktionen i react?? 
// const user_cog = <FontAwesome5 size={25} name={'user-cog'} brand color="white" />;

const header = props => {
    return (
        <ImageBackground  source={bgImage} style={styles.headerContainer}>
             
                <View style={styles.headerLogo}>
                    <Text style={styles.headerTxt}>Claremont</Text> 
                    {/*TODO: borde inte vara hårdkodat */}
                </View>
                <View style={styles.notIconContainer}> 
                    <TouchableOpacity style={styles.notificationIcon}>
                    {/* {bell_icon} */}
                    </TouchableOpacity>
                </View>
                <View style={styles.profileIconContainer}> 
                    <TouchableOpacity style={styles.profileIcon}>
                    {/* {user_cog} */}
                    </TouchableOpacity>
                </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    headerContainer:{
        position:'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 80,
        flexDirection: 'row',
        justifyContent: "flex-start",
        flex: 1,
    }, 
    headerLogo:{
        marginTop: 40,
    },
    headerTxt:{
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
    },
    notIconContainer:{
        marginTop: 40,
        marginLeft: 170,
    },
    profileIconContainer:{
        marginTop: 40,
        marginLeft: 25
    },
    notificationIcon:{
        
    },
    profileIcon:{

    }
     });

export default header;
