
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Image,
    Text
} from 'react-native';

import Header from '../Header';
import Footer from '../Footer';

import styles from './EventDesc.component.ios.style';
import eventImg from './croatia.jpg';

class EventDesc extends Component{
    
    render(){
        return(
            <View style={styles.eventDescContainer}>
                <Header/>
                <View style={styles.bodyContainer}>
                <ScrollView >
                    <View style={styles.imgContainer}>

                    </View>
                    {/* <Image resizeMode= {'contain'} source={eventImg} style={styles.eventImg}>
                    </Image> */}
                </ScrollView>
                </View>
                {/* Header ligger under för att ikonerna i den ska vara klickbara */}
                <Footer/>
            </View>
            
        )
    }
}

  export default EventDesc; 