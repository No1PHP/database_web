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
                    stallRent:''
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
            this.setVisible(false);
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
                                this.state.data.stallName = e.target.value;
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
                            this.state.data.stallLocation = e.target.value;
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
                            this.state.data.stallRent = e.target.value;
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


