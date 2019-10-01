import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Croatia from '../EventOverview/images/CROT.jpg';
import styles from './UserProfile.style.js';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

class EventOverview extends Component{

    static navigationOptions = {
        header : null,
      };

    state = {
            name: 'Mr. Andersson',
            company: 'CNS/CAD hybrid',
            role: 'Company Bro', 
            email: 'Andersson@claremont.se',
            phone: '070 999 999',
            about: 'nah bruh',
            allergies: 'Ogillar papaya',
            image: Croatia,

            isLoggedIn: true,
        }

    render(){

        const isLoggedIn = this.state.isLoggedIn;

        

        return(
            <View style={styles.pageContainer}>
                <Header/>

                <ScrollView>
                    <View style={styles.userInfo}>

                        <HeadlineOverview infoButtonStatus={false} editButtonStatus={isLoggedIn}>User Profile</HeadlineOverview>

                        <View style={styles.profilePictureView}>
                            <Image source={this.state.image} style={styles.profilePicture}/>
                            <Text style={styles.nameText}>{this.state.name}</Text>
                            <Text style={styles.companyText}>{this.state.company}</Text>        
                        </View>

                        <View style={styles.line}></View>

                        <Text style={styles.subTitles}>Role</Text>
                        <Text style={styles.ordinaryText}>{this.state.role}</Text>
                        <Text style={styles.subTitles}>Email</Text>
                        <Text style={styles.ordinaryText}>{this.state.email}</Text>
                        <Text style={styles.subTitles}>Phone</Text>
                        <Text style={styles.ordinaryText}>{this.state.phone}</Text>
                        <Text style={styles.subTitles}>About</Text>
                        <Text style={styles.ordinaryText}>{this.state.about}</Text>
                        <Text style={styles.subTitles}>Allergies</Text>
                        <Text style={styles.ordinaryText}>{this.state.allergies}</Text>

                    </View>
                </ScrollView>
                
                <Footer/>
            </View>
        )
    }
}

export default EventOverview;