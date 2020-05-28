import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    class OperationDrawer extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                data: {
                    operationID:'',
                    staffID:'',
                    operationType:'',
                    note:'',
                    operationTime:'',

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
                        AddOperationRecords
                    </Button>
                    <Drawer
                        title="New OperationRecords"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    <Form.Item
                            name="operationID"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter operationID!',
                                },
                            ]}>
                            <Input placeholder={'operationID'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        operationID: e.target.value
                                    }
                                })
                            }}/>
                    </Form.Item>

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
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="operationType"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter operationType!',
                            },
                        ]}>
                        <Input placeholder={'operationType'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationType: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="operationTime"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter operationTime!',
                            },
                        ]}>
                        <Input placeholder={'operationTime'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationTime: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>

                    <Button onClick={()=>this.handToParent.bind(this)}>Add</Button>

                </Drawer>
        </div>
        )
        }
    }
    export default OperationDrawer;


