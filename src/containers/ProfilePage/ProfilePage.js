import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';

import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Använde ett package då vanliga avoidkeybord inte funka
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-easy-toast'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HeadlineOverview from '../../components/HeadlineOverview/HeadlineOverview';

import styles from './ProfilePage.style';
import URL from '../../config';
import * as dataActions from '../../utilities/store/actions/data';
import toasterStyle from '../../components/ToasterStyle/ToasterStyle.style';

const profileAvatar = <FontAwesome5 size={130} name={'user-circle'} solid color="lightgray" />;

class ProfilePage extends Component {

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            let infoChanged = Boolean(this.props.navigation.getParam('infoChanged', false));
            if (infoChanged) {
                this.refs.toast.show('Your changes have been submitted!', 2000);
            }
            this.fetchUserData(this.props.userID);

        })
    }

    fetchUserData = (userID) => {
        this.props.onInitUser(userID);
    }

    handleEditPress = () => {
        this.props.navigation.navigate('ChangeInfoRoute', {
            parentRoute: 'ProfilePageRoute',
            http_update_url: URL + 'users/' + this.props.userID,
            http_get_url: URL + 'users/' + this.props.userID,
            imageUrl: this.props.userInformation.profileImageUrl,
            infoChanged: null,
            fields: {
                firstName: {
                    label: 'First Name',
                    key: 'firstName',
                    value: this.props.userInformation.firstName,
                    type: 'text',
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                lastName: {
                    label: 'Last Name',
                    key: 'lastName',
                    value: this.props.userInformation.lastName,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                },
                email: {
                    label: 'Email',
                    key: 'email',
                    value: this.props.userInformation.email,
                    keyboardType: 'email-address',
                    secureTextEntry: false,
                    autoCapitalize: 'none',
                },
                phone: {
                    label: 'Phone',
                    key: 'phone',
                    keyboardType: 'phone-pad',
                    value: this.props.userInformation.phone,
                    secureTextEntry: false,
                },
                companyDepartment: {
                    label: 'Company Department',
                    key: 'companyDepartment',
                    type: 'text',
                    value: this.props.userInformation.companyDepartment,
                    secureText: false,
                },
                aboutMe: {
                    label: 'About Me',
                    key: 'aboutMe',
                    value: this.props.userInformation.aboutMe,
                    secureTextEntry: false,
                    autoCapitalize: 'sentences',
                    multiline: 'true',
                },
                allergiesOrPreferences: {
                    label: 'Allergies',
                    key: 'allergies',
                    value: this.props.userInformation.allergiesOrPreferences,
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
                                {this.props.userInformation ?
                                    this.props.userInformation.profileImageUrl ?
                                        <View>
                                            <Image style={styles.profilePicture}
                                                source={{ uri: this.props.userInformation.profileImageUrl }} />
                                        </View> :
                                        <View>{profileAvatar}</View>
                                    : null}
                                <Text style={styles.nameText}>{this.props.userInformation ? this.props.userInformation.firstName : ""} {this.props.userInformation ? this.props.userInformation.lastName : ""}</Text>
                            </View>
                            <View style={styles.line}></View>

                            <View>
                                <Text style={styles.subTitles}>Email</Text>
                                <Text style={styles.ordinaryText}>{this.props.userInformation ? this.props.userInformation.email : ""}</Text>
                                <Text style={styles.subTitles}>Phone</Text>
                                <Text style={styles.ordinaryText}>{this.props.userInformation ? this.props.userInformation.phone : ""}</Text>
                                <Text style={styles.subTitles}>Company Department</Text>
                                <Text style={styles.ordinaryText}>{this.props.userInformation ? this.props.userInformation.companyDepartment : ""}</Text>
                                <Text style={styles.subTitles}>About Me</Text>
                                <Text style={styles.ordinaryText}>{this.props.userInformation ? this.props.userInformation.aboutMe : ""}</Text>
                                <Text style={styles.subTitles}>Allergies</Text>
                                <Text style={styles.ordinaryText}>{this.props.userInformation ? this.props.userInformation.allergiesOrPreferences : ""}</Text>
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
        userInformation: state.userInformation,
        userID: state.userID,
        roleID: state.roleID,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitUser: (userID) => dispatch(dataActions.initUser(userID)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
