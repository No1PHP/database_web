import axios from 'axios';
import * as constants from './constants';

const changePage = (pageNo, size) => ({
	type: constants.GET_STALL,
	pageNo,
	size
});



export const getStall = (pageNo,size) => {
	return (dispatch) => {
		axios.get('localhost:8000/STALL'+'pageNo='+pageNo+'&'+'size='+size).then((res) => {
			const result = res.data.data;
			dispatch(changePage(result.pageNo, result.size));
		}).catch((e) => {
			console.log(e.message)
		})
	}
};

