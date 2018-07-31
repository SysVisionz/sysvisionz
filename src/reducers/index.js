import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blogReducer from './blogReducer';
import siteReducer from './siteReducer';
import chatReducer from './chatReducer';

export default combineReducers({
	auth: authReducer,
	blog: blogReducer,
	site: siteReducer,
	chat: chatReducer
});