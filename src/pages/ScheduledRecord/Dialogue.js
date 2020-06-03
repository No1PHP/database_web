import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                transactionID:'',
                stallName:'',
                recipeName:'',
                transactionTime:'',
                numbers:'',
                transactionPrice:''
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
        this.props.handleDataFromDialogue(dataList);
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
                    title="Enter the update Sale information you want to instill"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
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
                        name="transactionID"
                        >
                        <Input placeholder={'TransactionID'} onChange={(e) => {
                            this.setState({
                                data :{
                                    transactionID: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>

                    <Form.Item
                        name="stallName"
                        >
                        <Input placeholder={'StallName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    stallName: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="recipeName"
                        >
                        <Input placeholder={'RecipeName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    recipeName: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="transactionTime"
                        >
                        <Input placeholder={'TransactionTime'} onChange={(e) => {
                            this.setState({
                                data :{
                                    transactionTime: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="numbers"
                        >
                        <Input placeholder={'Numbers'} onChange={(e) => {
                            this.setState({
                                data :{
                                    numbers: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="transactionPrice"
                        >
                        <Input placeholder={'TransactionPrice'} onChange={(e) => {
                            this.setState({
                                data :{
                                    transactionPrice: e.target.value
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
