import React, {useState, Component} from "react";

import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class OrderDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {
                materialName:this.props.record.name,
                amount:''
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
        this.props.handleDataFromOrderDrawer(data);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <a onClick={this.showModal}>
                    order
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
                            this.props.parent.handleDataFromOrderDrawer(this.state.data);
                            this.setState({visible:false});
                        }}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
                        <Form.Item
                            name="name"
                        >
                            <Input placeholder={'name'} defaultValue={this.props.record.name} readOnly/>
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

export default OrderDrawer;


