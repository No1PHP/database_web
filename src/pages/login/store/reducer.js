import { fromJS } from 'immutable';
import * as constants from './constants';
import { createStore } from 'redux'
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import {LOG_STATUS} from "../../../common/LOG_STATUS";
/*
const defaultState = fromJS({
	login: false,
	//account: ''
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
		{
			//return state.set(['login', action.value],['account',action.account]);
			return state.set(['login', action.value]);
		}
		case constants.LOGOUT:{
			return state.set('login', action.value);
		}
		default:
			return state;
	}
}
*
 */

const defaultState = fromJS({
	login: false,
	account: ''
});

const changeLogStatus = (state,action) => {
	return state.merge({
		//'login': fromJS(createStore(action.value,[ 'Use Redux' ])),
		'login': fromJS(action.value),
		'account': fromJS(action.account),
	});
}


export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
			return changeLogStatus(state,action);
		case constants.LOGOUT:
			return state.set('login', action.value);
		default:
			return state;
	}
}
