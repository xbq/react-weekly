import React from 'react'
import {Layout, Menu, Icon} from 'antd';
import {BrowserRouter,Route,withRouter,NavLink,Switch} from 'react-router-dom'
import './Navi.less'
import Users from '../Users/UserList'
import ProjectList from '../Projects/ProjectList'
import ContentHeader from '../ContentHeader'

const {Header, Content, Footer, Sider} = Layout;

class Navi extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        const {location} = this.props;
        console.log(location);
        return (
            <BrowserRouter>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >

                            <div className="logo" >

                            </div>


                        <Menu theme="dark" defaultSelectedKeys={['/projects']} mode="inline">
                            <Menu.Item key="/projects">
                                <NavLink to="/projects">
                                    <Icon type="user" />
                                    <span>项目管理</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/weekly">
                                <NavLink to="/weekly">
                                    <Icon type="file-search" />
                                    <span>周报管理</span>
                                </NavLink>

                            </Menu.Item>
                            <Menu.Item key="/approve">
                                <NavLink to="/approve">
                                    <Icon type="file-done" />
                                    <span>周报审批</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/users">
                                <NavLink to="/users">
                                    <Icon type="user" />
                                    <span>用户管理</span>
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <ContentHeader></ContentHeader>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <Switch>
                                    <Route path="/projects" component={ProjectList}></Route>
                                    <Route path="/weekly" component={Users}></Route>
                                    <Route path="/approve" component={Users}></Route>
                                    <Route path="/users" component={Users}></Route>
                                </Switch>

                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>

        );
    }
}

export default withRouter(Navi);
