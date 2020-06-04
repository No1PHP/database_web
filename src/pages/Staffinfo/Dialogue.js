import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                staffID:'',
                staffName:'',
                staffCategoryTypes:'',
                timeStartWorking:'',
                timeEndWorking:'',
                operationName:''

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
                    title="Enter the update Staff information you want to instill"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={()=>this.props.parent.handleDataFromDialogue(this.state.data)}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
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
                        name="staffName"
                        >
                        <Input placeholder={'staffName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    staffName: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="staffCategoryTypes"
                        >
                        <Input placeholder={'staffCategoryTypes'} onChange={(e) => {
                            this.setState({
                                data :{
                                    staffCategoryTypes: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="timeStartWorking"
                        >
                        <Input placeholder={'timeStartWorking'} onChange={(e) => {
                            this.setState({
                                data :{
                                    availableAmount: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="timeEndWorking"
                        >
                        <Input placeholder={'timeEndWorking'} onChange={(e) => {
                            this.setState({
                                data :{
                                    timeEndWorking: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="operationName"
                        >
                        <Input placeholder={'operationName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationName: e.target.value
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
