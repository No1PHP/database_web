import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input, BackTop} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";
import MaterialDrawer from "./drawer";
import Dialogue from "./Dialogue";
import RecipeDeleteDialogue from "./RecipeDeleteDialogue";
import RecipeAddDialogue from "./RecipeAddDialogue";
import StallChangeDrawer from "../Stall/StallChangeDrawer";


class Stall extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNo:'1',
			size:'10',
			totalCount:'10'
		};
	}

	handleDataFromRecipeDeleteDialogue(data){
		const dataList = {
			stallName : data.stallName,
			recipes:data.recipes,
			operationName: 'removeRecipeForStall'
		}
		this.deleteRecipeForStall(dataList).then();

	}

	handleDataFromRecipeAddDialogue(data){
		const dataList = {
			stallName : data.stallName,
			recipes:data.recipes,
			operationName: 'AddRecipeForStall'
		}
		this.addRecipeForStall(dataList).then();

	}


	handleDataFromDrawer(data){
		const dataList = {
			stallName : data.stallName,
			stallLocation: data.stallLocation,
			stallRent: data.stallRent,
			costLastMonth: data.costLastMonth,
			recipes:data.recipes,
			operationName: 'AddStall'
		};
		this.addNewStall(dataList).catch((e)=>{
			console.log(e)
		});

	}

	handleDataFromDialogue(data){
		const dataList = {
			stallName : data.stallName,
			stallLocation: data.stallLocation,
			stallRent: data.stallRent,
			costLastMonth: data.costLastMonth,
			recipes:data.recipes,
			operationName: 'ModifyStall'
		};
		this.updateData(dataList).catch((e)=>{
			console.log(e)
		});
	}

	handleDataFromStallChangeDrawer(data){
		const dataList = {
			operationType: "STALL_CHANGE",
			body: {
				stallName : data.stallName,
				newLocation: data.newLocation
			}
		};
		this.changeLocation(dataList).catch((e)=>{
			console.log(e)
		});
	}


	getStall = (pageNo, size) => {
		(
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'Stall').then((res) => {
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
	deleteData = (name) => {
		return (
			axios.get('http://localhost:8080/delete?'+'id='+name+'&'+'name=Stall').then((res) => {
					const result = res.status;
					console.log((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	deleteRecipeForStall = (requestJson) =>{
		return(
			axios.post('http://localhost:8080/Stall/oper?staffRequestString='+JSON.stringify(requestJson)).then((res)=>{
					const result = res.status;
					alert((result===200)?'succeed':'delete failed');
				}

			).catch(e=>{
				console.log(e)
			})
		)
	}

	addRecipeForStall = (requestJson) =>{
		return(
			axios.post('http://localhost:8080/Stall/oper?staffRequestString='+JSON.stringify(requestJson)).then((res)=>{
					const result = res.status;
					alert((result===200)?'succeed':'add failed');
				}

			).catch(e=>{
				console.log(e)
			})
		)
	}

	updateData = (dataList) => {//传本项的datalist
		return (
			axios.post('http://localhost:8080/Stall/oper?staffRequestString='+JSON.stringify(dataList)).then((res) => {
					const result = res.status;
					console.log((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e)
			})
		)

	}

	addNewStall = (dataList) => {
		return (
			axios.post('http://localhost:8080/Stall/oper?staffRequestString='+JSON.stringify(dataList)).then((res) => {
					const result = res.status;
					console.log((result===400)?'Item successfully added':'Added failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	changeLocation = (dataList) => {
		return (
			axios.post('http://localhost:8080/operate/do?operationRequestString='+JSON.stringify(dataList)).then((res) => {
					const result = res.status;
					console.log((result===200)?'Item successfully changed':'failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}


	renderColumn = [
		{
			title: 'StallName',
			dataIndex: 'stallName',
			key: 'stallName',
		},
		{
			title: 'StallLocation',
			dataIndex: 'stallLocation',
			key: 'stallLocation',
		},
		{
			title: 'StallRent',
			dataIndex: 'stallRent',
			key: 'stallRent',
			sorter: (a, b) => a.stallRent - b.stallRent
		},
		{
			title : 'CostLastMonth',
			dataIndex : 'costLastMonth',
			key: 'costLastMonth',
			sorter: (a, b) => a.costLastMonth - b.costLastMonth
		},
		{
			title : '30 day sales',
			dataIndex : 'totalSales',
			key: 'totalSales',
		},
		{
			title: 'Recipes',   //TODO:删除菜谱
			dataIndex : 'recipes',
			key : 'recipes',
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					{/*update dialogue*/}
					<Dialogue parent={this} record={record}/>
					<a className="delete-data" onClick={(e)=>this.deleteData(record.stallName)}>Delete</a>
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
		this.getStall(selectedPage,pageSize);
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
				<Header>Stall</Header>
				<Content>
					<div><MaterialDrawer parent={this}/></div>
					<h3> </h3>
					<div><StallChangeDrawer parent={this}/></div>
					<h3> </h3>
					<div><RecipeDeleteDialogue parent={this}/></div>
					<h3> </h3>
					<div><RecipeAddDialogue parent={this}/></div>


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
		this.getStall(this.state.pageNo, this.state.size);
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDialogue = this.handleDataFromDialogue.bind(this);
		this.handleDataFromRecipeDeleteDialogue = this.handleDataFromRecipeDeleteDialogue.bind(this);
		this.handleDataFromRecipeAddDialogue = this.handleDataFromRecipeAddDialogue.bind(this);
		this.handleDataFromStallChangeDrawer = this.handleDataFromStallChangeDrawer.bind(this);
	}
}



const mapState = (state) => ({
	//list : state.getIn(['stall','list']),
	pageNo : state.getIn(['stall','pageNo']),
	size : state.getIn(['stall','size']),
	loginStatus: state.getIn(['login', 'login']),
	accountName : state.getIn(['login', 'account'])
});

const mapDispatch = (dispatch) => ({
	getMaterials(pageNo,size) {
		dispatch(actionCreators.getStall(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(Stall));

