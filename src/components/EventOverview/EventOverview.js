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
import Croatia from '../../../images/CROT.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const infoCircleIcon = <FontAwesome5 size={20} name={'info-circle'} solid color="rgba(74,144,226,1)" />;

class EventOverview extends Component{
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
                            <Text style={[styles.titles, styles.mainTitle]}>Event overview</Text>
                            <TouchableOpacity style={styles.infoButton}>
                                {infoCircleIcon}
                            </TouchableOpacity>
                            <Button title="Press me" onPress={() => Alert.alert('Simple Button pressed')} style={styles.editButton}/>
                        </View>
                        <View style={styles.line}></View>
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
        flexDirection: 'row',
        padding: 30,
        paddingBottom: 1,
    },

    editButton:{
        //Ska CCS:as till höger.
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

    line:{
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginLeft: 30,
        marginRight: 30,
    },

});

export default EventOverview;