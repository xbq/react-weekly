import React from  'react'
import { Menu, Icon } from 'antd';
import LOGO from '../../assets/images/logo.png'
import './ContentHeader.less'

const SubMenu = Menu.SubMenu;
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
                <img src={LOGO} alt="浙江中海达空间信息技术有限公司" className="logoImg"/>
                <Menu
                    className="menu"
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="index">
                        <Icon type="appstore" />首页
                    </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />当前用户</span>}>
                        <Menu.Item key="setting:1">个人信息</Menu.Item>
                        <Menu.Item key="setting:2">安全设置</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="loadout">
                        <Icon type="appstore" />退出
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default ContentHeader
