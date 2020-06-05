import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    class MaterialDrawer extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                data: {
                    staffName:'',
                    staffCategoryTypes:'',
                    timeStartWorking:'',
                    timeEndWorking:''

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
                        name="staffName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter staffName!',
                            },
                        ]}>
                        <Input placeholder={'staffName'} onChange={(e) => {
                            this.state.data.staffName = e.target.value;
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
                            this.state.data.staffCategoryTypes = e.target.value;
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
                            this.state.data.timeStartWorking = e.target.value;
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
                            this.state.data.timeEndWorking = e.target.value;
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


