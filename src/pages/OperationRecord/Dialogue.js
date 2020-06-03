import {Modal, Button, Form, Input} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                operationID:'',
                staffID:'',
                operationType:'',
                note:'',
                operationTime:'',
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
                    title="Enter the update record you want to instill"
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
                        name="operationID"
                        >
                        <Input placeholder={'operationID'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationID: e.target.value
                                }
                            });

                        }}/>
                    </Form.Item>

                    <Form.Item
                        name="staffID"
                        >
                        <Input placeholder={'staffID'} onChange={(e) => {
                            this.setState({
                                data :{
                                    staffID: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="operationType"
                        >
                        <Input placeholder={'operationType'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationType: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="note"
                        >
                        <Input placeholder={'note'} onChange={(e) => {
                            this.setState({
                                data :{
                                    note: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="operationTime"
                        >
                        <Input placeholder={'operationTime'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationTime: e.target.value
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
