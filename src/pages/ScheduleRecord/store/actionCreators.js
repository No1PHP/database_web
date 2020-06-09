import axios from 'axios';
import * as constants from './constants';

const changePage = (pageNo, size) => ({
	type: constants.GET_RECORDS,
	pageNo,
	size
});



export const getScheduleRecords = (pageNo,size) => {
	return (dispatch) => {
		axios.get('localhost:8000/ScheduleRecord?'+'pageNo='+pageNo+'&'+'size='+size).then((res) => {
			const result = res.data.data;
			dispatch(changePage(result.pageNo, result.size));
		}).catch((e) => {
			console.log(e.message);
		})
	}
};

