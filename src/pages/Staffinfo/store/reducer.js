import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	list: [{
		name: 'egg',
		key: '1',
		type: 'food',
		unitPrice: '12',
		availableAmount: '100',
		availablePeriod: '90 days',
		materialOrders: '10',
		recipes: 'egg and tomato',
		materialUsages: 'everyday',
	}],
	pageNo:'1',
	size:'10',
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_MATERIAL:
			{
				const newState = JSON.parse(JSON.stringify(state));
				newState.list = action.list;
				return newState;
			}
		default:
			return state;
	}
}
