import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class RecipeDeleteDialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            data : {
                stallName:'',
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
        this.props.handleDataFromRecipeDeleteDialogue(dataList);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <Button onClick={this.showModal} block>
                    Delete Recipes of Stall
                </Button>
                <Modal
                    visible={visible}
                    title="Enter the recipes you want to delete and the corresponding stall"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={()=>this.props.parent.handleDataFromRecipeDeleteDialogue(this.state.data)}>
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
                        name="recipes"
                    >
                        <Input placeholder={'Recipes(Please separate with commas)'} onChange={(e) => {
                            this.setState({
                                data :{
                                    recipes: e.target.value
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


export default RecipeDeleteDialogue;
