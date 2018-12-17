import React, { Component } from 'react';
import {Layout} from 'antd'
import LoginForm from './components/LoginForm'

class App extends Component {

    render() {
        return (

            <div>
                <Layout>
                    <LoginForm></LoginForm>
                </Layout>
            </div>

        );
    }
}

export default App;
