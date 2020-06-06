import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input, BackTop} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";


class ScheduleRecord extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNo:'1',
			size:'10',
			totalCount:'10'
		};

	}

	getScheduleRecord = (pageNo,size) => {
		(
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'ScheduleRecord').then((res) => {
				const result = res.data.result;
				this.setState(
					{
						list : result,
						totalCount:res.data.totalCount
					}
				)
			}).catch((e) => {
				console.log(e)
			}))

	};

	//删除
	deleteData = (name) => {
		return (
			axios.get('http://localhost:8080/delete/?id='+name+'&'+'name=ScheduleRecord').then((res) => {
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
			title : 'TimeStartWorking',
			dataIndex : 'timeScheduledToStartWorking',
			key: 'timeScheduledToStartWorking',
		},
		{
			title : 'TimeEndWorking',
			dataIndex : 'timeScheduledToEndWorking',
			key : 'timeScheduledToEndWorking',
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
	toSelectedPage(selectedPage,pageSize) {
		this.setState(
			{
				pageNo: selectedPage,
				pageSize: pageSize
			}
		);
		this.getScheduleRecord(selectedPage,pageSize);
	}


	render() {
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
			<DetailWrapper>
				<Header>ScheduleRecord</Header>
				<Content>
{/*					<h3> </h3>
					<div><PullDrawer parent={this}/></div>*/}
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
			</DetailWrapper>
		)
	}

	componentDidMount() {
		const {accountName} = this.props;
		const {pageNo} = this.props;
		const {size} = this.props;
		this.getScheduleRecord(this.state.pageNo, this.state.size);;
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
		dispatch(actionCreators.getScheduleRecords(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(ScheduleRecord));

