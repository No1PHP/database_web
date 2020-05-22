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

class Header extends Component {

	menu = (
		<Menu>
			<Menu.Item>
				<a rel="noopener noreferrer" href='./Material'>
					Material
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="http://www.taobao.com/">
					Account
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="http://www.tmall.com/">
					MaterialOrder
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="http://www.tmall.com/">
					MaterialUsage
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="http://www.tmall.com/">
					OperationRecord
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="http://www.tmall.com/">
					Recipe
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="http://www.tmall.com/">
					ScheduledRecord
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="http://www.tmall.com/">
					Staff
				</a>
			</Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="http://www.tmall.com/">
                    Stall
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="http://www.tmall.com/">
                    TransactionRecord
                </a>
            </Menu.Item>
		</Menu>
	);


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
						Tables <DownOutlined />
					</a>
				</Dropdown>
				</MenuWrapper>
				<Nav>

					{
						login ?
							<div>
								<UsernameWrapper><h3>{accountName}</h3></UsernameWrapper>
								<NavItem onClick={logout} className='right'>logout</NavItem>
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
