import React from 'react';
import {
    View, 
    TouchableOpacity,
    Text,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './Header.style';
import bgImage from '../Login/images/login-bg.jpeg'; // TODO: Hitta bättre bild??

const bell_icon = <FontAwesome5 size={25} name={'bell'} light color="white" />; // best pratice att lägga en const utanför huvudfunktionen i react?? 
const user_cog = <FontAwesome5 size={25} name={'user-cog'} light color="white" />;

const header = props => {
    return (
        <View style={styles.headerContainer}>
             
                <View style={styles.headerLogo}>
                    <Text style={styles.headerTxt}>Claremont</Text> 
                    {/*TODO: borde inte vara hårdkodat */}
                </View>
                <View style={styles.iconContainer}> 
                    <TouchableOpacity style={styles.notificationIcon}>
                    {bell_icon}
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.profileIcon}
                    onPress={props.showModal}>
                    {user_cog}
                    </TouchableOpacity>
                </View>
        </View>
    );
};

export default header;
