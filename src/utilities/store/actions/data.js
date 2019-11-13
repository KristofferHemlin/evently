import * as actionTypes from './actionsTypes';
import axios from 'axios';
import URL from '../../../config';

export const initUser = (userID) => {
    return dispatch => {
        axios.get(URL + 'users/' + userID)
            .then((response) => {
                dispatch(setUser(response.data))
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const setUser = (userInformation) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            userInformation: userInformation
        }
    }
}

export const initEvent = (userID) => {
    return dispatch => {
        axios.get(URL + 'users/' + userID + '/currentevent')
            .then((response) => {
                dispatch(setEvent(response.data))
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const setEvent = (eventInformation) => {
    return {
        type: actionTypes.SET_EVENT,
        payload: {
            eventInformation: eventInformation
        }
    }
}

export const initActivities = (userID) => {
    return dispatch => {
        axios.get(URL + 'users/' + userID + '/events/1/activities')
            .then((response) => {
                dispatch(setActivities(response.data))
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const setActivities = (activityInformation) => {
    return {
        type: actionTypes.SET_ACTIVITIES,
        payload: {
            activityInformation: activityInformation
        }
    }
}

export const saveUser = (userID, roleID, accessToken, refreshToken) => {
    return {
        type: actionTypes.SAVE_USER,
        payload: {
            userID: userID,
            roleID: roleID,
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
}

export const saveTokens = (accessToken, refreshToken) => {
    return {
        type: actionTypes.SAVE_TOKENS,
        payload: {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
}

export const saveEventTitle = (eventTitle) => {
    return {
        type: actionTypes.SAVE_EVENT_TITLE,
        payload: {
            eventTitle: eventTitle,
        }
    }
}

export const saveActivityID = (activityID) => {
    return {
        type: actionTypes.SAVE_ACTIVITY_ID,
        payload: {
            activityID: activityID,
        }
    }
}

export const saveNotificationStatus = (notificationStatus) => {
    return {
        type: actionTypes.SAVE_NOTIFICATION_STATUS,
        payload: {
            notificationStatus: notificationStatus,
        }
    }
}

export const clearDataOnLogout = () => {
    return {
        type: actionTypes.CLEAR_DATA_ON_LOGOUT
    }
}