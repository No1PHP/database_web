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
                    recipeName:'',
                    numbers:'',
                    transactionPrice:''
                }
            };
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

        handToParent = () => {
            const dataList = this.state.data;
            this.props.parent.handleDataFromDrawer(dataList);
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
                        name="stallName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter stallName!',
                            },
                        ]}>
                        <Input placeholder={'StallName'} onChange={(e) => {
                            this.state.data.stallName = e.target.value;
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
                            this.state.data.recipeName = e.target.value;
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
                            this.state.data.numbers = e.target.value;
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
                            this.state.data.transactionPrice = e.target.value;
                        }
                        }/>
                    </Form.Item>
                    <Button onClick={this.handToParent}>Add</Button>

                </Drawer>
        </div>
        )
        }
    }
    export default MaterialDrawer;


