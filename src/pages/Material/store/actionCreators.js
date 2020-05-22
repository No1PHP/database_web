import axios from 'axios';
import * as constants from './constants';

const changePage = (pageNo, size) => ({
	type: constants.GET_MATERIAL,
	pageNo,
	size
});



export const getMaterials = (pageNo,size) => {
	return (dispatch) => {
		axios.get('localhost:8000/Material'+'pageNo='+pageNo+'&'+'size='+size).then((res) => {
			const result = res.data.data;
			dispatch(changePage(result.pageNo, result.size));
		}).catch(() => {

		})
	}
};

