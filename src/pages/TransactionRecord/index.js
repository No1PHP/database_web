import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input, BackTop} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";
import MaterialDrawer from "./drawer";
import {NavItem} from "../../common/header/style";


class Transaction extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNo:'1',
			size:'10',
			totalCount:'10'
		};
	}


	handleDataFromDrawer(data){
		const dataList = {
			stallName: data.stallName,
			recipeName: data.recipeName,
			numbers: data.numbers,
			transactionPrice: data.transactionPrice,
			operationName : 'Add'
		};
		this.addNewTransaction(dataList).catch((e)=>{
			console.log(e)
		});

	}

	getTransaction = (pageNo, size) => {
		(
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page=Transaction').then((res) => {
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


	//删除 传入食材名字
	deleteData = (id) => {
		return (
			axios.get('http://localhost:8080/delete?id='+id+'&name=Transaction').then((res) => {
				this.getTransaction(this.state.pageNo, this.state.size);
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	addNewTransaction = (dataList) => {
		return (
			axios.post('http://localhost:8080/Transaction/add?transactionRequest='+JSON.stringify(dataList)).then((res) => {
				this.getTransaction(this.state.pageNo, this.state.size);
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
					<a className="delete-data" onClick={(e)=>this.deleteData(record.transactionID)}>Delete</a>
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
		this.getTransaction(selectedPage,pageSize);
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
				<Header>Transaction</Header>
				<Content>
					<MaterialDrawer parent={this}/>

					<Table size="middle"
						   columns={this.renderColumn}
						   dataSource={this.state.list}
						   current={this.state.pageNo}
						   pagination={paginationProps}

					/>
					<BackTop>
						<div style={style}> UP </div>
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
		this.getTransaction(this.state.pageNo, this.state.size);
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
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

