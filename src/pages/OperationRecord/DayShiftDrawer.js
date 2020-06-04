import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class DayShiftDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {
                staffID:'',
                startTime:'',
                endTime:''

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
        this.props.handleDataFromDayShiftDrawer(dataList);
    }


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer} block>
                    Add Day Shift Schedule
                </Button>
                <Drawer
                    title="Add Day Shift"
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
                            }
                            }/>
                        </Form.Item>
                        <Form.Item
                            name="startTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter start time!',
                                },
                            ]}>
                            <Input placeholder={'startTime'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        startTime: e.target.value
                                    }
                                })
                            }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="endTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter end time!',
                                },
                            ]}>
                            <Input placeholder={'endTime'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        endTime: e.target.value
                                    }
                                })
                            }}
                            />
                        </Form.Item>
                    </Form>
                    <Button onClick={()=>this.props.parent.handleDataFromDayShiftDrawer(this.state.data)}>Add</Button>

                </Drawer>
            </div>
        )
    }
}
export default DayShiftDrawer;


