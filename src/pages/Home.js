import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import './homeStyle'
import {Button, Select, Menu, Dropdown} from "antd";
import { DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { HeartTwoTone,UserOutlined, AuditOutlined } from '@ant-design/icons';
import {Background} from "./homeStyle";

class Home extends Component {


    render() {
        return (
            localStorage.getItem("loginNow")==="login" ?
                <div>
                <h1 className="text-center">
                    Welcome to our Canteen Management System!
                </h1>
                <h1 className="text-center">
                To begin with, select on data item on header
                </h1>
                </div>

                :
                <Redirect to='/Login'>
                </Redirect>

        );
    }

}


export default withRouter(Home);
