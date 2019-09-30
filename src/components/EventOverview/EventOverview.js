import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    ScrollView,
    Button,
} from 'react-native';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfilePreview from '../ProfilePreview/ProfilePreview';
import Croatia from '../../../images/CROT.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { blue, red } from 'ansi-colors';
import styles from './EventOverview.style.js';

const infoCircleIcon = <FontAwesome5 size={20} name={'info-circle'} solid color="rgba(74,144,226,1)" />;

class EventOverview extends Component{

    static navigationOptions = {
        header : null,
      };

    state = {
            location: 'Kroatien, DUHH', 
            description: 'Snart åker vi till Kroatien!',
            dates: '24/09/09 - 25/12/12',
            niceToKnow: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }

    render(){
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
                        <View style={styles.mainTitleView}>
                            <View style={styles.mainTitleViewLeft}> 
                                <Text style={[styles.titles, styles.mainTitle]}>Event overview</Text>
                                <TouchableOpacity style={styles.infoButton}>
                                 {infoCircleIcon}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                            <Text style={styles.editButton}> Edit </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}></View>
                        <Text style={[styles.titles, styles.subTitles]}>Event description</Text>
                        <Text style={styles.ordinaryText}>{this.state.description}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Location</Text>
                        <Text style={styles.ordinaryText}>{this.state.location}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Dates</Text>
                        <Text style={styles.ordinaryText}>{this.state.dates}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Organizers</Text>

                        <ProfilePreview/>

                        <Text style={[styles.titles, styles.subTitles]}>Nice to know</Text>
                        <Text style={styles.ordinaryText}>{this.state.niceToKnow}</Text>
                    </View>
                </ScrollView>
                
                <Footer/>
            </View>
        )
    }
}

export default EventOverview;