import {Modal, Button, Form, Input, Drawer} from 'antd';
import React from "react";

class FailingDialogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
                <Modal
                    visible={visible}
                    title="Login Failed, Please try again"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    size = {"small"}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            cancel
                        </Button>,
                        <Button key="OK" type="primary" loading={loading} href={'/Login'}>
                            OK
                        </Button>,
                    ]}
                >

                </Modal>
            </div>
        );
    }
}


export default FailingDialogue;
