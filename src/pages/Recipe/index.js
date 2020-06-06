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


class Recipe extends Component {

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
			recipeName: data.recipeName,
			relevantIngredient: data.relevantIngredient,
			price:data.price,
			operationName : 'AddRecipe'
		};
		this.addNewRecipe(dataList).catch((e)=>{
			console.log(e)
		});

	}


	handleDataFromDialogue(data){
		const dataList = {
			recipeName: data.recipeName,
			relevantIngredient: data.relevantIngredient,
			price:data.price,
			operationName : 'ModifyRecipe'
		};
		this.updateData(dataList).catch((e)=>{
			console.log(e)
		});
	}


	getRecipe = (pageNo, size) => {
		(
			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'Recipe').then((res) => {
				const result = res.data.result;
				this.setState(
					{
						list : result,
						totalCount: res.data.totalCount
					}
				)
			}).catch((e) => {
				console.log(e)
			})
		)
	};


	deleteData = (name) => {
		return (
			axios.get('http://localhost:8080/delete?id='+name+'&'+'name=Recipe').then((res) => {
					const result = res.status;
					console.log((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}



	updateData = (dataList) => {//传本项的datalist
		return (
			axios.post('http://localhost:8080/Recipe/modify?recipeRequestString='+JSON.stringify(dataList)).then((res) => {
					const result = res.status;
					console.log((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)

	}


	addNewRecipe = (dataList) => {
		return (
			axios.post('http://localhost:8080/Recipe/modify?recipeRequestString='+JSON.stringify(dataList)).then((res) => {
					const result = res.status;
					console.log((result===200)?'Item successfully added':'Added failed')
				}
			).catch((e)=>{
				console.log(e.message)
			})
		)
	}

	r

	renderColumn = [
		{
			title: 'RecipeName',
			dataIndex: 'recipeName',
			key: 'recipeName',
		},
		{
			title: 'RelevantIngredient',
			dataIndex: 'relevantIngredient',
			key: 'relevantIngredient',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: '30 day sales',
			dataIndex: 'totalSales',
			key: 'totalSales',
		},
		{
			title: 'Action',
			key: 'action',
			render : (text, record) => (
				<Space size="middle">
					{/*update dialogue*/}
					<Dialogue parent={this} record={record}/>
					<a className="delete-data" onClick={(e)=>this.deleteData(record.recipeName)}>Delete</a>
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
		this.getRecipe(selectedPage,pageSize);
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
				<Header>Recipe</Header>
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
			</DetailWrapper>
		)
	}

	componentDidMount() {
		const {accountName} = this.props;
		this.getRecipe(this.state.pageNo, this.state.size);
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDialogue = this.handleDataFromDialogue.bind(this);
	}
}



const mapState = (state) => ({
	//list : state.getIn(['staff','list']),
	pageNo : state.getIn(['recipe','pageNo']),
	size : state.getIn(['recipe','size']),
	loginStatus: state.getIn(['login', 'login']),
	accountName : state.getIn(['login', 'account'])
});

const mapDispatch = (dispatch) => ({
	getMaterials(pageNo,size) {
		dispatch(actionCreators.getRecipe(pageNo,size));
	}
});

export default connect(mapState, mapDispatch)(withRouter(Recipe));

