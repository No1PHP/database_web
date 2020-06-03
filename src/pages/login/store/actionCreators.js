import axios from 'axios';
import * as constants from './constants';
import {LOG_STATUS} from "../../../common/LOG_STATUS";

const changeLogin = (account) => ({
	type: constants.CHANGE_LOGIN,
	value: true,
	login: true,
	account: account
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false,
	account:''
}
)
/*
export const login = (account, password) => {
	return (dispatch) => {
		const data = {
			account: account,
			password: password
		};
		axios.post('http://localhost:8080/loginPage' ,data).then((res) => {
			if (res.data.status === "login success") {
				dispatch(changeLogin(account));
				console.log('success');
				alert('登录成功')
			}else {
				alert('登陆失败')
			}
		})
	}
}
*/

export const login = (account, password) => {
	const data = {
		"account": account,
		"password": password
	};
	return (dispatch) => {
		//axios.get('api/login.json?account='+account).then((res) => {
		axios.post('http://localhost:8080/account/loginPage',data).then((res) => {
			const result = res.data.data;
			console.log("res:"+JSON.stringify(res));
			console.log("res.data:"+JSON.stringify(res.data));
			if (res.status===200) {
				dispatch(changeLogin(account))
			}else {
				alert('登陆失败')
			}
		}).catch(e=>{
			console.log(e.message)
		})
	}
}
