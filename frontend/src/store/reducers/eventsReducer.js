import {GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_FAIL, 
  ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAIL, DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAIL} 
  from '../types/eventActionTypes';
    
    function authReducer ( state = {
        loading: false,
        events: [],
        eventAdded: false,   
      error: null
      }, action) {
        switch(action.type){
            case GET_EVENTS_REQUEST: return { ...state, loading: true};
            case GET_EVENTS_SUCCESS: return { ...state, loading: false, events: action.payload.data.events, eventAdded: false, error: null};
            case GET_EVENTS_FAIL: return { ...state, loading: false, events: [], error: action.payload };

            case ADD_EVENT_REQUEST: return { ...state, loading: true};
            case ADD_EVENT_SUCCESS: return { ...state, loading: false, eventAdded: true, error: null};
            case ADD_EVENT_FAIL: return { ...state, loading: false, error: action.payload };

            case DELETE_EVENT_REQUEST: return { ...state, loading: true};
            case DELETE_EVENT_SUCCESS: return { ...state, loading: false, events: [...state.events.filter(x=>x._id!=action.payload.data.event._id)], error: null};
            case DELETE_EVENT_FAIL: return { ...state, loading: false, error: action.payload };



            default: return state;
        }
      }

      export default authReducer;