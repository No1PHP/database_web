import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                staffID: this.props.record.staffID,
                staffName: this.props.record.staffName,
                staffCategoryTypes: this.props.record.staffCategoryTypes,
                timeStartWorking: this.props.record.timeStartWorking,
                timeEndWorking: this.props.record.timeEndWorking
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
                        <Input placeholder={'staffID'} defaultValue={this.props.record.staffID} readOnly/>
                    </Form.Item>

                    <Form.Item
                        name="staffName"
                        >
                        <Input placeholder={'staffName'} defaultValue={this.props.record.staffName} onChange={(e) => {
                            this.state.data.staffName = e.target.value;
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="staffCategoryTypes"
                        >
                        <Input placeholder={'staffCategoryTypes'} defaultValue={this.props.record.staffCategoryTypes} onChange={(e) => {
                            this.state.data.staffCategoryTypes = e.target.value;
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="timeStartWorking"
                        >
                        <Input placeholder={'timeStartWorking'} defaultValue={this.props.record.timeStartWorking} onChange={(e) => {
                            this.state.data.availableAmount = e.target.value;
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="timeEndWorking"
                        >
                        <Input placeholder={'timeEndWorking'} defaultValue={this.props.record.timeEndWorking} onChange={(e) => {
                            this.state.data.timeEndWorking = e.target.value;
                        }}/>
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}


export default Dialogue;
