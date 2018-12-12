import React from "react"
import {BrowserRouter,Route,withRouter,NavLink,Switch} from 'react-router-dom'
import PropTypes from "proptypes"
import '../../util'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import {postRequest} from "../../util";
import loginLogo from '../../assets/images/loginLogo.png'
import './LoginForm.less'
import { createHashHistory } from 'history';
import EditUser from "../Users/EditUser";

let history = createHashHistory();

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    constructor(){
        super();
    }
    handleSubmit(e){
        e.preventDefault();
        let data = this.props.form.getFieldsValue()
        postRequest('http://localhost:8003/login',data).then(function(res){
            console.log(res);
            if(res.data.code==0){
                history.push('/manage');
            }else{
                message.error(res.data.message);
            }
        })
    }

    handleRegister(){
        history.push('/userEdit');
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <BrowserRouter>
                <div className="main">
                    <div className="header">
                        <img src={loginLogo} alt=""/>
                    </div>
                    <div className="content">
                        <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form">
                            <FormItem>
                                {
                                    getFieldDecorator(
                                        'username',{
                                            rules:[{required: true, message:'姓名不能为空！'}],
                                        }
                                    )(
                                        <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                    )
                                }


                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator(
                                        "password",{
                                            rules:[{required: true, message:"密码不能为空！"}]
                                        }
                                    )(
                                        <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                    )
                                }


                            </FormItem>
                            <FormItem>

                                <Checkbox>记住密码</Checkbox>

                                <span className="login-form-forgot register-span">忘记密码</span>
                                <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                                <span className='register-span' onClick={this.handleRegister}>注册用户</span>
                            </FormItem>
                        </Form>
                    </div>

                    <div className="foot">
                        <p>浙江中海达公司版权所有&copy;2018</p>
                        <p>技术支持：浙江中海达数据运营事业部xbq</p>
                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

NormalLoginForm.contextTypes = {
    router: PropTypes.object.isRequired
};
let WrapForm = Form.create()(NormalLoginForm)
export default WrapForm
