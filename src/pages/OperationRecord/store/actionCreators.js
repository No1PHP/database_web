import axios from 'axios';
import * as constants from './constants';

const changePage = (pageNo, size) => ({
	type: constants.GET_RECORDS,
	pageNo,
	size
});



export const getOperationRecords = (pageNo,size) => {
	return (dispatch) => {
		axios.get('localhost:8000/OperationRecords?'+'pageNo='+pageNo+'&'+'size='+size).then((res) => {
			const result = res.data.data;
			dispatch(changePage(result.pageNo, result.size));
		}).catch((e) => {
			console.log(e.message);
		})
	}
};

