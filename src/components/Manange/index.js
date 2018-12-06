import React from "react";
import {Layout, Menu, Icon} from 'antd';
import './Manage.less';
import ContentHeader from '../ContentHeader'
const {Header,Sider, Content} = Layout;

class ManagePage extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <ContentHeader></ContentHeader>
                </div>
                <div>
                    <Layout className="contentLayout" style={{display:'block'}}>
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={this.state.collapsed}
                        >
                            <div className="logo"/>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1">
                                    <Icon type="project"/>
                                    <span>项目管理</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="file-search"/>
                                    <span>周报管理</span>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Icon type="file-done"/>
                                    <span>周报审批</span>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Icon type="user"/>
                                    <span>人员管理</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content style={{
                                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                            }}
                            >
                                内容部分
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </div>
        );
    }
}


export default ManagePage
