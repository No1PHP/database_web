import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	list: [{
		stallName:'',
		stallLocation:'',
		stallRent:'',
		costLastMonth:'',
		operationName:'',
		recipes:'',
}],
	pageNo:'1',
	size:'10',
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_STALL:
			{
				const newState = JSON.parse(JSON.stringify(state));
				newState.list = action.list;
				return newState;
			}
		default:
			return state;
	}
}
