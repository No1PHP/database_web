import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                name: '',
                type: '',
                unitPrice: '',
                availableAmount: '',
                availablePeriod: '',
                materialOrders: '',
                recipes: '',
                materialUsages: '',

            }

        };

    }




    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        const data = this.state.data;
        this.props.handleDataFromDialogue(data);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <a onClick={this.showModal}>
                    update
                </a>
                <Modal
                    visible={visible}
                    title="Enter the Material record you want to instill"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    size = {"small"}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={()=>this.handleOk.bind(this)}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
                    <Form.Item
                        name="name"
                        >
                        <Input placeholder={'name'} onChange={(e) => {
                            this.setState({
                                data :{
                                    name: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>

                    <Form.Item
                        name="type"
                        >
                        <Input placeholder={'type'} onChange={(e) => {
                            this.setState({
                                data :{
                                    type: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="unitPrice"
                        >
                        <Input placeholder={'unitPrice'} onChange={(e) => {
                            this.setState({
                                data :{
                                    unitPrice: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="availableAmount"
                        >
                        <Input placeholder={'availableAmount'} onChange={(e) => {
                            this.setState({
                                data :{
                                    availableAmount: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="availablePeriod"
                        >
                        <Input placeholder={'availablePeriod'} onChange={(e) => {
                            this.setState({
                                data :{
                                    availablePeriod: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="materialOrders"
                        >
                        <Input placeholder={'materialOrders'} onChange={(e) => {
                            this.setState({
                                data :{
                                    materialOrders: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="recipes"
                        >
                        <Input placeholder={'recipes'} onChange={(e) => {
                            this.setState({
                                data :{
                                    recipes: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="materialUsages"
                        >
                        <Input placeholder={'materialUsages'} onChange={(e) => {
                            this.setState({
                                data :{
                                    materialUsages: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}


export default Dialogue;
