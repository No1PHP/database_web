import { fromJS } from 'immutable';
import * as constants from './constants';
import {LOG_STATUS} from "../../../common/LOG_STATUS";

const defaultState = fromJS({
	login: false,
	username: ''
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
		{
			return state.set(['login', action.value],['account',action.account]);
		}
		case constants.LOGOUT:{
			return state.set('login', action.value);
		}
		default:
			return state;
	}
}
