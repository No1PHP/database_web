import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, ButtonWrapper, ButtonWrapper2 } from './style';
import { actionCreators } from './store';
import axios from "axios";


class Login extends Component {

	constructor(props) {
		super(props);
		this.state={
			account:'',
			loginStatus:false,
		}
	}

	getAccountInfo = () =>{
		return (
			axios.get('http://localhost:8080/account/info').then((res) => {
					const user = res.data.username;
					const login = res.data.login;
					this.setState({
						account:user,
						loginStatus:login
					})
				}
			).catch((e)=>{
				console.log(e)
			})
		)
	}

	render() {
		if (!(this.state.loginStatus)) {

			return (
				<LoginWrapper>
					<LoginBox>
						<Input placeholder='Account' innerRef={(input) => {this.account = input}}/>
						<Input placeholder='Password' type='password' innerRef={(input) => {this.password = input}}/>

						<ButtonWrapper onClick={() => this.props.login(this.account, this.password)}>LOGIN</ButtonWrapper>
						<ButtonWrapper2><a href = {"/passwordChanging"}>ChangePassword</a></ButtonWrapper2>

					</LoginBox>
				</LoginWrapper>
			)
		}else {
			return <Redirect to='/'/>
		}
	}
	componentDidMount() {
		//this.getAccountInfo().then();
	}
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login']),
	account : state.getIn(['login', 'account'])
})

const mapDispatch = (dispatch) => ({
	login(accountElem, passwordElem){
		dispatch(actionCreators.login(accountElem.value, passwordElem.value))
	}
})

export default connect(mapState, mapDispatch)(Login);
