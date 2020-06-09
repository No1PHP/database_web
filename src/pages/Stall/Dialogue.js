import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                stallName: this.props.record.stallName,
                stallLocation: this.props.record.stallLocation,
                stallRent: this.props.record.stallRent,
                costLastMonth: this.props.record.costLastMonth,
                operationName: this.props.record.operationName
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
                    title="Enter the update Stall information you want to instill"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={()=>{this.props.parent.handleDataFromDialogue(this.state.data);
                            this.setState({
                                visible: false,
                            });
                        }}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
                    <Form.Item
                        name="stallName"
                        >
                        <Input placeholder={'StallName'} defaultValue={this.props.record.stallName} readOnly/>
                    </Form.Item>

                    <Form.Item
                        name="stallLocation"
                    >
                        <Input placeholder={'StallLocation'} defaultValue={this.props.record.stallLocation} readOnly/>
                    </Form.Item>

                    <Form.Item
                        name="stallRent"
                        >
                        <Input placeholder={'StallRent'} defaultValue={this.props.record.stallRent} onChange={(e) => {
                            this.state.data.stallRent = e.target.value;
                        }}/>
                    </Form.Item>

                    <Form.Item
                        name="costLastMonth"
                        >
                        <Input placeholder={'CostLastMonth'} defaultValue={this.props.record.costLastMonth} onChange={(e) => {
                            this.state.data.costLastMonth = e.target.value;
                        }}
                        />
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}


export default Dialogue;
