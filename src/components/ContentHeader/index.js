import React from  'react'
import { Menu, Icon,Layout } from 'antd';
import LOGO from '../../assets/images/logo.png'
import './ContentHeader.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header} = Layout;
class ContentHeader extends React.Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <div className="container">
                <img src={LOGO} alt="浙江中海达空间信息技术有限公司" className="logoImg"/>
                <Header className="header">
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                </Header>

                <Menu
                    className="menu"
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="mail">
                        <Icon type="mail" />Navigation One
                    </Menu.Item>
                    <Menu.Item key="app" disabled>
                        <Icon type="appstore" />Navigation Two
                    </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
                        <MenuItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                    </Menu.Item>
                </Menu>

            </div>

        );
    }
}

export default ContentHeader
