import React, { Component } from 'react';
import {
    StyleSheet, 
    View,
    ScrollView,
    Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Header from './Header';
import Footer from './Footer';

class Homepage extends Component{

    handlePhotos = () => {
        const options = {}; 
        ImagePicker.launchImageLibrary(options, response => {
            console.log("response", response);
        });
    };
    
    render(){
        return(
            <View style={styles.homepageContainer}>
                <Button
                title="Photo"
                onPress={this.handlePhotos}/>
            </View>
            // <View style={styles.homepageContainer}>
            //     <ScrollView style ={styles.bodyContainer}> 
                  
            //     </ScrollView>
            //     <Header/>
            //     <Footer/>
            // </View>
            
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