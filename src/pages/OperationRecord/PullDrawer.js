import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class PullDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {
                operationID:'',

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
        this.props.handleDataFromPullDrawer(dataList);
    }


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer} block>
                    Pull sth
                </Button>
                <Drawer
                    title="Pull Records"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form>
                        <Form.Item
                            name="operationID"
                            key='operationID'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter operationID to pull from storage!',
                                },
                            ]}>
                            <Input placeholder={'operationID'} onChange={(e) => {
                                this.setState({
                                    data :{
                                        operationID: e.target.value
                                    }
                                })
                            }}/>
                        </Form.Item>


                    </Form>
                    <Button onClick={()=>this.props.parent.handleDataFromPullDrawer(this.state.data)}>Pull</Button>

                </Drawer>
            </div>
        )
    }
}
export default PullDrawer;


