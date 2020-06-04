import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    class MaterialDrawer extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                data: {
                    transactionID:'',
                    stallName:'',
                    recipeName:'',
                    transactionTime:'',
                    numbers:'',
                    transactionPrice:'',
                    operation:''

                }
            }
        }

        setVisible = (value) => {
            this.setState(
                {
                    visible: value
                }
            )
        }

        showDrawer = () => {
            this.setVisible(true);
        };

        onClose = () => {
            this.setVisible(false);
        };



        handToParent = () => {
            const dataList = this.state.data;
            this.props.handleDataFromDrawer(dataList);
        }




        render() {
            return (
                <div>
                    <Button type="primary" onClick={this.showDrawer}>
                        Add New Sales Record
                    </Button>
                    <Drawer
                        title="New Sales Record"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    <Form.Item
                            name="transactionID"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter transactionID!',
                                },
                            ]}>
                            <Input placeholder={'TransactionID'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        transactionID: e.target.value
                                    }
                                })
                            }}/>
                    </Form.Item>

                    <Form.Item
                        name="stallName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter stallName!',
                            },
                        ]}>
                        <Input placeholder={'StallName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    stallName: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="recipeName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter recipeName!',
                            },
                        ]}>
                        <Input placeholder={'RecipeName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    recipeName: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="transactionTime"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter transactionTime!',
                            },
                        ]}>
                        <Input placeholder={'TransactionTime'} onChange={(e) => {
                            this.setState({
                                data :{
                                    transactionTime: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="numbers"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter numbers!',
                            },
                        ]}>
                        <Input placeholder={'numbers'} onChange={(e) => {
                            this.setState({
                                data :{
                                    timeEndWorking: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="transactionPrice"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter transactionPrice!',
                            },
                        ]}>
                        <Input placeholder={'TransactionPrice'} onChange={(e) => {
                            this.setState({
                                data :{
                                    transactionPrice: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="operation"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter operation!',
                            },
                        ]}>
                        <Input placeholder={'Operation'} onChange={(e) => {
                            this.setState({
                                data :{
                                    Operation: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>

                    <Button onClick={()=>this.props.parent.handleDataFromDrawer(this.state.data)}>Add</Button>

                </Drawer>
        </div>
        )
        }
    }
    export default MaterialDrawer;


