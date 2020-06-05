import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";


class MaterialOrder extends Component {

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
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'MaterialOrder').then((res) => {
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
			axios.get('http://localhost:8080/delete/?id='+name+'&'+'name=MaterialOrder').then((res) => {
					const result = res.status;
					alert((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	confirm = (id) => {
		const dataList = {
			operationType: "PULL",
			body: {
				operationID : id
			}
		};
		return (
			axios.post('http://localhost:8080/operate/do?operationRequestString='+JSON.stringify(dataList)).then((res) => {
					const result = res.status;
					alert((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	renderColumn = [
		{
			title: 'Operation order',
			dataIndex: 'operationOrderID',
			key: 'operationOrderID',
			sorter: (a, b) => a.operationOrderID - b.operationOrderID
		},
		{
			title: 'Operation storage',
			dataIndex: 'operationStorageID',
			key: 'operationStorageID',
		},
		{
			title: 'MaterialName',
			dataIndex: 'materialName',
			key: 'materialName',
		},
		{
			title : 'MaterialAmount',
			dataIndex : 'materialAmount',
			key: 'materialAmount',
		},
		{
			title : 'UsedAmount',
			dataIndex : 'usedAmount',
			key: 'usedAmount',
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					<a className="delete-data" onClick={(e)=>this.confirm(record.operationOrderID)}>confirm</a>
					<a className="delete-data" onClick={(e)=>this.deleteData(record.operationOrderID)}>Delete</a>
				</Space>
			),
		},
	];

	render() {
		return (
			<DetailWrapper>
				<Header>MaterialOrders</Header>
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
		dispatch(actionCreators.getMaterialOrders(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(MaterialOrder));

