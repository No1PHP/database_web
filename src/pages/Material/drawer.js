import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    class MaterialDrawer extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                data: {
                    name: '',
                    type: '',
                    unitPrice: '',
                    availableAmount: '',
                    availablePeriod: '',
                    materialOrders: '',
                    recipes: '',
                    materialUsages: '',

                }
            }
            this.handToParent = this.handToParent.bind(this);
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



        handToParent = (e) => {
            const dataList = this.state.data;
            this.props.handleDataFromDrawer(dataList);
        }


        render() {
            return (
                <div>
                    <Button type="primary" onClick={this.showDrawer}>
                        AddMaterial
                    </Button>
                    <Drawer
                        title="New Material"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    <Form>
                    <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter name!',
                                },
                            ]}>
                            <Input placeholder={'name'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        name: e.target.value
                                    }
                                })
                            }}/>
                    </Form.Item>

                    <Form.Item
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter type!',
                            },
                        ]}>
                        <Input placeholder={'type'} onChange={(e) => {
                            this.setState({
                                data :{
                                    type: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="unitPrice"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter unitPrice!',
                            },
                        ]}>
                        <Input placeholder={'unitPrice'} onChange={(e) => {
                            this.setState({
                                data :{
                                    unitPrice: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="availableAmount"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter availableAmount!',
                            },
                        ]}>
                        <Input placeholder={'availableAmount'} onChange={(e) => {
                            this.setState({
                                data :{
                                    availableAmount: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="availablePeriod"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter availablePeriod!',
                            },
                        ]}>
                        <Input placeholder={'availablePeriod'} onChange={(e) => {
                            this.setState({
                                data :{
                                    availablePeriod: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="materialOrders"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter materialOrders!',
                            },
                        ]}>
                        <Input placeholder={'materialOrders'} onChange={(e) => {
                            this.setState({
                                data :{
                                    materialOrders: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="recipes"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter recipes!',
                            },
                        ]}>
                        <Input placeholder={'recipes'} onChange={(e) => {
                            this.setState({
                                data :{
                                    recipes: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="materialUsages"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter materialUsages!',
                            },
                        ]}>
                        <Input placeholder={'materialUsages'} onChange={(e) => {
                            this.setState({
                                data :{
                                    materialUsages: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    </Form>
                    <Button onClick={(e)=>this.handToParent.bind(this)}>Add</Button>

                </Drawer>
        </div>
        )
        }
    }
    export default MaterialDrawer;


