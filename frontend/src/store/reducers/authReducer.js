import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, LOGOUT_FAIL, ADD_IMAGE_REQUEST, ADD_IMAGE_SUCCESS, ADD_IMAGE_FAIL} from '../types/userActionsTypes';
import { isEmpty } from '../../utils';
    
    function authReducer ( state = {
        loading: false,
        user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{},
        uploaded_image:'',    
      error: null
      }, action) {
        switch(action.type){
            case REGISTER_REQUEST: return { ...state, loading: true};
            case REGISTER_SUCCESS: return { ...state, loading: false, user: action.payload.data.user, error: null};
            case REGISTER_FAIL: return { ...state, loading: false, user: {}, token: null, error: action.payload };

            case ADD_IMAGE_REQUEST: return { ...state, loading: true};
            case ADD_IMAGE_SUCCESS: return { ...state, loading: false, uploaded_image: action.payload.data.image, error: null};
            case ADD_IMAGE_FAIL: return { ...state, loading: false, user: {}, token: null, error: action.payload };

            case LOGIN_REQUEST: return { ...state, loading: true};
            case LOGIN_SUCCESS: return { ...state, loading: false, user: action.payload.data.user, error: null};
            case LOGIN_FAIL: return { ...state, loading: false, user: {}, token: null, error: action.payload };


            case LOGOUT_REQUEST: return { ...state, loading: true};
            case LOGOUT_SUCCESS: return { ...state, loading: false, user: {}};
           


            default: return state;
        }
      }

      export default authReducer;