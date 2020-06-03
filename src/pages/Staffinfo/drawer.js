import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    class MaterialDrawer extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                data: {
                    staffID:'',
                    staffName:'',
                    staffCategoryTypes:'',
                    timeStartWorking:'',
                    timeEndWorking:'',
                    operationName:''

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
                        Add New Staff
                    </Button>
                    <Drawer
                        title="New Staff"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Form>
                    <Form.Item
                            name="staffID"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter staffID!',
                                },
                            ]}>
                            <Input placeholder={'staffID'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        staffID: e.target.value
                                    }
                                })
                            }}/>
                    </Form.Item>

                    <Form.Item
                        name="staffName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter staffName!',
                            },
                        ]}>
                        <Input placeholder={'staffName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    staffName: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="staffCategoryTypes"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter staffCategoryTypes!',
                            },
                        ]}>
                        <Input placeholder={'staffCategoryTypes'} onChange={(e) => {
                            this.setState({
                                data :{
                                    staffCategoryTypes: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="timeStartWorking"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter timeStartWorking!',
                            },
                        ]}>
                        <Input placeholder={'timeStartWorking'} onChange={(e) => {
                            this.setState({
                                data :{
                                    timeStartWorking: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="timeEndWorking"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter timeEndWorking!',
                            },
                        ]}>
                        <Input placeholder={'timeEndWorking'} onChange={(e) => {
                            this.setState({
                                data :{
                                    timeEndWorking: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="operationName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter operationName!',
                            },
                        ]}>
                        <Input placeholder={'operationName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationName: e.target.value
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


