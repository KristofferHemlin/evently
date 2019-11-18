
import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const saveFormDataInit = () => {
    return {
        type: actionTypes.SAVE_FORMDATA_INIT
    }
}

export const saveFormDataSucess = (response, formData) => {
    return {
        type: actionTypes.SAVE_FORMDATA_SUCESS,
        payload: {
            response: response,
            formData: formData
        }
    }
}

export const saveFormDataFailed = (formError) => {
    return {
        type: actionTypes.SAVE_FORMDATA_FAILED,
        payload: {
            formError: formError
        }
    }
}

export const saveFormDataStart = () => {
    return {
        type: actionTypes.SAVE_FORMDATA_START
    }
}

export const saveFormData = (http_update_url, body) => {
    return dispatch => {
        dispatch(saveFormDataStart());
        axios.put(http_update_url, body, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                dispatch(saveFormDataSucess(response.data, body))
            })
            .catch((error) => {
                dispatch(saveFormDataFailed(error))
            })
    }

}

export const setToasterShow = () => {
    return {
        type: actionTypes.SET_TOASTER_SHOW,
    }
}

export const setToasterHide = () => {
    return {
        type: actionTypes.SET_TOASTER_HIDE
    }
}
