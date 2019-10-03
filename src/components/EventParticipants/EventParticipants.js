import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
} from 'react-native';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfilePreview from '../ProfilePreview/ProfilePreview';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';
import EventImageHeader from '../EventImageHeader/EventImageHeader';

import styles from './EventParticipants.style.js';

class EventParticipants extends Component{

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

        filterWord: '',
    }
 
    render(){

        const filterWord = this.state.filterWord;
        console.log("Steh auf", filterWord);

        return(
            <View style={styles.pageContainer}>
                <Header/>
                <ScrollView>
                    <EventImageHeader/>
                    <HeadlineOverview infoButtonStatus={true} editButtonStatus={true}>Event Preview</HeadlineOverview>

                    <TextInput style={styles.searchBar}
                        placeholder = "Search current event participants ..."
                        onChangeText={(filterWord) => this.setState({filterWord})}
                        value={this.state.filterWord}
                    >
                    </TextInput>

                    <Text style={styles.subTitles}>Participants</Text>
                    <View style={styles.line}></View>

                    <ProfilePreview/>

                </ScrollView>
                <Footer/>
            </View>
        )
    }
}

export default EventParticipants;