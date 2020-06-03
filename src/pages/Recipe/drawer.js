import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    class MaterialDrawer extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                data: {
                    recipeName:'',
                    relevantIngredient:'',
                    price:'',
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
                        Add New Recipe
                    </Button>
                    <Drawer
                        title="New Recipe"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Form>
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
                            }}/>
                    </Form.Item>

                    <Form.Item
                        name="relevantIngredient"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter relevantIngredient!',
                            },
                        ]}>
                        <Input placeholder={'RelevantIngredient, please separate different individuals with comma!'} onChange={(e) => {
                            this.setState({
                                data :{
                                    relevantIngredient: e.target.value
                                }
                            })
                        }
                        }/>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter price!',
                            },
                        ]}>
                        <Input placeholder={'Price'} onChange={(e) => {
                            this.setState({
                                data :{
                                    price: e.target.value
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
                        }}
                        />
                    </Form.Item>
                    </Form>
                    <Button onClick={()=>this.handToParent.bind(this)}>Add</Button>

                </Drawer>
        </div>
        )
        }
    }
    export default MaterialDrawer;


