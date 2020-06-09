import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                name: this.props.record.name,
                type: this.props.record.type,
                unitPrice: this.props.record.unitPrice,
                availablePeriod: this.props.record.availablePeriod
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
                        <Button key="submit" type="primary" loading={loading} onClick={()=>{
                            this.props.parent.handleDataFromDialogue(this.state.data);
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
                        name="type"
                        >
                        <Input placeholder={'type'} defaultValue={this.props.record.type} onChange={(e) => {
                            this.state.data.type = e.target.value;
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="unitPrice"
                        >
                        <Input placeholder={'unitPrice'} defaultValue={this.props.record.unitPrice} onChange={(e) => {
                            this.state.data.unitPrice = e.target.value;
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="availablePeriod"
                        >
                        <Input placeholder={'availablePeriod'} defaultValue={this.props.record.availablePeriod} onChange={(e) => {
                            this.state.data.availablePeriod = e.target.value;
                        }}/>
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}


export default Dialogue;
