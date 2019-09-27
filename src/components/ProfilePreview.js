import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

class ProfilePreview extends Component{

    state = {
        name: 'Marcus Nilsson', 
        title: 'Company manager',
    }

    render(){
        return(
            <TouchableOpacity>
                <View>
                    <Image></Image>
                    <Text style={styles.textName}>{this.state.name}</Text>
                    <Text style={styles.textTitle}>{this.state.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    textName:{
        fontWeight: '600',
    },

    textTitle:{
        color: 'gray',
    },
});

export default ProfilePreview;
