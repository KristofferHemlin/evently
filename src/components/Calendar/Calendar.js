import React, { Component } from 'react';
import { Dimensions, View, ScrollView } from 'react-native';
import axios from 'axios';
import EventCalendar from 'react-native-events-calendar'
import moment from 'moment';

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
    activities: [],
    isUpdated: false,
  }

  componentDidMount() {
    // axios.get('http://localhost:3000/events/1/activities')
    axios.get('http://10.110.171.120:3000/events/1/activities')
      .then((response) => {
        console.log(response.data)
        responseArray = response.data.map(activity => ({
          start: moment(new Date(activity.startTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(new Date(activity.endTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm:ss'),
          title: activity.title,
          summary: activity.location + '. ' + activity.description,
          
        })
        )

        this.setState({ activities: responseArray, isUpdated: true })

      })
      .catch((error) => {
        console.log(error)
      })
  }
  eventClicked(event) {
    // console.log("CLIKC")
    this.props.navigation.navigate('EventOverviewRoute')
  }

  render() {
    const todaysDate = moment().format('YYYY-MM-DD')
    return (
      <View style={styles.pageContainer}>
        <Header />
        <HeadlineOverview infoButtonStatus={true} editButtonStatus={false}>Schedule</HeadlineOverview> 
        {/* TODO: fixa informationstext */}
        <View style={styles.calendarContainer}>
          {this.state.isUpdated ?
           <EventCalendar
            format24h
            eventTapped={this.eventClicked.bind(this)}
            //Function on event press
            events={this.state.activities}
            //passing the Array of event
            width={width}
            //Container width
            size={30}
            //number of date will render before and after initDate 
            //(default is 30 will render 30 day before initDate and 29 day after initDate)
            initDate={'2019-10-19'} // för att testa
            // initDate={todaysDate} rätt datum
            //show initial date (default is today)
            scrollToFirst
          //scroll to first event of the day (default true)
          /> : null}
        </View>
        <Footer />
      </View>

    )
  }
}

export default Calendar;