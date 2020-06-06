import { fromJS } from 'immutable';
import * as constants from './constants';

import Thunk from 'redux-thunk';
import asyncSessionStorage from "redux-persist/lib/storage"
import {applyMiddleware, compose} from "redux";
const { browserHistory } = require('react-router');
const { syncHistoryWithStore, routerReducer } = require('react-router-redux');
const { createStore, combineReducers } = require('redux');

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

const { persistStore, autoRehydrate } = require('redux-persist');
const defaultState = fromJS({
	login: false,
	account: ''
});
const { login,account } = require('./reducer');
const reducer = combineReducers({
	login,
	account,
	routing: routerReducer
})
const store = createStore(
	reducer,
	defaultState,
	autoRehydrate(),
);
persistStore(
	store,
	{
		storage: asyncSessionStorage,

	},
);
const history = syncHistoryWithStore(browserHistory, store);
module.exports = {
	store,
	history,
};



const persistConfig = {
	key: 'root',
	storage: storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = compose(persistedReducer, {}, composeEnhancers(applyMiddleware(Thunk)));
*/
const defaultState = fromJS({
	login: false,
	account: ''
});

const changeLogStatus = (state,action) => {
	return state.merge({
		//'login': fromJS(createStore(action.value,[ 'Use Redux' ])),
		login: fromJS(action.value),
		account: fromJS(action.account),
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
