import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	list: [],
	pageNo:'1',
	size:'10',
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_MATERIAL:
			{
				return state.merge(
					{list: fromJS(action.list)}
				);

			}
		default:
			return state;
	}
}
