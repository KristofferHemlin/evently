import axios from 'axios';
import store from '../store/store';
import * as actionTypes from '../store/actions';
import URL from '../config';

import NavigationService from '../navigation/NavigationService';

axios.interceptors.request.use(request => {
    const state = store.getState();
    request.headers.Authorization = "Bearer " + state.accessToken;
    return request;
})

axios.interceptors.response.use(response => {
    return response;
}, error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.headers.retry) {
        const state = store.getState();
        originalRequest.headers.retry = true;

        return axios.post(URL + 'tokens/refresh', {
            refreshToken: state.refreshToken,
            userId: state.userID,
        })
            .then((response) => {
                store.dispatch({
                    type: actionTypes.SAVE_TOKENS, payload: {
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }
                })
                return axios(originalRequest);
            })
            .catch((error) => {
                NavigationService.navigate('LoginRoute', {
                    showErrorMessage: true
                });
                return Promise.reject(error);
            })
    }
    return Promise.reject(error);
})