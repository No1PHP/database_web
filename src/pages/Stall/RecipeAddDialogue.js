import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class RecipeAddDialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                stallName:'',
                recipes:''
            }
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <Button onClick={this.showModal} block>
                    Add Recipes of Stall
                </Button>
                <Modal
                    visible={visible}
                    title="Enter the recipes you want to add"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={()=>this.props.parent.handleDataFromRecipeAddDialogue(this.state.data)}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form>
                        <Form.Item
                            name="stallName"
                        >
                            <Input placeholder={'StallName'} onChange={(e) => {
                                this.state.data.stallName = e.target.value;
                            }}/>
                        </Form.Item>

                        <Form.Item
                            name="recipes"
                        >
                            <Input placeholder={'Recipes(Please separate with space)'} onChange={(e) => {
                                this.state.data.recipes = e.target.value;
                            }}
                            />
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        );
    }
}


export default RecipeAddDialogue;
