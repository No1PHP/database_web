import axios from 'axios';
import * as constants from './constants';
import {LOG_STATUS} from "../../../common/LOG_STATUS";

const changeLogin = (account) => ({
	type: constants.CHANGE_LOGIN,
	value: true,
	account: account
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const login = (account, password) => {
	return (dispatch) => {
		const data = {
			account: account,
			password: password
		};
		axios.post('http://localhost:8080/account/loginPage?accountString="{account:\''+account+'\',password:\''+password+'\'}"').then((res) => {
			const result = res.data.status;
			if (result === "login success") {
				alert(result)
				dispatch(changeLogin(account))
			}else {
				alert("登陆失败")
			}
		})
	}
}
