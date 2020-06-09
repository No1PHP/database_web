import axios from 'axios';
import * as constants from './constants';
import {fromJS} from "immutable";

const changePage = (result) => ({
	type: constants.GET_MATERIAL,
	list: fromJS(result)

});



export const getMaterials = (pageNo,size) => {
	return (dispatch) => {
		//axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page=Material').then((res) => {
		axios.get('/api/detail.json?page='+pageNo+'&'+'size='+size).then((res) => {
		    const result = res.data.data.list;
			console.log(res.data.data.list);
			dispatch(changePage(result));
		}).catch((e) => {
			console.log(e.message)
		})
	}
};

