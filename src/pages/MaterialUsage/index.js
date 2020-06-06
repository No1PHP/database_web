import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";


class MaterialUsage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNo:'1',
			size:'10',
		};
	}

	getMaterialUsage = (pageNo, size) => {
		(
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page=MaterialUsage').then((res) => {
				const result = res.data.result;
				this.setState(
					{list : result}
				)
			}).catch((e) => {
				console.log(e)
			})
		)
	};


	deleteData = (id) => {
		return (
			axios.get('http://localhost:8080/delete?id='+id+'&name=MaterialUsage').then((res) => {
				this.getMaterialUsage(this.state.pageNo, this.state.size);
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	renderColumn = [
		{
			title: 'UsageId',
			dataIndex: 'usageId',
			key: 'usageId',
			sorter: (a, b) => a.usageId - b.usageId,
		},
		{
			title: 'StallName',
			dataIndex: 'stallName',
			key: 'stallName',
		},
		{
			title: 'MaterialName',
			dataIndex: 'materialName',
			key: 'materialName',
		},
		{
			title : 'StorageID',
			dataIndex : 'storageID',
			key: 'storageID',
		},
		{
			title : 'Time',
			dataIndex : 'time',
			key : 'time',
			sorter: (a, b) => a.availablePeriod - b.availablePeriod,
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key : 'amount',
			sorter: (a, b) => a.availablePeriod - b.availablePeriod,
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					<a className="delete-data" onClick={(e)=>this.deleteData(record.usageId)}>Delete</a>
				</Space>
			),
		},
	];

	render() {

		return (
			<DetailWrapper>
				<Header>MaterialUsages</Header>
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
		this.getMaterialUsage(this.state.pageNo, this.state.size);
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
		dispatch(actionCreators.getMaterialUsage(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(MaterialUsage));

