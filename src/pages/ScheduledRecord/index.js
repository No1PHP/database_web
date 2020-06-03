import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";
import MaterialDrawer from "./drawer";
import Dialogue from "./Dialogue";


class Transaction extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [
				{
					transactionID:'',
					stallName:'',
					recipeName:'',
					transactionTime:'',
					numbers:'',
					transactionPrice:'',
					operation:''
				},
				{
					transactionID:'',
					stallName:'',
					recipeName:'',
					transactionTime:'',
					numbers:'',
					transactionPrice:'',
					operation:''
				},
				{
					transactionID:'',
					stallName:'',
					recipeName:'',
					transactionTime:'',
					numbers:'',
					transactionPrice:'',
					operation:''
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
			materialData : data,
			operation : 'Add'
		};
		this.addNewTransaction(dataList).catch((e)=>{
			console.log(e)
		});

	}


	handleDataFromDialogue(data){
		const dataList = {
			materialData : data,
			operation : 'Update'
		};
		this.updateData(dataList).catch((e)=>{
			console.log(e)
		});
	}


	getTransaction = (pageNo, size) => {
		return () => {
			axios.get('localhost:8000/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'Transaction').then((res) => {
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
			axios.get('localhost:8000/Material/delete/'+'name='+name).then((res) => {
					const result = res.status;
					console.log((result===400)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}




	updateData = (dataList) => {//传本项的datalist
		return (
			axios.post('localhost:8000/Material/update',dataList).then((res) => {
					const result = res.status;
					console.log((result===400)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)

	}


	addNewTransaction = (dataList) => {
		return (
			axios.post('localhost:8000/Material/add',dataList).then((res) => {
					const result = res.status;
					console.log((result===400)?'Item successfully added':'Added failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}



	renderColumn = [
		{
			title: 'TransactionID',
			dataIndex: 'transactionID',
			key: 'transactionID',
			sorter: (a, b) => a.transactionID - b.transactionID,
		},
		{
			title: 'StallName',
			dataIndex: 'stallName',
			key: 'stallName',
		},
		{
			title: 'RecipeName',
			dataIndex: 'recipeName',
			key: 'recipeName',
		},
		{
			title : 'TransactionTime',
			dataIndex : 'transactionTime',
			key: 'transactionTime',
		},
		{
			title : 'Numbers',
			dataIndex : 'numbers',
			key : 'numbers',
			sorter: (a, b) => a.availablePeriod - b.availablePeriod,
		},
		{
			title: 'TransactionPrice',
			dataIndex: 'transactionPrice',
			key : 'transactionPrice',
			sorter: (a, b) => a.availablePeriod - b.availablePeriod,
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					{/*update dialogue*/}
					<Dialogue />
					<a className="delete-data" onClick={(e)=>this.deleteData(record.name)}>Delete</a>
				</Space>
			),
		},
	];



	render() {

		return (
			<DetailWrapper>
				<Header>Transaction</Header>
				<Content>
					<MaterialDrawer/>

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
		this.getTransaction(this.state.pageNo, this.state.size);
	}
}



const mapState = (state) => ({
	//list : state.getIn(['staff','list']),
	pageNo : state.getIn(['transaction','pageNo']),
	size : state.getIn(['transaction','size']),
	loginStatus: state.getIn(['login', 'login']),
	accountName : state.getIn(['login', 'account'])
});

const mapDispatch = (dispatch) => ({
	getMaterials(pageNo,size) {
		dispatch(actionCreators.getTransaction(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(Transaction));

