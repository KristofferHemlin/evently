import * as ActionTypes from './actionsTypes';

export const saveUser = (userID, roleID, accessToken, refreshToken) => {
    return {
        type: ActionTypes.SAVE_USER,
        payload: {
            userID: userID,
            roleID: roleID,
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
}