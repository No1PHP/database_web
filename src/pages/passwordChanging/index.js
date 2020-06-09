import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../login/store';
import { Form, Checkbox, Input, Button} from "antd";
import 'antd/dist/antd.css';
import axios from "axios";
import { ChangingPageWrapper } from './style'
import {login} from "../login/store/actionCreators";

class passwordChanging extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            account:'',
            password:'',
            newPassword:'',
            newPasswordAgain:''
        }
    }

    changePassword = () =>{
        const data={
            account:this.state.account,
            currentPassword:this.state.password,
            newPassword:this.state.newPassword
        }
        if (this.state.newPassword === this.state.newPasswordAgain) {
            axios.post('http://localhost:8080/account/passwordChanging?passwordChangeString='+JSON.stringify(data)).then((res)=>{
                    alert(res.data.message);
                }
            ).catch(e=>{
                console.log(e.message)
            })
        }
        else{
            alert("twice new Password doesn't match!");
        }

    }


    render() {
        const {loginStatus} = this.props;
        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        if (!loginStatus) {
            const layout = {
                labelCol: {
                    span: 4,
                },
                wrapperCol: {
                    span: 8,
                },
                width: {
                    span: 400,
                }
            };
            const tailLayout = {
                wrapperCol: {
                    offset: 5,
                    span: 10,
                },
            };
            return (
                <ChangingPageWrapper>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please type username!',
                                },
                            ]}>
                            <Input type='account' onChange={(e) => {
                                this.state.account = e.target.value;
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label="password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'please type the old password!',
                                },
                            ]}>
                            <Input type='password' onChange={(e) => {
                                this.state.password = e.target.value;
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label="newPassword"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please type the new password!',
                                },
                            ]}>
                            <Input type='newPassword' onChange={(e) => {
                                this.state.newPassword = e.target.value;
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label="newPassAgain"
                            name="newPassAgain"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please type the new password again!',
                                },
                            ]}>
                            <Input type='newPasswordAgain' onChange={(e) => {
                                this.state.newPasswordAgain = e.target.value;
                            }}/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>

                            <Button type="primary"
                                    htmlType="submit"
                                    onClick={() => {
                                        this.changePassword()}
                                    }
                            >
                                Change password
                            </Button>

                        </Form.Item>

                    </Form>
                </ ChangingPageWrapper>

            );
        } else {
            return <Redirect to='/'/>
        }
    }
}

//也可前面handleSubmit中不登录鉴权，直接用mapState获取login/store/reducer中的登录状态，以此判断是否可修改密码


// 调用login/store/actionCreator中的passwordChanging操作
// const mapDispatch = (dispatch) => {
//     return {
//         passwordChanging: (account, oldPassword, newPassword, newPasswordAgain) => {
//         dispatch(actionCreators.passwordChanging(account, oldPassword, newPassword, newPasswordAgain))
//     }
//     }
// }


export default (passwordChanging);
