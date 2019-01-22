import React from 'react'
import {withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import LOGO from '../../assets/images/logo.png'
import './ContentHeader.less'
import {getRequest,globalVar} from "../../util";
import { createHashHistory } from 'history';

let history = createHashHistory();
const {serverUrl} = globalVar;
const loginoutUrl = serverUrl+'/logout'

const SubMenu = Menu.SubMenu;
const AuthButton = withRouter(
    ({history}) =>
        (
            <span
                onClick={() => {
                    logout();
                    history.push("/login")
                }}
            >
                退出
            </span>
        )
);

class ContentHeader extends React.Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }


    render() {
        return (
            <div className="container" style={{paddingRight:'40px'}}>
                <Menu
                    className="menu"
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="index">
                        <Icon type="appstore"/>首页
                    </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user"/>当前用户</span>}>
                        <Menu.Item key="setting:1">个人信息</Menu.Item>
                        <Menu.Item key="setting:2">安全设置</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="loadout" onClick={this.handlelogout}>
                        <Icon type="appstore" />退出
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default ContentHeader
