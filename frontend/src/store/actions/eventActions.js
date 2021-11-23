import {GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_FAIL, 
    ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAIL, DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAIL} 
    from '../types/eventActionTypes';
import axios from 'axios';
    
    export const getEvents = () => (dispatch, getState) => {
        dispatch({type: GET_EVENTS_REQUEST});
        axios.get(`http://localhost:5000/events/get-events`).
        then(data => { //console.log(data);
            dispatch({type: GET_EVENTS_SUCCESS, payload: data});
        })
        .catch(err=> { console.log(err); dispatch({type: GET_EVENTS_FAIL, payload: err.response.data})});
    };


    export const addEvent = (x) => (dispatch, getState) => {
        dispatch({type: ADD_EVENT_REQUEST}); 
        axios.post(`http://localhost:5000/events/add-event`, x, {headers: {'x-auth': getState().authReducer.user.token}}).
        then(data => {
            dispatch({type: ADD_EVENT_SUCCESS});
        })
        .catch(err=> { console.log(err); dispatch({type: ADD_EVENT_FAIL, payload: err.response.data})});
    };

    export const deleteEvent = (id) => (dispatch, getState) => {
        dispatch({type: DELETE_EVENT_REQUEST}); 
        axios.delete(`http://localhost:5000/events/delete-event/${id}`, {headers: {'x-auth': getState().authReducer.user.token}}).
        then(data => {
            dispatch({type: DELETE_EVENT_SUCCESS, payload: data});
        })
        .catch(err=> { console.log(err); dispatch({type: DELETE_EVENT_FAIL, payload: err.response.data})});
    };
/* 
    export const login = (x) => (dispatch, getState) => {
        dispatch({type: LOGIN_REQUEST});
        axios.post(`/users/sign-in`,x).
        then(data => { //console.log(data);
            dispatch({type: LOGIN_SUCCESS, payload: data});
        })
        .catch(err=> { dispatch({type: LOGIN_FAIL, payload: err.response.data.message})});
    }; */