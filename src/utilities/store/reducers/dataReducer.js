import * as actionTypes from '../actions/actionsTypes';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

const initialState = {
    userID: null,
    roleID: null,
    accessToken: null,
    refreshToken: null,
    activityID: null,
    notificationStatus: null,
    eventInformation: null,
    userInformation: null,
    activityInformation: null,
    notificationInformation: null,
    getNotificationsLoading: true,
    formBody: null,
    saveFormDataLoading: false,
    formDataSaved: false,
    formError: null,
    showToasterMessage: false,
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_FORMDATA_INIT:
            return {
                ...state,
                formDataSaved: false,
            }
        case actionTypes.SAVE_FORMDATA_START:
            return {
                ...state,
                saveFormDataLoading: true
            }
        case actionTypes.SAVE_FORMDATA_SUCESS:
            return {
                ...state,
                showToasterMessage: true,
                saveFormDataLoading: false,
                formDataSaved: true,
                formData: action.payload.formData
            }
        case actionTypes.SAVE_FORMDATA_FAILED:
            return {
                ...state,
                showToasterMessage: true,
                saveFormDataLoading: false,
                formError: action.payload.formError,
            }
        case actionTypes.SET_TOASTER_SHOW:
            return {
                ...state,
                showToasterMessage: true,
            }
        case actionTypes.SET_TOASTER_HIDE:
            return {
                ...state,
                showToasterMessage: false,
            }
        case actionTypes.SET_EVENT:
            const newEvent = {
                ...action.payload.eventInformation,
                startTime: moment(new Date(action.payload.eventInformation.startTime.replace(' ', 'T'))).format('YYYY-MM-DD'),
                endTime: moment(new Date(action.payload.eventInformation.endTime.replace(' ', 'T'))).format('YYYY-MM-DD'),
            }
            return {
                ...state,
                eventInformation: newEvent,
            }

        case actionTypes.SET_USER:
            return {
                ...state,
                userInformation: action.payload.userInformation,
            }
        case actionTypes.SET_ACTIVITY:
            const newActivity = {
                ...action.payload.activityInformation,
                startTime: moment(new Date(action.payload.activityInformation.startTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm'),
                endTime: moment(new Date(action.payload.activityInformation.endTime.replace(' ', 'T'))).format('YYYY-MM-DD HH:mm'),
            }
            return {
                ...state,
                activityInformation: newActivity
            }
        case actionTypes.SET_NOTIFICATIONS:
            return {
                ...state,
                notificationInformation: action.payload.notificationInformation,
                getNotificationsLoading: false,
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
                    console.log(error);
                })
            return initialState
        default:
            return state
    }
};

export default dataReducer;