import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input, BackTop} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";
import MaterialDrawer from "./drawer";
import Dialogue from "./Dialogue";
import DayShiftDrawer from "../Staffinfo/DayShiftDrawer";
import {NavItem} from "../../common/header/style";


class Staff extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNo:'1',
			size:'10',
			totalCount:'10'
		};
	}
/*
{staffID:'',staffName:'',
	* staffCategoryTypes:'',timeStartWorking:'DATETIME',
	* timeEndWorking:'DATETIME',
	* operationName:''}
	*/
	handleDataFromDrawer(data){
		const dataList = {
			staffID : data.staffID,
			staffName: data.staffName,
			staffCategoryTypes: data.staffCategoryTypes,
			timeStartWorking: data.timeStartWorking,
			timeEndWorking: data.timeEndWorking,
			operationName : 'AddStaff'
		};
		this.addNewStaff(dataList).catch((e)=>{
			console.log(e)
		});

	}


	handleDataFromDialogue(data){
		const dataList = {
			staffID : data.staffID,
			staffName: data.staffName,
			staffCategoryTypes: data.staffCategoryTypes,
			timeStartWorking: data.timeStartWorking,
			timeEndWorking: data.timeEndWorking,
			operationName : 'ModifyStaff'
		};
		this.updateData(dataList).catch((e)=>{
			console.log(e)
		});
	}

	handleDataFromDayShiftDrawer(data){
		const dataList = {
			operationType: "DAY_SHIFT",
			body: {
				staffID : data.staffID,
				startTime: data.startTime,
				endTime: data.endTime
			}
		};
		this.scheduleStaff(dataList).catch((e)=>{
			console.log(e)
		});
	}


	getStaff = (pageNo,size) => {
		(
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'Staff').then((res) => {
				const result = res.data.result;
				this.setState(
					{
						list : result,
						totalCount:res.data.totalCount
					}
				)
			}).catch((e) => {
				console.log(e)
			})
		)
	};

	deleteData = (staffID) => {
		return (
			axios.get('http://localhost:8080/delete?'+'id='+staffID+'&'+'name=Staff').then((res) => {
				this.getStaff(this.state.pageNo, this.state.size);
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	updateData = (dataList) => {//传本项的datalist
		return (
			axios.post('http://localhost:8080/Staff/operate?staffRequestString='+JSON.stringify(dataList)).then((res) => {
				this.getStaff(this.state.pageNo, this.state.size);
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)

	}

	addNewStaff = (dataList) => {
		return (
			axios.post('http://localhost:8080/Staff/operate?staffRequestString='+JSON.stringify(dataList)).then((res) => {
				this.getStaff(this.state.pageNo, this.state.size);
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	scheduleStaff = (dataList) => {
		return (
			axios.post('http://localhost:8080/operate/do?operationRequestString='+JSON.stringify(dataList)).then((res) => {
				const result = res.status;
				alert((result===200)?'succeed':'Day Shift modify failed');
			}).catch((e) => {
				console.log(e)
			})
		)
	}

	renderColumn = [
		{
			title: 'StaffID',
			dataIndex: 'staffID',
			key: 'staffID',
		},
		{
			title: 'StaffName',
			dataIndex: 'staffName',
			key: 'staffName',
		},
		{
			title: 'StaffCategoryTypes',
			dataIndex: 'staffCategoryTypes',
			key: 'staffCategoryTypes',
		},
		{
			title : 'TimeStartWorking',
			dataIndex : 'timeStartWorking',
			key: 'timeStartWorking',
		},
		{
			title : 'TimeEndWorking',
			dataIndex : 'timeEndWorking',
			key : 'timeEndWorking',
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					{/*update dialogue*/}
					<DayShiftDrawer parent={this} record={record}/>
					<Dialogue parent={this} record={record}/>
					<a className="delete-data" onClick={(e)=>this.deleteData(record.staffID)}>Delete</a>
				</Space>
			),
		},
	];


	toSelectedPage(selectedPage,pageSize) {
		this.setState(
			{
				pageNo: selectedPage,
				pageSize: pageSize
			}
		);
		this.getStaff(selectedPage,pageSize);
	}


	render() {
		const isLogin = localStorage.getItem("loginNow")==="login";
		const paginationProps={
			size:"small" ,
			total: this.state.totalCount,
			showSizeChanger :true,
			pageSizeOptions:['10', '20', '50', '100','200'],
			showTotal: (pageSize)=> {
				return 'total: ' + pageSize + ' items';
			},
			onChange:(current,pageSize)=> {  //改变页数
				this.toSelectedPage(current,pageSize)
			},
			onShowSizeChange: (current, pageSize) =>{  //改变尺寸
				this.toSelectedPage(current, pageSize);
			},
		}
		const style = {
			border:'right',
			backgroundColor: '#1088e9',
			color: '#fff',
			textAlign: 'center',
			fontSize: 14,
		};

		return (
			(isLogin)?
			<DetailWrapper>
				<Header>Staff</Header>
				<Content>
					<MaterialDrawer parent={this}/>

					<Table size="middle"
						   columns={this.renderColumn}
						   dataSource={this.state.list}
						   current={this.state.pageNo}
						   pagination={paginationProps}
					/>
					<BackTop>
						<div style={style}>UP TO TOP</div>
					</BackTop>
				</Content>
			</DetailWrapper>:
				<Redirect to='/Login'>
					<NavItem className='right'>login</NavItem>
				</Redirect>
		)
	}

	componentDidMount() {
		const {accountName} = this.props;
		this.getStaff(this.state.pageNo, this.state.size);
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDialogue = this.handleDataFromDialogue.bind(this);
		this.handleDataFromDayShiftDrawer = this.handleDataFromDayShiftDrawer.bind(this);
	}
}



const mapState = (state) => ({
	//list : state.getIn(['staff','list']),
	pageNo : state.getIn(['staff','pageNo']),
	size : state.getIn(['staff','size']),
	loginStatus: state.getIn(['login', 'login']),
	accountName : state.getIn(['login', 'account'])
});

const mapDispatch = (dispatch) => ({
	getMaterials(pageNo,size) {
		dispatch(actionCreators.getStaff(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(Staff));

