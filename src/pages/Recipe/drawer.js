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
                    price:''
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



        handToParent = () => {
            const dataList = this.state.data;
            this.props.parent.handleDataFromDrawer(dataList);
            this.setState({
                visible: false,
            });
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
                                this.state.data.recipeName = e.target.value;
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
                            this.state.data.relevantIngredient = e.target.value;
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
                            this.state.data.price = e.target.value;
                        }}
                        />
                    </Form.Item>
                    </Form>
                    <Button onClick={this.handToParent}>Add</Button>

                </Drawer>
        </div>
        )
        }
    }
    export default MaterialDrawer;


