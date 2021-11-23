import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, LOGOUT_FAIL, ADD_IMAGE_REQUEST, ADD_IMAGE_SUCCESS, ADD_IMAGE_FAIL} from '../types/userActionsTypes';
import axios from 'axios';
    
    export const register = (x) => (dispatch, getState) => {
        dispatch({type: REGISTER_REQUEST});
        axios.post(`http://localhost:5000/auth/register`,x).
        then(data => { //console.log(data); 
            localStorage.setItem('user', JSON.stringify(data.data.user));
            dispatch({type: REGISTER_SUCCESS, payload: data});
        })
        .catch(err=> { console.log(err); dispatch({type: REGISTER_FAIL, payload: err.response.data})});
    };

    export const login = (x) => (dispatch, getState) => {
        dispatch({type: LOGIN_REQUEST});
        axios.post(`http://localhost:5000/auth/login`,x).
        then(data => {
            localStorage.setItem('user', JSON.stringify(data.data.user));
            dispatch({type: LOGIN_SUCCESS, payload: data});
        })
        .catch(err=> { console.log(err); dispatch({type: LOGIN_FAIL, payload: err.response.data})});
    };


    export const upload_image = (x) => (dispatch, getState) => {
        dispatch({type: ADD_IMAGE_REQUEST});
        axios.post(`http://localhost:5000/auth/add-image`,x , {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).
        then(data => { //console.log(data);
            dispatch({type: ADD_IMAGE_SUCCESS, payload: data});
        })
        .catch(err=> { console.log(err); dispatch({type: ADD_IMAGE_FAIL, payload: err.response.data})});
    };

    export const logout = () => (dispatch, getState) => {
        dispatch({type: LOGOUT_REQUEST});
            localStorage.removeItem('user');
            dispatch({type: LOGOUT_SUCCESS});
       
    };