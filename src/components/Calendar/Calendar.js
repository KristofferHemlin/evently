import React, { Component } from 'react';
import { Dimensions, View, ScrollView } from 'react-native';

import EventCalendar from 'react-native-events-calendar'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview'
import styles from './Calendar.style';


let { width } = Dimensions.get('window');

class Calendar extends Component {

    static navigationOptions = {
        header: null,
    };
    
    state = {
       events : [
            { start: '2017-09-07 00:30:00', end: '2017-09-07 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-07 01:30:00', end: '2017-09-07 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-07 04:10:00', end: '2017-09-07 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-07 01:05:00', end: '2017-09-07 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-07 14:30:00', end: '2017-09-07 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-08 01:20:00', end: '2017-09-08 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2017-09-09 01:30:00', end: '2017-09-09 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2019-09-27 09:10:00', end: '2019-09-27 11:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2019-09-27 08:10:00', end: '2019-09-27 08:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
        ],
    }

    eventClicked(event) {
        //On Click oC a event showing alert from here
        console.log("CLIKC")
      }

    render(){
        return (
            <View style={styles.pageContainer}>
            <Header />
            <HeadlineOverview infoButtonStatus={true} editButtonStatus={true}>Schedule</HeadlineOverview>
            <View style={styles.calendarContainer}>
            <EventCalendar
                format24h
                eventTapped={this.eventClicked.bind(this)}
               //Function on event press
              events={this.state.events}
              //passing the Array of event
              width={width}
              //Container width
              size={30}
              //number of date will render before and after initDate 
              //(default is 30 will render 30 day before initDate and 29 day after initDate)
              initDate={'2019-09-27'}
              //show initial date (default is today)
              scrollToFirst
              //scroll to first event of the day (default true)
            />
          </View>
        <Footer />
        </View>

        )
    }
}

export default Calendar;