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
import RecipeDeleteDialogue from "./RecipeDeleteDialogue";


class Stall extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [
				{
					stallName:'',
					stallLocation:'',
					stallRent:'',
					costLastMonth:'',
					operationName:'',
					recipes:['小笼包','饺子'],
				},
				{
					stallName:'',
					stallLocation:'',
					stallRent:'',
					costLastMonth:'',
					operationName:'',
					recipes:[],
				},
				{
					stallName:'',
					stallLocation:'',
					stallRent:'',
					costLastMonth:'',
					operationName:'',
					recipes:[],
				},

			],
			pageNo:'1',
			size:'10',
		};
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDialogue = this.handleDataFromDrawer.bind(this);
		this.handleDataFromRecipeDeleteDialogue = this.handleDataFromRecipeDeleteDialogue.bind(this);
	}

  handleDataFromRecipeDeleteDialogue(data){
		const dataList = {
			stallName : data.stallName,
			recipes:data.recipes,
			operationName: 'removeRecipeForStall'
		}
		this.deleteRecipeForStall(dataList).then();

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


	getStall = (pageNo, size) => {
		return (
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'Stall').then((res) => {
				const result = res.data.result;
				this.setState(
					{list : result}
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
			axios.post('http://localhost:8080/Stall/oper',requestJson).then((res)=>{
				const result = res.status;
				alert((result===200)?'succeed':'delete failed');
				}

			).catch(e=>{
				console.log(e)
			})
		)
	}



	updateData = (dataList) => {//传本项的datalist
		return (
			axios.post('http://localhost:8080/Stall/oper',dataList).then((res) => {
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
			axios.post('http://localhost:8080/Stall',dataList).then((res) => {
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
			title : 'OperationName',
			dataIndex : 'operationName',
			key : 'operationName',
		},
		{
			title: 'Recipes',   //TODO:删除菜谱
			dataIndex : 'recipes',
			key : 'recipes',
			render: (recipes) => (
				<span>
            {recipes.map(c => <div>{c.index}</div>)}
          </span>
			)
/*
			render : (text, record) => (
				this.state.list.map((item,dataIndex)=>{
					//<a onClick={(e)=>this.deleteRecipe(record.stallName,item.recipes)}>{item.recipes}</a>
				}
				)

			),
*/
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					{/*update dialogue*/}
					<Dialogue />
					<a className="delete-data" onClick={(e)=>this.deleteData(record.stallName)}>Delete</a>
				</Space>
			),
		},
	];



	render() {

		return (
			<DetailWrapper>
				<Header>Stall</Header>
				<Content>
					<div><MaterialDrawer/></div>
					<h3> </h3>
					<div><RecipeDeleteDialogue/></div>
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
		this.getStall(this.state.pageNo, this.state.size);
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

