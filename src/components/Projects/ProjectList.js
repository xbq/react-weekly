import React from 'react'
import { Table } from 'antd';
import {getRequest} from '../util/util'


const columns = [{
    title: '名称',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
}, {
    title: '状态',
    dataIndex: 'state',
    width: '20%',
}, {
    title: '描述',
    dataIndex: 'description',
}];

class ProjectList extends React.Component {
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
        getRequest('http://localhost:8003/project/all',params).then((data) => {
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
        console.log(this.state);
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

export default ProjectList;
