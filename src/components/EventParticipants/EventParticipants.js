import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
} from 'react-native';

import axios from 'axios';

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
        firstName: '',
        lastName: '', 
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

    //Tommygun
    componentDidMount () {
        uID = Number(this.props.navigation.getParam('uID', ''));
        // axios.get('http://localhost:3000/users/' + uID + '/currentevent')
        axios.get('http://localhost:3000/events/1/users')
        .then((response) => {

        console.log(response);
        // console.log(response.data[1].firstName);
        // console.log(response.data[1].lastName);
        // console.log(response.data[1].id);
        // console.log(response.data[1].profileImageUrl);

          this.setState({
              firstName: response.data[0].firstName,
              lastName: response.data[0].lastName,
              uID: response.data[0].id,
            }
          )
        })
        .catch((error) => {
            console.log(error);
        });     
    }
    //Tommygun
 
    render(){

        const filterWord = this.state.filterWord;
        // console.log("filterWord: ", filterWord);

        this.state.profileArray = this.state.profileArray.filter(function(person) {
            // return person.name == 'Marcus';
            return person.name.includes(filterWord);
        });

        // console.log(this.state.profileArray);

        return(
            <View style={styles.pageContainer}>
                <Header/>
                <ScrollView>
                    <EventImageHeader/>
                    <HeadlineOverview infoButtonStatus={true} editButtonStatus={true}>Event Participants</HeadlineOverview>

                    <TextInput style={styles.searchBar}
                        placeholder = "Search current event participants ..."
                        onChangeText={(filterWord) => this.setState({filterWord})}
                        value={this.state.filterWord}
                    >
                    </TextInput>

                    <Text style={styles.subTitles}>Participants</Text>
                    <View style={styles.line}></View>


                    <View style={styles.profileList}>
                        {this.state.profileArray.map((input, index) => {
                            return <ProfilePreview key={index}>{this.state.firstName} {this.state.lastName}</ProfilePreview>
                            })}
                    </View>

                </ScrollView>
                <Footer/>
            </View>
        )
    }
}

export default EventParticipants;