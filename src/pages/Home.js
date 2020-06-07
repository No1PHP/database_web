import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {
    HeaderWrapper,
    Logo, MenuWrapper,
    Nav,
    NavItem, UsernameWrapper,
} from './style';
import {Button, Select, Menu, Dropdown} from "antd";
import { DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { HeartTwoTone,UserOutlined, AuditOutlined } from '@ant-design/icons';


class Home extends Component {


    render() {

        return (
            localStorage.getItem("loginNow")==="login" ?

                    <div>
                        <div><HeartTwoTone twoToneColor="#eb2f96" /><h1>Welcome to our Canteen Management System!</h1></div>
                        <div><h2>To begin with, select the data item in header</h2></div>
                    </div>
                :
                <Redirect to='/Login'>
                    <NavItem className='right'>login</NavItem>
                </Redirect>

        );
    }

}


export default withRouter(Home);
