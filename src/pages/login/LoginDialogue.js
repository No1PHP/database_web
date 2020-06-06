import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class LoginDialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            visible: true,
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
                <a onClick={this.showModal}>
                    login
                </a>
                <Modal
                    visible={visible}
                    title="Welcome to OVERCOOKED Canteen Management System"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    size = {"small"}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="OK" type="primary" loading={loading} href={'/Material'}>
                            OK
                        </Button>,
                    ]}
                >

                </Modal>
            </div>
        );
    }
}


export default LoginDialogue;
