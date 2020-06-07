import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input, BackTop, Alert} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";
import MaterialDrawer from "./drawer";
import Dialogue from "./Dialogue";
import Link from "react-router-dom/Link";
import OrderDrawer from "../Material/OrderDrawer";
import UsageDrawer from "../Material/UsageDrawer";
import {NavItem} from "../../common/header/style";


class Material extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNo:'1',
			size:'10',
			totalCount:'10',
			account:'',
			loginStatus:''
		};
	}
	getAccountInfo = () =>{
		return (
			axios.get('http://localhost:8080/account/info').then((res) => {
					const user = res.data.username;
					const login = res.data.login;
					this.setState({
						account:user,
						loginStatus:login
					})
				}
			).catch((e)=>{
				console.log(e)
			})
		)
	}

    handleDataFromDrawer(data){
		const dataList = {
			materialName : data.name,
			materialType: data.type,
			unitPrice: data.unitPrice,
			availablePeriod: data.availablePeriod,
			operationName : 'Add'
		};
		this.addNewMaterial(dataList).catch((e)=>{
			console.log(e)
		});
	}

//{materialName:'',materialType:'',unitPrice:'Float',availablePeriod:'',operationName:''}
	handleDataFromDialogue(data){
		const dataList = {
			materialName : data.name,
			materialType: data.type,
			unitPrice: data.unitPrice,
			availablePeriod: data.availablePeriod,
			operationName : 'Modify'
		};
		this.updateData(dataList).catch((e)=>{
			console.log(e)
		});
	}

	handleDataFromOrderDrawer(data) {
		const dataList = {
			operationType: "ORDER",
			body: {
				materialName : data.materialName,
				amount: data.amount
			}
		};
		this.makeOrder(dataList).catch((e)=>{
			console.log(e)
		});
	}

	handleDataFromUsageDrawer(data) {
		const dataList = {
			materialName: data.materialName,
			stallName: data.stallName,
			amount: data.amount
		};
		this.allocateTo(dataList).catch((e)=>{
			console.log(e)
		});
	}

	getMaterials = (pageNo,size) => {
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'Material').then((res) => {
			//axios.get('/api/detail.json?page='+pageNo+'&'+'size='+size).then((res) => {
				const result = res.data.result;
				this.setState(
					{
						list : result,
						totalCount: res.data.totalCount
					}
				)
			}).catch((e) => {
			})
	};

	//删除 传入食材名字
	deleteData (name) {
		return (
			axios.get('http://localhost:8080/delete?id='+name+'&'+'name='+'Material').then((res) => {
					this.getMaterials(this.state.pageNo, this.state.size);
				}
			).catch((e) => {
				console.log(e)
			})
		)
	}

	updateData = (dataList) => {//传本项的datalist
		return (
			axios.post('http://localhost:8080/Material/operate?materialRequest='+JSON.stringify(dataList)).then((res) => {
					this.getMaterials(this.state.pageNo, this.state.size);
				}
			).catch((e)=>{
				console.log(e)
			})
		)
	}

	addNewMaterial = (dataList) => {
		return (
			axios.post('http://localhost:8080/Material/operate?materialRequest='+JSON.stringify(dataList)).then((res) => {
					this.getMaterials(this.state.pageNo, this.state.size);
				}
			).catch((e)=>{
				console.log(e)
				}
			)
		)
	}

	makeOrder = (dataList) => {
		return (
			axios.post('http://localhost:8080/operate/do?operationRequestString='+JSON.stringify(dataList)).then((res) => {
					const result = res.status;
					console.log((result===200)?'Item successfully added':'Added failed')
				}
			).catch((e)=>{
					console.log(e)
				}
			)
		)
	}

	allocateTo = (dataList) => {
		return (
			axios.post('http://localhost:8080/Material/allocate?allocateRequest='+JSON.stringify(dataList)).then((res) => {
					this.getMaterials(this.state.pageNo, this.state.size);
				}
			).catch((e)=>{
					console.log(e)
				}
			)
		)
	}



	//下：table翻页相关 function

	toSelectedPage(selectedPage,pageSize) {
		this.setState(
			{
				pageNo: selectedPage,
				pageSize: pageSize
			}
		);
		this.getMaterials(selectedPage,pageSize);
	}


	renderColumn = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				//sorter: true
				sorter: (a, b) => a.name.length - b.name.length
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
				sorter: (a, b) => a.unitPrice - b.unitPrice,
				//sorter: true
			},
		   {
			   title : 'AvailableAmount',
			   dataIndex : 'availableAmount',
			   key: 'availableAmount',
			   sorter: (a, b) => a.availableAmount - b.availableAmount,
		   },
		   {
			   title : 'AvailablePeriod',
			   dataIndex : 'availablePeriod',
			   key : 'availablePeriod',

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
					<Dialogue parent={this} record={record}/>
					<OrderDrawer parent={this} record={record}/>
					<UsageDrawer parent={this} record={record}/>
        　　     <a className="delete-data" onClick={(e)=>this.deleteData(record.name)}>Delete</a>
                </Space>
				),
			},
		];



	render() {

		const isLogin = localStorage.getItem("loginNow")==="login";
		const style = {
			border:'right',
			backgroundColor: '#1088e9',
			color: '#fff',
			textAlign: 'center',
			fontSize: 14,
		};

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


		return (
			(isLogin)?
			<DetailWrapper>
				<Header>Materials</Header>
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
		this.getAccountInfo().then();

		this.getMaterials(this.state.pageNo, this.state.size);
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDialogue = this.handleDataFromDialogue.bind(this);
		this.handleDataFromOrderDrawer = this.handleDataFromOrderDrawer.bind(this);
		this.handleDataFromUsageDrawer = this.handleDataFromUsageDrawer.bind(this);
	}
}



const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login']),
	accountName : state.getIn(['login', 'account'])
});


export default connect(mapState, null)(withRouter(Material));
