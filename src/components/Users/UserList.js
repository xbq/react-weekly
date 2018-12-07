import React from 'react'

import { Table } from 'antd';


import {getRequest} from '../../util'
const columns = [{
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
}];

class UserList extends React.Component {
    state = {
        data: [],
        pagination: {showSizeChanger:true, onShowSizeChange:this.onShowSizeChange},
        loading: false,
    };

    onShowSizeChange=()=>{

    }

    componentDidMount() {
        this.fetch();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            limit: pagination.pageSize,
            page: pagination.current,
            ...filters,
        });
    }

    fetch = (params = {}) => {

        this.setState({ loading: true });
        getRequest('http://localhost:8003/user/list',params).then((data) => {
            const pagination = { ...this.state.pagination };
            pagination.total = data.count;
            this.setState({
                loading: false,
                data: data.data.data,
                pagination,
            });
        });
    }

    render() {
        return (
            <Table
                columns={columns}
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
