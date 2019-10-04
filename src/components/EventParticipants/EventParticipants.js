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

        profileArray:[
            {
                //FirstObject
                name: 'Marcus',
            },
            {
                //SecondObject
                name: 'Maggio',
            },
            {
                //ThirdObject
                name: 'Marcus',
            },
            {
                //FourthObject
                name: 'Martin',
            },
            {
                //etc
                name: 'David',
            },
            {
                //etc
                name: 'Danneboi',
            },
            {
                //etc
                name: 'Dalé',
            },
            {
                //etc
                name: 'Pitbull',
            }
        ]
    }
 
    render(){

        const filterWord = this.state.filterWord;
        console.log("filterWord: ", filterWord);

        // console.log(this.state.profileArray.filter, this.state.profileArray,{ name: 'Marcus' });
        console.log(this.state.profileArray);

        this.state.profileArray = this.state.profileArray.filter(function(person) {
            // return person.name == 'Marcus';

            return person.name.includes(filterWord);
            // return person.name == 'Marcus';
        });

        console.log(this.state.profileArray);

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


                    <View style={styles.profileList}>
                        {this.state.profileArray.map(() => {
                            return <ProfilePreview/>
                            })}
                    </View>

                </ScrollView>
                <Footer/>
            </View>
        )
    }
}

export default EventParticipants;