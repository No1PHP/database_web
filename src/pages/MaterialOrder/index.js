import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input, BackTop} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";
import {NavItem} from "../../common/header/style";


class MaterialOrder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNo:'1',
			size:'10',
			totalCount:'10',
		};
	}



	getMaterialOrder = (pageNo,size) => {
		return (
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'MaterialOrder').then((res) => {
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
			axios.get('http://localhost:8080/delete/?id='+name+'&'+'name=MaterialOrder').then((res) => {
					const result = res.status;
					alert((result===200)?'item successfully changed':'change failed')
				this.getMaterialOrder(this.state.pageNo, this.state.size);;
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
				this.getMaterialOrder(this.state.pageNo, this.state.size);;
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

	toSelectedPage(selectedPage,pageSize) {
		this.setState(
			{
				pageNo: selectedPage,
				pageSize: pageSize
			}
		);
		this.getMaterialOrder(selectedPage, pageSize).then();
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
				<Header>MaterialOrders</Header>
				<Content>
					<Table size="middle"
						   columns={this.renderColumn}
						   dataSource={this.state.list}
						   current={this.state.pageNo}
						   pagination={paginationProps}
					/>
					<BackTop>
						<div style={style}>UP</div>
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
		const {pageNo} = this.props;
		const {size} = this.props;
		this.getMaterialOrder(this.state.pageNo, this.state.size);;
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

