import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                stallName:'',
                stallLocation:'',
                stallRent:'',
                costLastMonth:'',
                operationName:'',
                recipes:'',

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
                        <Button key="submit" type="primary" loading={loading} onClick={()=>this.handleOk.bind(this)}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
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
                        name="stallLocation"
                    >
                        <Input placeholder={'StallLocation'} onChange={(e) => {
                            this.setState({
                                data :{
                                    stallLocation: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="stallRent"
                        >
                        <Input placeholder={'StallRent'} onChange={(e) => {
                            this.setState({
                                data :{
                                    stallRent: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>

                    <Form.Item
                        name="costLastMonth"
                        >
                        <Input placeholder={'CostLastMonth'} onChange={(e) => {
                            this.setState({
                                data :{
                                    costLastMonth: e.target.value
                                }
                            })
                        }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="operationName"
                        >
                        <Input placeholder={'OperationName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    operationName: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="recipes"
                        >
                        <Input placeholder={'recipes, please separate individuals with comma!'} onChange={(e) => {
                            this.setState({
                                data :{
                                    recipes: e.target.value
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
