import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class Dialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                recipeName: this.props.record.recipeName,
                relevantIngredient: this.props.record.relevantIngredient,
                price: this.props.record.price
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
                        <Button key="submit" type="primary" loading={loading} onClick={()=>{
                            this.props.parent.handleDataFromDialogue(this.state.data)
                        }}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
                    <Form.Item
                        name="recipeName"
                        >
                        <Input placeholder={'RecipeName'} defaultValue={this.props.record.recipeName} readOnly/>
                    </Form.Item>

                    <Form.Item
                        name="relevantIngredient"
                        >
                        <Input placeholder={'RelevantIngredient, please separate with space!'} defaultValue={this.props.record.relevantIngredient} onChange={(e) => {
                            this.state.data.relevantIngredient = e.target.value;
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        >
                        <Input placeholder={'Price'} defaultValue={this.props.record.price} onChange={(e) => {
                            this.state.data.price = e.target.value;
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
