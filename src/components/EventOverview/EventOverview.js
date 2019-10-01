import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    ScrollView,
} from 'react-native';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfilePreview from '../ProfilePreview/ProfilePreview';
import Croatia from './images/CROT.jpg';
import { blue, red } from 'ansi-colors';
import styles from './EventOverview.style.js';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

class EventOverview extends Component{

    static navigationOptions = {
        header : null,
      };

    state = {
            location: 'Kroatien, DUHH', 
            description: 'Snart åker vi till Kroatien!',
            dates: '24/09/09 - 25/12/12',
            niceToKnow: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            
            isEditUser: true,
        }

    render(){

        const isEditUser = this.state.isEditUser;

        return(
            <View style={styles.pageContainer}>
                <Header/>

                <ScrollView>
                    <ImageBackground source={Croatia} style={styles.eventImage}>
                        <View style={styles.eventNameView}>
                            <Text style={styles.eventName}>Konferens i Kroatien</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.eventInfo}>

                        <HeadlineOverview infoButtonStatus={true} editButtonStatus={isEditUser}>Event Overview</HeadlineOverview>

                        <Text style={styles.subTitles}>Event description</Text>
                        <Text style={styles.ordinaryText}>{this.state.description}</Text>
                        <Text style={styles.subTitles}>Location</Text>
                        <Text style={styles.ordinaryText}>{this.state.location}</Text>
                        <Text style={styles.subTitles}>Dates</Text>
                        <Text style={styles.ordinaryText}>{this.state.dates}</Text>
                        <Text style={styles.subTitles}>Organizers</Text>

                        <ProfilePreview/>

                        <Text style={styles.subTitles}>Nice to know</Text>
                        <Text style={styles.ordinaryText}>{this.state.niceToKnow}</Text>
                    </View>
                </ScrollView>
                
                <Footer/>
            </View>
        )
    }
}

export default EventOverview;