import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../login/store';
import { Form, Checkbox, Input, Button} from "antd";
import 'antd/dist/antd.css';
import { ChangingPageWrapper } from './style'
import {login} from "../login/store/actionCreators";

class passwordChanging extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }


    // handleSubmit(account, password, newPassword, newPasswordAgain) {
    //     //先用账户名和密码登录校验，是否存在或正确
    //
    //     login(account,password).then(
    //         // res => {
    //         //     if(res.status === 200){
    //         //         if (this.newPassword === this.newPasswordAgain) {
    //         //             this.props.passwordChanging(this.password, this.newPassword, this.newPasswordAgain);
    //         //         }else{
    //         //             alert('新密码前后输入不一致!')
    //         //         }
    //         //     } else{
    //         //         alert('用户名密码不正确!')
    //         //     }
    //         // }
    //         res=>{
    //             console.log(res)
    //         }
    //     )
    //
    //     // let res = this.props.login(this.account, this.password);
    //     // login(this.account, this.password)
    //     // if (res) {
    //     //     if (this.newPassword === this.newPasswordAgain) {
    //     //         this.props.passwordChanging(this.password, this.newPassword, this.newPasswordAgain);
    //     //         //修改成功，下可加跳转等操作
    //     //         //
    //     //     } else {
    //     //         alert('新密码前后输入不一致!')
    //     //     }
    //     // } else {
    //     //     alert('用户名密码不正确!')
    //     // }
    //
    //
    // }

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
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}>
                            <Input innerRef={(input) => {
                                this.account = input
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入原密码!',
                                },
                            ]}>
                            <Input type='password' innerRef={(input) => {
                                this.password = input
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label="新密码"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新密码!',
                                },
                            ]}>
                            <Input type='password' innerRef={(input) => {
                                this.newPassword = input
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label="再次输入新密码"
                            name="newPasswordAgain"
                            rules={[
                                {
                                    required: true,
                                    message: '请再次输入新密码!',
                                },
                            ]}>
                            <Input type='password' innerRef={(input) => {
                                this.newPasswordAgain = input
                            }}/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>

                            <Button type="primary"
                                    htmlType="submit"
                                    onClick={() => this.props.passwordChanging(this.account,this.password,this.newPassword,this.newPasswordAgain)}
                            >
                                修改密码
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
const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login'])
})

// 调用login/store/actionCreator中的passwordChanging操作
// const mapDispatch = (dispatch) => {
//     return {
//         passwordChanging: (account, oldPassword, newPassword, newPasswordAgain) => {
//         dispatch(actionCreators.passwordChanging(account, oldPassword, newPassword, newPasswordAgain))
//     }
//     }
// }

const mapDispatch = (dispatch) => ({
    passwordChanging(account, oldPassword, newPassword, newPasswordAgain){
        dispatch(actionCreators.login(account, oldPassword, newPassword, newPasswordAgain))
    }
})


export default connect(mapState, mapDispatch)(passwordChanging);
