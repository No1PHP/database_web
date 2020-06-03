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
import OperationRecord from "../../pages/OperationRecord";
import { Avatar } from 'antd';
import axios from "axios"
import { UserOutlined, AuditOutlined } from '@ant-design/icons';


class Header extends Component {

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
		</Menu>
	);


	quit = () =>{
		axios.get('http://localhost:8080/LoginPage/logStage='+'logout').then((res)=>{
			if(res.status===200) console.log("already logout")
			}
		).catch(e=>console.log(e.message))
	}

	render() {
		const { login, logout } = this.props;
		const { accountName } = this.props;
		return (
			<HeaderWrapper>
				<Link to='/'>
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
						login ?
							<div>
								<UsernameWrapper><h3><Avatar shape="square" icon={<UserOutlined />} />
									{accountName}</h3></UsernameWrapper>
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
