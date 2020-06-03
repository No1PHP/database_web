import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                recipeName:'',
                relevantIngredient:'',
                price:'',
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
                    title="Enter the update Recipe information you want to instill"
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
                        name="recipeName"
                        >
                        <Input placeholder={'RecipeName'} onChange={(e) => {
                            this.setState({
                                data :{
                                    recipeName: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>

                    <Form.Item
                        name="relevantIngredient"
                        >
                        <Input placeholder={'RelevantIngredient, please separate the different individuals with comma!'} onChange={(e) => {
                            this.setState({
                                data :{
                                    relevantIngredient: e.target.value
                                }
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        >
                        <Input placeholder={'Price'} onChange={(e) => {
                            this.setState({
                                data :{
                                    price: e.target.value
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
