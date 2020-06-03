import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    class MaterialDrawer extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                data: {
                    stallName:'',
                    stallLocation:'',
                    stallRent:'',
                    costLastMonth:'',
                    operationName:'',
                    recipes:'',

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
                    <Button type="primary" onClick={this.showDrawer} block>
                        Add New Stall
                    </Button>
                    <Drawer
                        title="New Stall"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Form>
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
                            }}/>
                    </Form.Item>

                    <Form.Item
                        name="stallLocation"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter stallLocation!',
                            },
                        ]}>
                        <Input placeholder={'StallLocation'} onChange={(e) => {
                            this.setState({
                                data :{
                                    stallLocation: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="stallRent"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter stallRent!',
                            },
                        ]}>
                        <Input placeholder={'StallRent'} onChange={(e) => {
                            this.setState({
                                data :{
                                    stallRent: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="costLastMonth"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter costLastMonth!',
                            },
                        ]}>
                        <Input placeholder={'CostLastMonth'} onChange={(e) => {
                            this.setState({
                                data :{
                                    costLastMonth: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="operationName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter operationName!',
                            },
                        ]}>
                        <Input placeholder={'OperationName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationName: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="recipes"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter recipes!',
                            },
                        ]}>
                        <Input placeholder={'recipes, please separate different individuals with comma!'} onChange={(e) => {
                            this.setState({
                                data :{
                                    recipes: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                        </Form>
                    <Button onClick={()=>this.handToParent.bind(this)}>Add</Button>

                </Drawer>
        </div>
        )
        }
    }
    export default MaterialDrawer;


