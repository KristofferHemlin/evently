import React, { Component } from 'react';
import { Dimensions, View, ScrollView } from 'react-native';
import axios from 'axios';
import EventCalendar from 'react-native-events-calendar'
import moment from 'moment';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview'
import SettingsModal from '../SettingsModal/SettingsModal';

import URL from '../../config';
import styles from './Calendar.style';



let { width } = Dimensions.get('window');

class Calendar extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props)

    this.state = {
      activities: [],
      isUpdated: false,
      uID: null,
      showModal: false,
      eventTitle: '',
      // activityID: null,
  
    }

    props.navigation.addListener('willFocus', () => {
      const uID = Number(this.props.navigation.getParam('uID', ''));
      const eventTitle = this.props.navigation.getParam('eventTitle', '');
      const roleID = Number(this.props.navigation.getParam('roleID', ''));
      axios.get(URL + '/users/' + uID + '/events/1/activities')
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
            uID: uID,
            eventTitle: eventTitle,
            roleID: roleID,
          })
  
        })
        .catch((error) => {
          console.log(error)
        })
    })
    console.disableYellowBox = true;
  }

  showModalHandler = () => {
    let showModal = this.state.showModal;
    this.setState({ showModal: !showModal });
  }

  modalNavigationHandler = () => {
    let showModal = this.state.showModal;
    this.setState({ showModal: !showModal });
    this.props.navigation.navigate('UserProfileRoute', {
      uID: this.state.uID,
      eventTitle: this.state.eventTitle,
      roleID: this.state.roleID,
      showParticipant: false,
    });
  }

  eventClicked(event) {
    this.props.navigation.navigate('ActivityOverviewRoute', {
      activityID: event.id,
      uID: this.state.uID,
      eventTitle: this.state.eventTitle,
      uID: this.state.uID,
      roleID: this.state.roleID,
      
    })
  }

  render() {
    const todaysDate = moment().format('YYYY-MM-DD')
    return (
      <View style={styles.pageContainer}>
        {this.state.showModal ?
          <SettingsModal
            exitModal={this.showModalHandler}
            navigationModal={this.modalNavigationHandler}

          /> : null}
        <Header showModal={this.showModalHandler} uID= {this.state.uID}/>
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
        <Footer roleID={this.state.roleID} uID={this.state.uID} eventTitle={this.state.eventTitle}/>
      </View>

    )
  }
}

export default Calendar;