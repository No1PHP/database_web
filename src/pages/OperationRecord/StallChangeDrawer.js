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
        this.props.handleDataFromStallChangeDrawer(dataList);
    }


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer} block>
                    Add Stall Change Records
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
                                this.setState({
                                    data :{
                                        stallName: e.target.value
                                    }
                                })
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
                                this.setState({
                                    data :{
                                        newLocation: e.target.value
                                    }
                                })
                            }
                            }/>
                        </Form.Item>

                    </Form>
                    <Button onClick={()=>this.handleDataFromStallChangeDrawer(this.state.data)}>Add</Button>

                </Drawer>
            </div>
        )
    }
}
export default StallChangeDrawer;


