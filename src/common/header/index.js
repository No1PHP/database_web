import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import {
	HeaderWrapper,
	Logo, MenuWrapper,
	Nav,
	NavItem, UsernameWrapper,
} from './style';
import {Button, Select, Menu, Dropdown} from "antd";
import { DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from "axios"
import { UserOutlined, AuditOutlined } from '@ant-design/icons';
import {logout} from "../../pages/login/store/actionCreators";


class Header extends Component {


	constructor(props) {
		super(props);
		this.state={
			account:'',
			loginStatus:false,
		}
	}


	menu = (
		<Menu>
			<Menu.Item>
				<a rel="noopener noreferrer" href='/Material'>
					Material
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="/OperationRecord">
					OperationRecord
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="/Recipe">
					Recipe
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="/Staff">
					Staff
				</a>
			</Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="/Stall">
                    Stall
                </a>
            </Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="./Transaction">
					TransactionRecord
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="./ScheduleRecord">
					ScheduleRecord
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="./MaterialOrder">
					MaterialOrder
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="./MaterialUsage">
					MaterialUsage
				</a>
			</Menu.Item>
		</Menu>
	);

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

	quit = () =>{
		axios.get('http://localhost:8080/LoginPage/logStage='+'logout').then((res)=>{
			if(res.status===200) console.log("already logout")
			}
		).catch(e=>console.log(e.message))
	}

	render() {

		return (
			<HeaderWrapper>
				<Link to='/Login'>
					<Logo/>
				</Link>
				<MenuWrapper>
				<Dropdown size={'middle'} align={'Align'} overlay={this.menu}>
					<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
						Data  <AuditOutlined height={'15px'} width={'15px'}/> <DownOutlined />
					</a>
				</Dropdown>
				</MenuWrapper>
				<Nav>

					{
						this.state.loginStatus ?
							<div>
								<UsernameWrapper><h3><Avatar shape="square" icon={<UserOutlined />} />
									{this.state.account}</h3></UsernameWrapper>
								<NavItem onClick={(e)=>{
									logout();
									this.quit();
								}} className='right'>logout</NavItem>
							</div> :
							<Link to='/login'><NavItem className='right'>login</NavItem></Link>
					}

				</Nav>

			</HeaderWrapper>
		);
	}

	componentDidMount() {
		this.getAccountInfo().then();
	}
}

const mapStateToProps = (state) => {
	return {
		focused: state.getIn(['header', 'focused']),
		login: state.getIn(['login', 'login']),
		accountName : state.getIn(['login', 'account'])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleMouseEnter() {
			dispatch(actionCreators.mouseEnter());
		},
		handleMouseLeave() {
			dispatch(actionCreators.mouseLeave());
		},
		logout() {
			dispatch(loginActionCreators.logout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
