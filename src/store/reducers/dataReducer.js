import * as actionTypes from '../actions';

const initialState = {
    userID: null,
    roleID: null,
    activityID: null,
    eventTitle: '',
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_IDS:
            return {
                ...state, //kopierar över statet i den här komponenten för att unvdika mutability.
                userID: action.payload.userID,
                roleID: action.payload.roleID,
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
        default:
            return state
    }
};

export default dataReducer;