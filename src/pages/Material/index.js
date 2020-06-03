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
import Link from "react-router-dom/Link";


class Material extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [
				{
				name: 'egg',
				key: '1',
				type: 'food',
				unitPrice: '12',
				availableAmount: '100',
				availablePeriod: '90 days',
				materialOrders: '10',
				recipes: 'egg and tomato',
				materialUsages: 'everyday canteen',
			},
				{
					name: 'egg',
					key: '1',
					type: 'food',
					unitPrice: '12',
					availableAmount: '100',
					availablePeriod: '90 days',
					materialOrders: '10',
					recipes: 'egg and tomato',
					materialUsages: 'everyday canteen',
				},
				{
					name: 'egg',
					key: '1',
					type: 'food',
					unitPrice: '12',
					availableAmount: '100',
					availablePeriod: '90 days',
					materialOrders: '10',
					recipes: 'egg and tomato',
					materialUsages: 'everyday canteen',
				},
				{
					name: 'egg',
					key: '1',
					type: 'food',
					unitPrice: '12',
					availableAmount: '100',
					availablePeriod: '90 days',
					materialOrders: '10',
					recipes: 'egg and tomato',
					materialUsages: 'everyday canteen',
				},
				{
					name: 'egg',
					key: '1',
					type: 'food',
					unitPrice: '12',
					availableAmount: '100',
					availablePeriod: '90 days',
					materialOrders: '10',
					recipes: 'egg and tomato',
					materialUsages: 'everyday canteen',
				},
				{
					name: 'egg',
					key: '1',
					type: 'food',
					unitPrice: '12',
					availableAmount: '100',
					availablePeriod: '90 days',
					materialOrders: '10',
					recipes: 'egg and tomato',
					materialUsages: 'everyday canteen',
				},
				{
					name: 'egg',
					key: '1',
					type: 'food',
					unitPrice: '12',
					availableAmount: '100',
					availablePeriod: '90 days',
					materialOrders: '10',
					recipes: 'egg and tomato',
					materialUsages: 'everyday canteen',
				},
			],
			pageNo:'1',
			size:'10',
		};
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


	getMaterials = (pageNo,size) => {

			axios.get('http://localhost:8080/findAll?'+'pageNo='+pageNo+'&'+'size='+size+'&'+'page='+'Material').then((res) => {
			//axios.get('/api/detail.json?page='+pageNo+'&'+'size='+size).then((res) => {
				const result = res.data.list;
				console.log(res);
				console.log(res.data);
				console.log(res.data.list);
				this.setState(
					{list : result}
				)
			}).catch((e) => {
				console.log(e.message)
			})

	};


	//删除 传入食材名字
	deleteData (name) {

		return (
			axios.get('http://localhost:8080/delete？id='+name+'&'+'name='+'Material').then((res) => {
					const result = res.status;
					console.log((result===200)?'item successfully changed':'change failed')
				}
			).catch((e) => {
				console.log(e)
			})
		)
	}




	updateData = (dataList) => {//传本项的datalist
		return (
		axios.post('http://localhost:8080/Material/operate',dataList).then((res) => {
		const result = res.status;
		console.log((result===200)?'item successfully changed':'change failed')
				}
			).catch((e)=>{
			console.log(e)
		})
		)

	}


	addNewMaterial = (dataList) => {
		return (
			axios.post('http://localhost:8000/Material/add',dataList).then((res) => {
					const result = res.status;
					console.log((result===200)?'Item successfully added':'Added failed')
				}
			).catch((e)=>{
				console.log(e)
				}
			)
		)
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
		   	   title: 'MaterialOrders',
			   dataIndex: 'materialOrders',
			   key : 'materialOrders',
			   sorter: (a, b) => a.materialOrders - b.materialOrders,
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
					<Dialogue />
        　　     <a className="delete-data" onClick={(e)=>this.deleteData(record.name)}>Delete</a>
                </Space>
				),
			},
		];



	render() {
		const {loginStatus, list} = this.props;
		const style = {
			//height: 40,
			//width: 40,
			//borderRadius: 4,
			border:'right',
			backgroundColor: '#1088e9',
			color: '#fff',
			textAlign: 'center',
			fontSize: 14,
		};

		//if(loginStatus){
		return (
			<Link to={'/Material'}>
			<DetailWrapper>
				<Header>Materials</Header>
				<Content>
					<MaterialDrawer/>

                <Table size="middle"
					   columns={this.renderColumn}
					   dataSource={this.state.list}
				/>
					<BackTop>
						<div style={style}>UP</div>
					</BackTop>
				</Content>

			</DetailWrapper>
			</Link>
		)
	//}
		/*else {
			alert("please login first");
			return <Redirect to='/login'/>
		}*/
	}

	componentDidMount() {
		const {accountName} = this.props;
		//const {pageNo} = this.props;
		//const {size} = this.props;
		//this.props.getMaterials(pageNo, size);
		this.getMaterials(this.state.pageNo, this.state.size);
		this.handleDataFromDrawer = this.handleDataFromDrawer.bind(this);
		this.handleDataFromDialogue = this.handleDataFromDrawer.bind(this);
	}
}



const mapState = (state) => ({
    //list : state.getIn(['material','list']),
    //pageNo : state.getIn(['material','pageNo']),
    //size : state.getIn(['material','size']),
	loginStatus: state.getIn(['login', 'login']),
	accountName : state.getIn(['login', 'account'])
});
/*
const mapDispatch = (dispatch) => ({

    getMaterials(pageNo,size) {
        dispatch(actionCreators.getMaterials(pageNo,size));
    }


});
*/
//export default connect(mapState, mapDispatch)(withRouter(Material));
export default connect(mapState, null)(withRouter(Material));

