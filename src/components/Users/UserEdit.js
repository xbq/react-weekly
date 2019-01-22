import React from 'react';
import {
    Form, Input, Select, Button, AutoComplete,
} from 'antd';
import {getRequest, globalVar, postRequest} from '../util/util'

const {serverUrl} = globalVar;
const FormItem = Form.Item;
const Option = Select.Option;

class UserEdit extends React.Component {
    state = {
        roles: [],
        user: {}
    };

    componentWillMount() {
        const {id} = this.props.match.params;

        getRequest(serverUrl + '/user/findById', {id}).then((res) => {
            console.log(res);
            this.setState({
                user: res.data.user
            })
        })

        getRequest(serverUrl + '')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                postRequest(serverUrl+'/user/update',{...values,id:this.state.user.id}).then((res)=>{
                    console.log(res);
                })
            }
        });


    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        console.log(this.state.user);
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                >
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: '请填写您的姓名!',
                        }],
                        initialValue: this.state.user.username
                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="手机号"
                >
                    {getFieldDecorator('tel', {
                        rules: [{required: true, message: '请填写您的手机号!'}],
                        initialValue: this.state.user.tel
                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="部门"
                >
                    {getFieldDecorator('department', {
                        rules: [{required: true, message: '请选择部门!'}],
                        initialValue: this.state.user.department

                    })(
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="请选择部门"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="数据运营事业部">数据运营事业部</Option>
                            <Option value="工程部">工程部</Option>
                            <Option value="仪器事业部">仪器事业部</Option>
                            <Option value="市场部">市场部</Option>
                            <Option value="行政部">行政部</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="角色"
                >
                    {getFieldDecorator('role', {
                        rules: [{required: true, message: '请选择角色!'}],
                        initialValue: this.state.user.role
                    })(
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="请选择角色"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="1">管理员</Option>
                            <Option value="3">总经理</Option>
                            <Option value="4">副总经理</Option>
                            <Option value="5">部门总监</Option>
                            <Option value="6">部门副总监</Option>
                            <Option value="7">产品经理</Option>
                            <Option value="8">研发工程师</Option>
                            <Option value="9">项目实施</Option>
                            <Option value="10">技术支持</Option>
                            <Option value="11">美工</Option>
                            <Option value="12">项目经理</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedUserEdit = Form.create()(UserEdit);

export default WrappedUserEdit;
