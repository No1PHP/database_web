import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import {Table, Tag, Space, Button, Drawer, Input} from 'antd';
import { getIn } from 'immutable';
import axios from "axios";
import MaterialDrawer from "./drawer";


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
		}
	}

	getMaterials = (pageNo,size) => {
		return () => {
			axios.get('localhost:8000/Material'+'pageNo='+pageNo+'&'+'size='+size).then((res) => {
				const result = res.data.data;
				this.state.setState(
					{list : result}
				)
			}).catch((e) => {
				console.log(e)
			})
		}
	};


	deleteData() {
		return undefined;
	}

	updateData = (dataList) => {//传本项目的key
		return (
		axios.post('localhost:8000/Material/update',dataList).then((res) => {
		const result = res.status;
		console.log((result===400)?'item successfully changed':'change failed')
				}
			)
		)

	}


	addNewMaterial = (dataList) => {
		return (
			axios.post('localhost:8000/Material/add',dataList).then((res) => {
					const result = res.status;
					console.log((result===400)?'Item successfully added':'Added failed')
				}
			)
		)
	}



	renderColumn = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
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
			},
		   {
			   title : 'AvailableAmount',
			   dataIndex : 'availableAmount',
			   key: 'availableAmount',
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
        　　     <a className="update-data" onClick={this.updateData.bind(this)}>Update</a>
        　　     <a className="delete-data" onClick={this.deleteData.bind(this)}>Delete</a>
                </Space>
				),
			},
		];



	render() {

		return (
			<DetailWrapper>
				<Header>Materials</Header>
				<Content>
					<MaterialDrawer/>
                <Table size="middle"
					   columns={this.renderColumn}
					   dataSource={this.state.list}
				/>
				</Content>
			</DetailWrapper>
		)
	}

	componentDidMount() {
		this.getMaterials(this.props.pageNo,this.props.size);
	}
}



const mapState = (state) => ({
    list : state.getIn(['material','list']),
    pageNo : state.getIn(['material','pageNo']),
    size : state.getIn(['material','size'])
});

const mapDispatch = (dispatch) => ({
    getMaterials(pageNo,size) {
        dispatch(actionCreators.getMaterials(pageNo,size));
    }
});

export default connect(mapState, mapDispatch)(withRouter(Material));

