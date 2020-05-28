import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";
import OperationDrawer from "./drawer";
import Dialogue from "./Dialogue";


class Material extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [
				{
					operationID:'',
					staffID:'',
					operationType:'',
					note:'',
					operationTime:'',
				},
				{
					operationID:'',
					staffID:'',
					operationType:'',
					note:'',
					operationTime:'',
				},
				{
					operationID:'',
					staffID:'',
					operationType:'',
					note:'',
					operationTime:'',
				},
				{
					operationID:'',
					staffID:'',
					operationType:'',
					note:'',
					operationTime:'',
				},
				{
					operationID:'',
					staffID:'',
					operationType:'',
					note:'',
					operationTime:'',
				},
				{
					operationID:'',
					staffID:'',
					operationType:'',
					note:'',
					operationTime:'',
				},
				{
					operationID:'',
					staffID:'',
					operationType:'',
					note:'',
					operationTime:'',
				},
			],
			pageNo:'1',
			size:'10',
		};
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDialogue = this.handleDataFromDrawer.bind(this);
	}


	handleDataFromDrawer(data){
		const dataList = {
			OperationData : data,
			operation : 'Add'
		};
		this.addNewOperation(dataList).catch((e)=>{
			console.log(e)
		});

	}


	handleDataFromDialogue(data){
		const dataList = {
			OperationData : data,
			operation : 'Update'
		};
		this.updateData(dataList).catch((e)=>{
			console.log(e)
		});
	}


	getOperation = (pageNo,size,account) => {
		return () => {
			axios.get('localhost:8000/Operation'+'pageNo='+pageNo+'&'+'size='+size+'&'+'account='+account).then((res) => {
				const result = res.data.data;
				this.setState(
					{list : result}
				)
			}).catch((e) => {
				console.log(e)
			})
		}
	};


	//删除 传入食材名字
	deleteData = (name) => {
		return (
			axios.get('localhost:8000/Operation/delete/'+'name='+name).then((res) => {
					const result = res.status;
					console.log((result===400)?'item successfully changed':'change failed')
				}
			)
		)
	}




	updateData = (dataList) => {//传本项的datalist
		return (
			axios.post('localhost:8000/Operation/update',dataList).then((res) => {
					const result = res.status;
					console.log((result===400)?'item successfully changed':'change failed')
				}
			)
		)

	}


	addNewOperation = (dataList) => {
		return (
			axios.post('localhost:8000/Operation/add',dataList).then((res) => {
					const result = res.status;
					console.log((result===400)?'Item successfully added':'Added failed')
				}
			)
		)
	}



	renderColumn = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'UnitPrice',
			dataIndex: 'unitPrice',
			key: 'unitPrice',
		},
		{
			title : 'AvailableAmount',
			dataIndex : 'availableAmount',
			key: 'availableAmount',
		},
		{
			title : 'AvailablePeriod',
			dataIndex : 'availablePeriod',
			key : 'availablePeriod',
		},
		{
			title: 'MaterialOrders',
			dataIndex: 'materialOrders',
			key : 'materialOrders',
		},
		{
			title: 'Recipes',
			dataIndex: 'recipes',
			key : 'recipes',
		},
		{
			title: 'MaterialUsages',
			dataIndex: 'materialUsages',
			key : 'materialUsages',
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					{/*update dialogue*/}
					<Dialogue />
					<a className="delete-data" onClick={this.deleteData(record.name)}>Delete</a>
				</Space>
			),
		},
	];



	render() {

		return (
			<DetailWrapper>
				<Header>Materials</Header>
				<Content>
					<OperationDrawer />

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
		this.getMaterials(pageNo, size, accountName);
	}
}



const mapState = (state) => ({
	list : state.getIn(['material','list']),
	pageNo : state.getIn(['material','pageNo']),
	size : state.getIn(['material','size']),
	loginStatus: state.getIn(['login', 'login']),
	accountName : state.getIn(['login', 'account'])
});

const mapDispatch = (dispatch) => ({
	getMaterials(pageNo,size) {
		dispatch(actionCreators.getOperationRecords(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(Material));

