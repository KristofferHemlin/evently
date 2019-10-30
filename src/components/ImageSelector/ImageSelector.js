import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './ImageSelector.style';
import ImagePicker from 'react-native-image-picker';


const uploadImageIcon = <FontAwesome5 size={150} name={'user-circle'} solid color="grey" />; // best pratice att lägga en const utanför huvudfunktionen i react?? 


class ImageSelector extends Component{

    state = {
        photo: null,
    }
    choosePhotoHandler = () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log("options: ", options);
            console.log("response: ", response);
            console.log("responseURI: ", response.uri);
            if(response.uri) {
                this.setState({photo: response});
                this.props.saveImageHandler(response);
            }
        })
    }


    render(){
        const { photo } = this.state; 
        if(photo) {
            imgButton =  <Image
            source={{uri: photo.uri}}
            style={styles.profileImage}   
            />
        } else {
            imgButton = uploadImageIcon
        }
        return(
            <View style={styles.imageSelectorContainer}>
                <Text style={styles.ImageSelectorTxt}>{this.props.children}</Text>
                <TouchableOpacity 
                style={styles.ImageSelectorBtn}
                onPress={this.choosePhotoHandler}>
                    {imgButton}
                </TouchableOpacity>
            </View>
        )
    }
}

export default ImageSelector;