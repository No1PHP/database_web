import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, ButtonWrapper, ButtonWrapper2 } from './style';
import { actionCreators } from './store';
class Login extends PureComponent {
	render() {
		const { loginStatus } = this.props;
		const { account } = this.props;
		if (!loginStatus) {
			console.log(loginStatus);
			console.log(account);
			return (
				<LoginWrapper>
					<LoginBox>
						<Input placeholder='Account' innerRef={(input) => {this.account = input}}/>
						<Input placeholder='Password' type='password' innerRef={(input) => {this.password = input}}/>

						<ButtonWrapper onClick={() => this.props.login(this.account, this.password)}>LOGIN</ButtonWrapper>
						<ButtonWrapper2><a href = {"./passwordChanging"}>ChangePassword</a></ButtonWrapper2>

					</LoginBox>
				</LoginWrapper>
			)
		}else {
			return <Redirect to='/Material'/>
		}
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
