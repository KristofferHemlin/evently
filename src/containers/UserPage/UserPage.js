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

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HeadlineOverview from '../../components/HeadlineOverview/HeadlineOverview';

import styles from './UserPage.style';
import * as dataActions from '../../utilities/store/actions/data';

const profileAvatar = <FontAwesome5 size={130} name={'user-circle'} solid color="lightgray" />;

class UserPage extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        isCompanyManager: false,
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            const userID = Number(this.props.navigation.getParam('participantID', null));

            if (this.props.roleID == 1) {
                this.setState({ isCompanyManager: true })
            }

            this.fetchUserData(userID);
        })
    }

    fetchUserData = (userID) => {
        this.props.onInitUser(userID);
    }

    render() {
        console.log('isCompanyManager', this.state.isCompanyManager);
        return (
            <View style={styles.pageContainer}>
                <Header />
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View style={styles.userInfo}>
                            <HeadlineOverview
                                infoButtonStatus={false}
                                editButtonStatus={false}
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
                                {this.state.isCompanyManager ?
                                    <View>
                                        <Text style={styles.subTitles}>Allergies</Text>
                                        <Text style={styles.ordinaryText}>{this.props.userInformation ? this.props.userInformation.allergiesOrPreferences : ""}</Text>
                                    </View> : null}
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
        roleID: state.roleID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitUser: (userID) => dispatch(dataActions.initUser(userID)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
