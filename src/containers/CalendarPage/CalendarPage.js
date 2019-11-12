import React, { Component } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import axios from 'axios';
import moment from 'moment';

import EventCalendar from 'react-native-events-calendar'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HeadlineOverview from '../../components/HeadlineOverview/HeadlineOverview'

import * as dataActions from '../../utilities/store/actions/data';
import URL from '../../config';
import styles from './CalendarPage.style';



let { width } = Dimensions.get('window');

class CalendarPage extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      activities: [],
      isUpdated: false,

    }

    props.navigation.addListener('willFocus', () => {
      axios.get(URL + 'users/' + this.props.userID + '/events/1/activities')
        .then((response) => {
          responseArray = response.data.map(activity => ({
            start: moment(new Date(activity.startTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm'),
            end: moment(new Date(activity.endTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm'),
            title: activity.title,
            summary: activity.location + '. ' + activity.description,
            id: activity.id
          })
          )

          this.setState({
            activities: responseArray,
            isUpdated: true,
          })

        })
        .catch((error) => {
          console.log(error)
        })
    })
    console.disableYellowBox = true;
  }

  eventClicked(event) {
    this.props.saveActivityID(event.id)
    this.props.navigation.navigate('ActivityOverviewRoute')
  }

  render() {
    const todaysDate = moment().format('YYYY-MM-DD')
    return (
      <View style={styles.pageContainer}>
        <Header />
        <HeadlineOverview infoButtonStatus={false} editButtonStatus={false}>Schedule</HeadlineOverview>
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
              initDate={todaysDate} // för att testa
              // initDate={todaysDate} rätt datum
              //show initial date (default is today)
              scrollToFirst
            //scroll to first event of the day (default true)
            /> : null}
        </View>
        <Footer currentPage={'calendar'}/>
      </View>

    )
  }
}

const mapStateToProps = state => {
  return {
    userID: state.userID,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveActivityID: (activityID) => dispatch(dataActions.saveActivityID(activityID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);