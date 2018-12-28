import React from 'react'
import {Layout, Menu, Icon} from 'antd';
import {NavLink, Switch,Route} from 'react-router-dom'
import './Navi.less'
import Users from '../Users/UserList'
import ProjectList from '../Projects/ProjectList'
import ContentHeader from '../ContentHeader'
import ProtectRoute from '../ProtectRoute'

const {Header, Content, Footer, Sider} = Layout;

class Navi extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >

                    <div className="logo">

                    </div>


                    <Menu theme="dark" defaultSelectedKeys={['/projects']} mode="inline">
                        <Menu.Item key="/projects">
                            <NavLink to="/projects">
                                <Icon type="user"/>
                                <span>项目管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/weekly">
                            <NavLink to="/weekly">
                                <Icon type="file-search"/>
                                <span>周报管理</span>
                            </NavLink>

                        </Menu.Item>
                        <Menu.Item key="/approve">
                            <NavLink to="/approve">
                                <Icon type="file-done"/>
                                <span>周报审批</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/users">
                            <NavLink to="/users">
                                <Icon type="user"/>
                                <span>用户管理</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <ContentHeader></ContentHeader>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            <Switch>
                                <Route path="/projects" component={ProjectList}/>
                                <ProtectRoute path="/weekly" component={Users}/>
                                <ProtectRoute path="/approve" component={Users}/>
                                <Route path="/users" component={Users}/>
                            </Switch>

                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        中海达项目管理系统 ©2018 Created by xbq
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Navi;
