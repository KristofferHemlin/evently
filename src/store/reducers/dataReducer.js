import * as actionTypes from '../actions';

const initialState = {
    userID: null,
    roleID: null,
    token: null,
    activityID: null,
    eventTitle: '',
    notificationStatus: null,
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_USER:
            return {
                ...state, //kopierar över statet i den här komponenten för att unvdika mutability.
                userID: action.payload.userID,
                roleID: action.payload.roleID,
                token: action.payload.token,
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
        case actionTypes.ON_DELETE_TOKEN:
            return {
                ...state,
                token: null
            }
        default:
            return state
    }
};

export default dataReducer;