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
import Redirect from "react-router/Redirect";


class Header extends Component {


	constructor(props) {
		super(props);
		this.state={
			account:'',
			loginStatus:false,
		}
	}


	tick(){
		const isLogin = localStorage.getItem("loginNow")==="login";
		const username = localStorage.getItem("account");
		this.setState({
			account: username,
			loginStatus: isLogin,
		})
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
		axios.get('http://localhost:8080/account/LoginPage/logout').then((res)=>{
			if(res.status===200) {
				console.log("already logout");
				localStorage.setItem("loginNow","logout");
				localStorage.setItem("account","");
				this.setState(
					{
						account:'',
						loginStatus:false,
					}
				)
			}
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
						localStorage.getItem("loginNow")==="login" ?
							<div>
								<UsernameWrapper><h3><Avatar shape="square" icon={<UserOutlined />} />
									{this.state.account}</h3></UsernameWrapper>
								<NavItem onClick={(e)=>{
									logout();
									this.quit();
								}} className='right'>logout</NavItem>
							</div> :
							<a href='/Login'><NavItem className='right'>login</NavItem></a>
					}

				</Nav>

			</HeaderWrapper>
		);
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			800
		);
		//this.getAccountInfo();
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}
}


export default (Header);
