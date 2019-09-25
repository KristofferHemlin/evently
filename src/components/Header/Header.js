import React from 'react';
import {
    View, 
    ImageBackground,
    TouchableOpacity,
    Text,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './Header.style';
import bgImage from './images/login-bg.png'; // TODO: Hitta bättre bild??

const bell_icon = <FontAwesome5 size={25} name={'bell'} light color="white" />; // best pratice att lägga en const utanför huvudfunktionen i react?? 
const user_cog = <FontAwesome5 size={25} name={'user-cog'} light color="white" />;

const header = props => {
    return (
        <ImageBackground  source={bgImage} style={styles.headerContainer}>
             
                <View style={styles.headerLogo}>
                    <Text style={styles.headerTxt}>Claremont</Text> 
                    {/*TODO: borde inte vara hårdkodat */}
                </View>
                <View style={styles.notIconContainer}> 
                    <TouchableOpacity style={styles.notificationIcon}>
                    {bell_icon}
                    </TouchableOpacity>
                </View>
                <View style={styles.profileIconContainer}> 
                    <TouchableOpacity style={styles.profileIcon}>
                    {user_cog}
                    </TouchableOpacity>
                </View>
        </ImageBackground>
    );
};

export default header;
