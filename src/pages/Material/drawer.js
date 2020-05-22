import React, {useState, Component} from "react";

import {  Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


    const MaterialDrawer = () => {

        const [visible, setVisible] = useState(false);

        const showDrawer = () => {
            setVisible(true);
        };

        const onClose = () => {
            setVisible(false);
        };

        const list = [];


        const handleClick = () =>{
            // list =
        }

        return (
            <div>
                <Button type="primary" onClick={showDrawer}>
                    AddMaterial
                </Button>
                <Drawer
                    title="New Material"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter name!',
                            },
                        ]}>
                        <Input placeholder={'name'} value={(input) => {
                            list.concat(input)
                        }}/>
                    </Form.Item>

                    <Form.Item
                        ame="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter type!',
                            },
                        ]}>
                        <Input placeholder={'type'} value={(input) => {
                            list.concat(input)
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="unitPrice"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter unitPrice!',
                            },
                        ]}>
                        <Input placeholder={'unitPrice'} value={(input) => {
                            list.concat(input)
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="availableAmount"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter availableAmount!',
                            },
                        ]}>
                        <Input placeholder={'availableAmount'} value={(input) => {
                            list.concat(input)
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="availablePeriod"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter availablePeriod!',
                            },
                        ]}>
                        <Input placeholder={'availablePeriod'} value={(input) => {
                            list.concat(input)
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="materialOrders"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter materialOrders!',
                            },
                        ]}>
                        <Input placeholder={'materialOrders'} value={(input) => {
                            list.concat(input)
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="recipe"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter recipe!',
                            },
                        ]}>
                        <Input placeholder={'recipe'} value={(input) => {
                            list.concat(input)
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="materialUsages"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter materialUsages!',
                            },
                        ]}>
                        <Input placeholder={'materialUsages'} value={(input) => {
                            list.concat(input)
                        }}/>
                    </Form.Item>
                    <Button onClick={handleClick}>Add</Button>

                </Drawer>
            </div>
        );
    };

    export default MaterialDrawer;


