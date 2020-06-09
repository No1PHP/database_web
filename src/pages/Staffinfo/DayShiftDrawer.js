import React, {useState, Component} from "react";

import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class DayShiftDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                staffID: this.props.record.staffID,
                startTime: "",
                endTime: ""
            }
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };


    handleOk = () => {
        const dataList = this.state.data;
        this.props.parent.handleDataFromDayShiftDrawer(dataList);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <a onClick={this.showModal}>
                    schedule
                </a>
                <Modal
                    visible={visible}
                    title="Enter the Staff schedule time"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={()=>{this.props.parent.handleDataFromDayShiftDrawer(this.state.data);
                            this.setState({
                                visible: false,
                            });
                        }}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>defaultValue
                        <Form.Item
                            name="staffID"
                        >
                            <Input placeholder={'staffID'} defaultValue={this.props.record.staffID} readOnly/>
                        </Form.Item>
                        <Form.Item
                            name="timeStartWorking"
                        >
                            <Input placeholder={'timeStartWorking'} onChange={(e) => {
                                this.state.data.startTime = e.target.value;
                            }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="timeEndWorking"
                        >
                            <Input placeholder={'timeEndWorking'} onChange={(e) => {
                                this.state.data.endTime = e.target.value;
                            }}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default DayShiftDrawer;


