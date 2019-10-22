import * as actionTypes from '../actions';

const initialState = {
    userID: null,
    roleID: null,
    activityID: null,
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_IDS:
            return {
                ...state, //kopierar över statet i den här komponenten för att unvdika mutability.
                userID: action.payload.userID,
                roleID: action.payload.roleID,
            }
        default:
            return state
    }
};

export default dataReducer;