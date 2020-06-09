import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class StallChangeDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {
                stallName:'',
                newLocation:''
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
        this.props.parent.handleDataFromStallChangeDrawer(dataList);
        this.setVisible(false);
    }


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer} block>
                    Change stall location
                </Button>
                <Drawer
                    title="Add Stall Change Records"
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
                            <Input placeholder={'stallName'} onChange={(e) => {
                                this.state.data.stallName = e.target.value;
                            }}/>
                        </Form.Item>

                        <Form.Item
                            name="newLocation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter newLocation!',
                                },
                            ]}>
                            <Input placeholder={'newLocation'} onChange={(e) => {
                                this.state.data.newLocation = e.target.value;
                            }
                            }/>
                        </Form.Item>

                    </Form>
                    <Button onClick={this.handToParent}>Add</Button>

                </Drawer>
            </div>
        )
    }
}
export default StallChangeDrawer;


