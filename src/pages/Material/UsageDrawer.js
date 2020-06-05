import React, {useState, Component} from "react";

import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class UsageDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {
                materialName:this.props.record.name,
                stallName: "",
                amount: ""
            }
        }
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        const data = this.state.data;
        this.props.parent.handleDataFromUsageDrawer(data);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <a onClick={this.showModal}>
                    allocate
                </a>
                <Modal
                    visible={visible}
                    title="make material order"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    size = {"small"}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={()=>{
                            this.props.parent.handleDataFromUsageDrawer(this.state.data)}
                        }>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
                        <Form.Item
                            name="materialName"
                        >
                            <Input placeholder={'materialName'} defaultValue={this.props.record.name} readOnly/>
                        </Form.Item>
                        <Form.Item
                            name="stallName"
                        >
                            <Input placeholder={'stallName'} onChange={(e) => {
                                this.state.data.stallName = e.target.value;
                            }}/>
                        </Form.Item>
                        <Form.Item
                            name="amount"
                        >
                            <Input placeholder={'amount'} onChange={(e) => {
                                this.state.data.amount = e.target.value;
                            }}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default UsageDrawer;


