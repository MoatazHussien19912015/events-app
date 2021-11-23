import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventsReducer from './eventsReducer';
/* import {productListReducer, productDetailReducer, productAddReducer, productImageReducer} from './productReducer'; */
export default combineReducers({authReducer, eventsReducer });