import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfilePreview from '../ProfilePreview/ProfilePreview';
import styles from './EventOverview.style.js';

import Croatia from '../../../images/CROT.jpg';

const infoCircleIcon = <FontAwesome5 size={20} name={'info-circle'} solid color="rgba(74,144,226,1)" />;

class EventOverview extends Component{

    static navigationOptions = {
        header : null,
      };

      state = {
        eventTitle: '',
        eventId: null,
        eventLocation: '', 
        eventDesc: '',
        startTime: '',
        endTime: '',
        niceToKnow: '',
        uID: null, 
    }


    componentDidMount () {
        uID = Number(this.props.navigation.getParam('uID', '')) // kan finnas bättre ställe att hämta params?
        axios.get('http://10.100.134.115:3000/users/' + uID + '/currentevent')
        .then((response) => {     
    
        // convertion of the date to right format.
        const sTime = response.data.startTime.replace('T', ' ');
        startTime = sTime.split('.')[0]   
        const eTime = response.data.endTime.replace('T', ' '); 
        endTime = eTime.split('.')[0]  

          this.setState({
              eventTitle: response.data.title,
              eventId: response.data.id,
              eventDesc: response.data.description,
              eventLocation: response.data.location,
              startTime: startTime,
              endTime: endTime,
              uID: uID
            }
          )
        })
        .catch((error) => {
            console.log(error);
        });     
    }

 
    render(){
        return(
            <View style={styles.pageContainer}>
                <Header/>

                <ScrollView>
                    <ImageBackground source={Croatia} style={styles.eventImage}>
                        <View style={styles.eventNameView}>
                            <Text style={styles.eventName}>{this.state.eventTitle}</Text>
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
                        <Text style={styles.ordinaryText}>{this.state.eventDesc}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Location</Text>
                        <Text style={styles.ordinaryText}>{this.state.eventLocation}</Text>
                        <Text style={[styles.titles, styles.subTitles]}>Dates</Text>
                        <Text style={styles.ordinaryText}>{this.state.startTime} - {this.state.endTime}</Text>
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