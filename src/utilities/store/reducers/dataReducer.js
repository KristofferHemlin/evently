import * as actionTypes from '../actions/actionsTypes';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

const initialState = {
    userID: null,
    roleID: null,
    accessToken: null,
    refreshToken: null,
    activityID: null,
    eventTitle: '',
    notificationStatus: null,
    eventInformation: null,
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EVENT:
            console.log('action.payload', action.payload);
            action.payload.eventInformation.startTime = moment(new Date(action.payload.eventInformation.startTime.replace(' ', 'T'))).format('YYYY-MM-DD');
            action.payload.eventInformation.endTime = moment(new Date(action.payload.eventInformation.endTime.replace(' ', 'T'))).format('YYYY-MM-DD'); 
            return {
                ...state,
                eventInformation: action.payload.eventInformation,
            }
        case actionTypes.SAVE_USER:
            return {
                ...state, //kopierar över statet i den här komponenten för att unvdika mutability.
                userID: action.payload.userID,
                roleID: action.payload.roleID,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            }
        case actionTypes.SAVE_TOKENS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            }
        case actionTypes.SAVE_EVENT_TITLE:
            return {
                ...state,
                eventTitle: action.payload.eventTitle,
            }
        case actionTypes.SAVE_ACTIVITY_ID:
            return {
                ...state,
                activityID: action.payload.activityID,
            }
        case actionTypes.SAVE_NOTIFICATION_STATUS:
            return {
                ...state,
                notificationStatus: action.payload.notificationStatus,
            }
        case actionTypes.CLEAR_DATA_ON_LOGOUT:
            AsyncStorage.getAllKeys()
                .then(keys => AsyncStorage.multiRemove(keys))
                .catch((error) => {
                    console.log('error', error);
                })
            return initialState

        default:
            return state
    }
};

export default dataReducer;