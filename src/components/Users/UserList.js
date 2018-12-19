import React from 'react'
import {Table, Modal} from 'antd';
import {postRequest, getRequest, globalVar} from '../../util'

const serverUrl = globalVar.serverUrl;
const listUrl = serverUrl + '/user/list';
const deleteUserUrl = serverUrl + '/user/delete'
const initPswUrl = serverUrl+'/user/initPsw'
const {confirm} = Modal;

class UserList extends React.Component {
    state = {
        data: [],
        pagination: {
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange.bind(this),
            pageSizeOptions: ['2', '5', '10', '20']
        },
        loading: false,
        pageSize: 10
    };

    //pagination的onShowSizeChange和onChange都会修改自身的状态，这样就会自动触发页面重新渲染,如果没有特殊需求，这两个函数没有必要去实现的
    onShowSizeChange(current, size) {
        this.setState({pageSize: size})
    }

    componentDidMount() {
        this.fetch(listUrl, {}, 'GET');
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });

        this.fetch(listUrl, {
            limit: pagination.pageSize,
            page: pagination.current,
            ...filters,
        }, 'GET');
    }

    editUser(user) {
        console.log(user);
    }

    deletUser(user) {
        debugger
        const _me = this;
        const confirmInstance = confirm({
            title: '警告',
            content: '确认要删除该用户？',
            okType: 'danger',
            onOk() {
                return new Promise((resolve, reject) => {
                    getRequest(deleteUserUrl, {id: user.id}).then((res) => {
                        debugger
                        if (res.data.code === 0) {
                            //1、关闭confirm
                            confirmInstance.destroy();
                            //2、弹出删除成功提示
                            const successInstance = Modal.success({
                                title: '提示',
                                content: '删除成功！',
                                onOk() {
                                    //3、关闭提示官话框
                                    successInstance.destroy();
                                    //4、刷新table
                                    _me.fetch(listUrl, {
                                        limit: _me.state.pageSize,
                                        page: _me.state.pagination.current
                                    }, "GET")
                                }
                            });
                        }
                    });
                }).catch(() => console.log('操作失败!'));
            },
            onCancel() {
            },
        });
        console.log(user);
    }

    initPsw(user){
        getRequest(initPswUrl,{id:user.id}).then((res)=>{
            if(res.data.code===0){
                Modal.success({
                    title: '提示',
                    content: res.data.message
                });
            }
        })
    }

    //为了修改state的值，从而达到重新渲染页面的效果
    fetch = (url, params = {}, type) => {
        if (type === 'GET') {
            getRequest(url, params).then((res) => {
                const pagination = {...this.state.pagination};
                pagination.total = res.data.count;
                let state = {
                    loading: false,
                    data: res.data.data,
                    pagination,
                };
                this.setState(state);
            });
        } else {
            postRequest(url, params).then((res) => {
                const pagination = {...this.state.pagination};
                pagination.total = res.data.count;
                let state = {
                    loading: false,
                    data: res.data.data,
                    pagination,
                };
                this.setState(state);
            })
        }

    }

    columns = [{
        title: '姓名',
        dataIndex: 'username',
        sorter: true,
        width: '20%',
    }, {
        title: '部门',
        dataIndex: 'department',
        width: '20%',
    }, {
        title: '联系电话',
        dataIndex: 'tel',
    }, {
        titile: '操作',
        key: 'operation',
        render: (row) => (
            <span>
                <a className="edit-data" onClick={this.initPsw.bind(this, row)}>初始化密码</a>
            　　 <a className="edit-data" onClick={this.editUser.bind(this, row)}>编辑</a>
            　　 <a className="delete-data" onClick={this.deletUser.bind(this, row)}>删除</a>
            </span>
        )
    }];

    render() {
        return (
            <Table
                columns={this.columns}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}

export default UserList;
