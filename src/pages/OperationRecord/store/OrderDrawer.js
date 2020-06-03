import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class OrderDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {
                materialName:'',
                amount:''

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
        this.props.handleDataFromOrderDrawer(dataList);
    }


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer} block>
                    Order
                </Button>
                <Drawer
                    title="Order"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form>
                        <Form.Item
                            name="materialName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter materialName!',
                                },
                            ]}>
                            <Input placeholder={'materialName'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        materialName: e.target.value
                                    }
                                })
                            }}/>
                        </Form.Item>

                        <Form.Item
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter amount!',
                                },
                            ]}>
                            <Input placeholder={'amount'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        amount: e.target.value
                                    }
                                })
                            }
                            }/>
                        </Form.Item>

                    </Form>
                    <Button onClick={()=>this.handToParent.bind(this)}>Order</Button>

                </Drawer>
            </div>
        )
    }
}
export default OrderDrawer;


