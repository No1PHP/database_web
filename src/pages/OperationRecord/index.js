import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";


class OperationRecord extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNo:'1',
			size:'10',
		};

	}

	getOperation = (pageNo,size) => {
		return (
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'OperationRecord').then((res) => {
				const result = res.data.result;
				this.setState(
					{list : result}
				)
			}).catch((e) => {
				console.log(e)
			}))

	};

	//删除
	deleteData = (name) => {
		return (
			axios.get('http://localhost:8080/delete/?id='+name+'&'+'name=OperationRecord').then((res) => {
				this.getOperation(this.state.pageNo, this.state.size);;
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	renderColumn = [
		{
			title: 'OperationID',
			dataIndex: 'operationID',
			key: 'operationID',
			sorter: (a, b) => a.operationID - b.operationID
		},
		{
			title: 'StaffID',
			dataIndex: 'staffID',
			key: 'staffID',
		},
		{
			title: 'OperationType',
			dataIndex: 'operationType',
			key: 'operationType',
		},
		{
			title : 'Note',
			dataIndex : 'note',
			key: 'note',
		},
		{
			title : 'OperationTime',
			dataIndex : 'operationTime',
			key : 'operationTime',
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					<a className="delete-data" onClick={(e)=>this.deleteData(record.operationID)}>Delete</a>
				</Space>
			),
		},
	];

	render() {
		return (
			<DetailWrapper>
				<Header>OperationRecords</Header>
				<Content>
					<Table size="middle"
						   columns={this.renderColumn}
						   dataSource={this.state.list}
					/>
				</Content>
			</DetailWrapper>
		)
	}

	componentDidMount() {
		const {accountName} = this.props;
		const {pageNo} = this.props;
		const {size} = this.props;
		this.getOperation(this.state.pageNo, this.state.size);;
	}
}



const mapState = (state) => ({
	//list : state.getIn(['operation','list']),
	pageNo : state.getIn(['operation','pageNo']),
	size : state.getIn(['operation','size']),
	loginStatus: state.getIn(['login', 'login']),
	accountName : state.getIn(['login', 'account'])
});

const mapDispatch = (dispatch) => ({
	getOperationRecords(pageNo,size) {
		dispatch(actionCreators.getOperationRecords(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(OperationRecord));

