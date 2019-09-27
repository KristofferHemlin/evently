import React, { Component } from 'react';
import {
    StyleSheet, 
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    ScrollView,
    Button,
} from 'react-native';

import Header from '../Header';
import Footer from '../Footer';
import ProfilePreview from '../ProfilePreview';
import Croatia from '../../../images/CROT.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { blue, red } from 'ansi-colors';

const infoCircleIcon = <FontAwesome5 size={20} name={'info-circle'} solid color="rgba(74,144,226,1)" />;

class EventOverview extends Component{

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

const styles = StyleSheet.create({

    pageContainer:{
        flex:1,
    },

    eventImage:{
        width: '100%',
        height: 250,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },

    eventNameView:{
        padding:10,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    eventName:{
        fontSize: 25,
        color: 'white',
        fontWeight: '800',
    },

    eventInfo:{
        height:1000,
        backgroundColor: 'white',
    },

    mainTitleView:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 30,
        paddingBottom: 1,
    },

    mainTitleViewLeft:{
        flexDirection: 'row',
    // inte den snyggaste lösningen...?
    },

    editButton:{
        //Ska CCS:as till höger.
        // alignItems: 'self-end',
       color: 'rgba(74,144,226,1)',
       borderWidth: 1,
       borderColor: 'rgba(74,144,226,1)',
       borderRadius: 3,
       fontSize: 16,
       paddingTop: 3,
       paddingBottom: 3,
       paddingLeft: 7,
       paddingRight: 7,
    },

    infoButton:{
        margin:5,
    },

    titles:{
        fontWeight: '600',
        fontSize: 16,
        color: 'black',
    },

    mainTitle:{
        fontSize: 22,
    },

    subTitles:{
        marginLeft: 30,
        marginTop: 30,
    },

   ordinaryText:{
        color: 'gray',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
    },

    line:{
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginLeft: 30,
        marginRight: 30,
    },

});

export default EventOverview;