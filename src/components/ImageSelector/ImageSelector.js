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


const profile_image_icon = <FontAwesome5 size={150} name={'user-circle'} solid color="lightgrey" />; // best pratice att lägga en const utanför huvudfunktionen i react?? 
const cover_photo_icon = <FontAwesome5 size={150} name={'image'} light color="lightgrey" />;
const remove_image_icon = <FontAwesome5 size={40} name={'times-circle'} light color="red" />;

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

    removeImageHandler = () => {
        this.setState({ photo: null });
        this.props.deleteImageHandler();
    }

    setUploadImage = () => {
        const { photo } = this.state;

        let uploadIcon = null;
        let imageSource = null;
        if (photo) {
            imageSource = photo.uri;
        } else if (this.props.source.uri) {
            imageSource = this.props.source.uri;
        }
        else {
            if (this.props.parentRoute === "ProfilePageRoute" || this.props.parentRoute === "CreateAccountPageRoute") {
                uploadIcon = profile_image_icon
            }
            else {
                uploadIcon = cover_photo_icon
            }
        }

        return [uploadIcon, imageSource];
    }


    render() {

        const values = this.setUploadImage();
        const uploadIcon = values[0];
        const imageSource = values[1];

        return (
            <View style={styles.container}>
                <View style={styles.imageSelectorContainer}>
                    <TouchableOpacity
                        style={styles.removeIconButton}
                        onPress={this.removeImageHandler}>
                        {this.state.photo || this.props.source.uri ?
                            <View style={styles.removeIconCircle}>{remove_image_icon}</View>
                            : null}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.ImageSelectorButton}
                        onPress={this.choosePhotoHandler}>
                        <View style={{ alignItems: 'center' }}>

                            {this.state.photo || this.props.source.uri ?
                                <Image source={{ uri: imageSource }}
                                    style={this.props.parentRoute === "ProfilePageRoute" ||
                                        this.props.parentRoute === "CreateAccountPageRoute" ?
                                        styles.profileImage :
                                        styles.eventImage} /> :
                                <View>{uploadIcon}</View>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.ImageSelectorTxt}>{this.props.children}</Text>
            </View>
        )
    }
}

export default ImageSelector;