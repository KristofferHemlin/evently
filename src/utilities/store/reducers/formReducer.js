import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    formBody: null,
    saveFormDataLoading: false,
    formDataSaved: false,
    formError: null,
    showToasterMessage: false,
};

const formReducer = (state = initialState, action) => {
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
                formBody: action.payload.formData
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
        default:
            return state
    }
};

export default formReducer;