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
import PullDrawer from "./PullDrawer";
import OrderDrawer from "./store/OrderDrawer";
import DayShiftDrawer from "./DayShiftDrawer";
import StallChangeDrawer from "./StallChangeDrawer";


class OperationRecord extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [
				{
					operationID:'1',
					staffID:'15',
					operationType:'pull',
					note:'egg in store',
					operationTime:'2019-6-1',
				},
				{
					operationID:'2',
					staffID:'17',
					operationType:'order',
					note:'egg to be consumed',
					operationTime:'2020-7-1',
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


	handleDataFromDialogue(data){   //from OperationDrawer for Add
		const dataList = {
			OperationData : data,
			operation : 'Update'
		};
		this.updateData(dataList).catch((e)=>{
			console.log(e)
		});
	}

	handleDataFromPullDrawer(data){
		axios.post('http://localhost:8080/operate/do',data).then((res) => {
			const result = res.data.status;
			alert((result===200)?'succeed':'pull operation failed');
		}).catch((e) => {
			console.log(e)
		})

	}

	handleDataFromOrderDrawer(data){
		axios.post('http://localhost:8080/operate/do',data).then((res) => {
			const result = res.data.status;
			alert((result===200)?'succeed':'order added failed');
		}).catch((e) => {
			console.log(e)
		})

	}


	handleDataFromDayShiftDrawer(data){
		axios.post('http://localhost:8080/operate/do',data).then((res) => {
			const result = res.data.status;
			alert((result===200)?'succeed':'Day Shift modify failed');
		}).catch((e) => {
			console.log(e)
		})

	}

	handleDataFromStallChangeDrawer(data){
		axios.post('http://localhost:8080/operate/do',data).then((res) => {
			const result = res.data.status;
			alert((result===200)?'succeed':'Stall Change failed');
		}).catch((e) => {
			console.log(e)
		})

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
					const result = res.status;
					alert((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}




	updateData = (dataList) => {
		//TODO:修改的url请求地址
		return (
			axios.post('http://localhost:8080/operate/update',dataList).then((res) => {
					const result = res.status;
					console.log((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)

	}

//TODO
	addNewOperation = (dataList) => {
		return (
			axios.post('localhost:8080/operate/do',dataList).then((res) => {
					const result = res.status;
					console.log((result===200)?'Item successfully added':'Added failed')
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
					{/*update dialogue*/}
					<Dialogue parent={this}/>
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
					<h3> </h3>
					<div><OperationDrawer parent={this}/></div>
					<h3> </h3>
					<div><PullDrawer parent={this}/></div>
					<h3> </h3>
					<div><OrderDrawer parent={this}/></div>
					<h3> </h3>
					<div><DayShiftDrawer parent={[this]}/></div>
					<h3> </h3>
					<div><StallChangeDrawer parent={this}/></div>
					<Table size="middle"
						   key={this.state.list.index}
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
		this.getOperation(this.state.pageNo, this.state.size);
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDialogue = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDayShiftDrawer = this.handleDataFromDayShiftDrawer.bind(this);
		this.handleDataFromOrderDrawer = this.handleDataFromOrderDrawer.bind(this);
		this.handleDataFromPullDrawer = this.handleDataFromPullDrawer.bind(this);
		this.handleDataFromStallChangeDrawer = this.handleDataFromStallChangeDrawer.bind(this);

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

