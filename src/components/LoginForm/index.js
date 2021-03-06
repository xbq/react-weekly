import React from "react"
import {BrowserRouter,Redirect} from 'react-router-dom'
import PropTypes from "proptypes"
import '../../util'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {postRequest} from "../../util";
import loginLogo from '../../assets/images/loginLogo.png'
import './LoginForm.less'
import {globalVar} from '../../util'


let {fakeAuth} = globalVar;

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false
        }
    }

    handleSubmit = (e) => {
        debugger
        e.preventDefault();
        let data = this.props.form.getFieldsValue()
        postRequest('http://localhost:8003/login',data).then((res)=>{
            if(res.data.code==0){
                fakeAuth.authenticate(() => {
                    this.setState({ redirectToReferrer: true });
                });
                this.props.history.push('/manage/');
            }else{
                message.error(res.data.message);
            }
        })
    }

    handleRegister(){
        this.props.history.push('/register/');
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {redirectToReferrer} = this.state;
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        if (redirectToReferrer) return <Redirect to={from} />;
        return (
            <div className="main">
                <div className="header">
                    <img src={loginLogo} alt=""/>
                </div>
                <div className="content">
                    <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
                        <FormItem>
                            {
                                getFieldDecorator(
                                    'username', {
                                        rules: [{required: true, message: '姓名不能为空！'}],
                                    }
                                )(
                                    <Input size="large" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator(
                                    "password", {
                                        rules: [{required: true, message: "密码不能为空！"}]
                                    }
                                )(
                                    <Input size="large" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password" placeholder="密码"/>
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
        );
    }
}

NormalLoginForm.contextTypes = {
    router: PropTypes.object.isRequired
};
let WrapForm = Form.create()(NormalLoginForm)
export default WrapForm
