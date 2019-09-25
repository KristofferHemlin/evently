import React, { Component } from 'react';
import {
    StyleSheet, 
    View,
    ScrollView,
    Button
} from 'react-native';

import Header from './Header/Header';
import Footer from './Footer/Footer';

class Homepage extends Component{
    
    render(){
        return(
            <View style={styles.homepageContainer}>
            <Header/>
                <ScrollView style ={styles.bodyContainer}> 
                  
                </ScrollView>
                
                <Footer/>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    homepageContainer:{
        flex: 1,
        justifyContent: 'center'
    },
    bodyContainer:{
        flex: 1,
        
    }
  });

  export default Homepage; 