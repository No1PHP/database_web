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
                    availablePeriod: ''
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
            this.props.parent.handleDataFromDrawer(dataList);
            this.setVisible(false);
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
                                this.state.data.name = e.target.value;
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
                            this.state.data.type = e.target.value;
                        }}/>
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
                            this.state.data.unitPrice = e.target.value;
                        }}/>
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
                            this.state.data.availablePeriod = e.target.value;
                        }}/>
                    </Form.Item>
                    </Form>
                    <Button onClick={this.handToParent}>Add</Button>

                </Drawer>
        </div>
        )
        }
    }
    export default MaterialDrawer;


