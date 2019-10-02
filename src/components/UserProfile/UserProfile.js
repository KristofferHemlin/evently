import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './UserProfile.style.js';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

import Croatia from '../EventOverview/images/CROT.jpg';



class UserProfile extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        name: 'Mr. Andersson',
        // company: 'CNS/CAD hybrid',
        // role: 'Company Bro', 
        email: 'Andersson@claremont.se',
        phone: '070 999 999',
        about: 'nah bruh',
        allergies: 'Ogillar papaya',
        image: Croatia,

        isLoggedIn: false,


        fields: [
            {
                key: 'firstName',
                name: 'First Name',
                type: 'text',
                label: 'First Name',
                value: '',
                secureText: false,
            },
            {
                key: 'lastName',
                name: 'Last Name',
                type: 'text',
                label: 'Last Name',
                value: '',
                secureText: false,
            },
            {
                key: 'email',
                name: 'Email',
                type: 'text',
                label: 'Email',
                value: '',
                secureText: false,
            },
            {
                key: 'phone',
                name: 'Phone',
                type: 'text',
                value: '',
                secureText: false,
            },
        ]
    }



    render() {

        const isLoggedIn = this.state.isLoggedIn;

        console.log("testing: ", this.state.fields[3].type);

        let inputInformation;
        if (isLoggedIn) {
            inputInformation = <View style={styles.inputForm}>
                {this.state.fields.map((input, idx) => {
                    return (
                        <View key={input.key}>
                            <Text style={styles.inputFormTitle}>{input.name}</Text>
                            <TextInput
                                value={input.value}
                                style={styles.input}
                                name={input.name}
                                type={input.type}
                                label={input.label}
                                placeholder={input.name}
                                secureTextEntry={input.secureText}
                                onChangeText={(value) => this.handleInputChange(value, idx)}
                            />
                        </View>
                    )

                })}
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.handleSubmit}>
                    {this.state.isLoading ? <ActivityIndicator size='small' color='white' /> : <Text style={styles.buttonText}>Submit </Text>}
                </TouchableOpacity>
            </View>;
        }

        else {
            console.log("Render nothing");
            inputInformation = <View>
                {/* <Text style={styles.subTitles}>Role</Text>
                <Text style={styles.ordinaryText}>{this.state.role}</Text> */}
                <Text style={styles.subTitles}>Email</Text>
                <Text style={styles.ordinaryText}>{this.state.email}</Text>
                <Text style={styles.subTitles}>Phone</Text>
                <Text style={styles.ordinaryText}>{this.state.phone}</Text>
                <Text style={styles.subTitles}>About</Text>
                <Text style={styles.ordinaryText}>{this.state.about}</Text>
                <Text style={styles.subTitles}>Allergies</Text>
                <Text style={styles.ordinaryText}>{this.state.allergies}</Text>
            </View>;
        }

        return (
            <View style={styles.pageContainer}>
                <Header />

                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View style={styles.userInfo}>

                            <HeadlineOverview infoButtonStatus={false} editButtonStatus={isLoggedIn}>User Profile</HeadlineOverview>

                            <View style={styles.profilePictureView}>
                                <Image source={this.state.image} style={styles.profilePicture} />
                                <Text style={styles.nameText}>{this.state.name}</Text>
                                {/* <Text style={styles.companyText}>{this.state.company}</Text>         */}
                            </View>

                            <View style={styles.line}></View>

                            {inputInformation}
                        </View>
                    </KeyboardAwareScrollView>

                </ScrollView>

                <Footer />
            </View>
        )
    }
}

export default UserProfile;
