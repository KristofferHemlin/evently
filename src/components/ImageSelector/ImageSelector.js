import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './ImageSelector.style';
import ImagePicker from 'react-native-image-picker';


const uploadImageIcon = <FontAwesome5 size={150} name={'user-circle'} solid color="lightgrey" />; // best pratice att lägga en const utanför huvudfunktionen i react?? 
const remove_image = <FontAwesome5 size={40} name={'times-circle'} light color="red" />;

class ImageSelector extends Component {

    state = {
        photo: null,
    }
    choosePhotoHandler = () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response });
                this.props.saveImageHandler(response);
            }
        })
    }


    render() {
        const { photo } = this.state;
        if (photo) {
            imgButton = <Image
                source={{ uri: photo.uri }}
                style={styles.profileImage}
            />
        } else if (this.props.source.uri) {
            imgButton = <Image
                source={{ uri: this.props.source.uri }}
                style={styles.profileImage}
            />
        }
        else {
            imgButton = uploadImageIcon
        }
        return (
            <View style={styles.imageSelectorContainer}>

                <TouchableOpacity
                    style={styles.notificationIcon}
                    onPress={this.removeImageHandler}>
                    {this.props.source.uri ?
                        <View style={styles.notificationIconCircle} />
                        : null}
                    {remove_image}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.ImageSelectorBtn}
                    onPress={this.choosePhotoHandler}>
                    <View style={{ alignItems: 'center' }}>
                        {imgButton}
                        <Text style={styles.ImageSelectorTxt}>{this.props.children}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ImageSelector;