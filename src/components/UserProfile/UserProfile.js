import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';

import { connect } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-easy-toast'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeadlineOverview from '../HeadlineOverview/HeadlineOverview';

import styles from './UserProfile.style';
import URL from '../../config';
import toasterStyle from '../GeneralStyle/ToasterStyle.style.js';

const profileAvatar = <FontAwesome5 size={130} name={'user-circle'} solid color="lightgray" />;

class UserProfile extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            companyDepartment: '',
            about: '',
            allergies: '',
            infoAllowedChange: true,
            profileImage: '',
        }
        props.navigation.addListener('willFocus', () => {
            let infoChanged = Boolean(this.props.navigation.getParam('infoChanged', false));
            if (infoChanged && this.state.infoAllowedChange) {
                this.setState({ infoAllowedChange: false })
                this.refs.toast.show('Your changes have been submitted!', 2000);
            }

            this.fetchUserData(this.props.userID);

        })
        console.disableYellowBox = true;
    }

    fetchUserData = (userID) => {
        axios.get(URL + 'users/' + userID)
            .then((response) => {
                console.log('response', response);
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phone: response.data.phone,
                    companyDepartment: response.data.companyDepartment,
                    about: response.data.aboutMe,
                    allergies: response.data.allergiesOrPreferences,
                    profileImage: response.data.profileImageUrl,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onEditSubmit(input) {
        this.setState({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            companyDepartment: input.companyDepartment,
            about: input.aboutMe,
            allergies: input.allergies,
            infoAllowedChange: true,
        })
    }

    handleEditPress = () => {
        this.onEditSubmit = this.onEditSubmit.bind(this)
        this.props.navigation.navigate('ChangeInfoRoute', {
            onEditSubmit: (input) => this.onEditSubmit(input),
            uID: this.props.userID,
            parentRoute: 'UserProfileRoute',
            http_update_url: URL + 'users/' + this.props.userID,
            http_get_url: URL + 'users/' + this.props.userID,
            fields: {
                firstName: {
                    label: 'First Name',
                    key: 'firstName',
                    value: this.state.firstName,
                    type: 'text',
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                lastName: {
                    label: 'Last Name',
                    key: 'lastName',
                    value: this.state.lastName,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                email: {
                    label: 'Email',
                    key: 'email',
                    value: this.state.email,
                    keyboardType: 'email-address',
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                phone: {
                    label: 'Phone',
                    key: 'phone',
                    keyboardType: 'phone-pad',
                    value: this.state.phone,
                    secureTextEntry: false,
                },
                companyDepartment: {
                    label: 'Company Department',
                    key: 'companyDepartment',
                    type: 'text',
                    value: this.state.companyDepartment,
                    secureText: false,
                },
                aboutMe: {
                    label: 'About Me',
                    key: 'aboutMe',
                    value: this.state.about,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                    multiline: 'true',
                },
                allergiesOrPreferences: {
                    label: 'Allergies',
                    key: 'allergies',
                    value: this.state.allergies,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
            },
            formErrors: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                companyDepartment: '',
            }
        });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <View style={toasterStyle.container}>
                    <Toast ref="toast"
                        style={toasterStyle.successMessage}
                        position='top'
                        positionValue={0} />
                </View>
                <Header />
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View style={styles.userInfo}>
                            <HeadlineOverview
                                infoButtonStatus={false}
                                editButtonStatus={true}
                                onEditPress={() => this.handleEditPress()}
                            >User Profile</HeadlineOverview>
                            <View style={styles.profilePictureView}>

                                {this.state.profileImage ?
                                    <View>
                                        <Image style={styles.profilePicture}
                                        source={{ uri: this.state.profileImage }} />
                                    </View>
                                    :
                                    <View>{profileAvatar}</View>
                                }

                                <Text style={styles.nameText}>{this.state.firstName} {this.state.lastName}</Text>
                            </View>
                            <View style={styles.line}></View>

                            <View>
                                <Text style={styles.subTitles}>Email</Text>
                                <Text style={styles.ordinaryText}>{this.state.email}</Text>
                                <Text style={styles.subTitles}>Phone</Text>
                                <Text style={styles.ordinaryText}>{this.state.phone}</Text>
                                <Text style={styles.subTitles}>Company Department</Text>
                                <Text style={styles.ordinaryText}>{this.state.companyDepartment}</Text>
                                <Text style={styles.subTitles}>About Me</Text>
                                <Text style={styles.ordinaryText}>{this.state.about}</Text>
                                <Text style={styles.subTitles}>Allergies</Text>
                                <Text style={styles.ordinaryText}>{this.state.allergies}</Text>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
                <Footer />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID,
        roleID: state.roleID
    }
}


export default connect(mapStateToProps)(UserProfile);
