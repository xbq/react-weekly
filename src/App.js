import React, { Component } from 'react';
import ProtectRoute from "./components/ProtectRoute";
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Navi from './components/Navi/Navi'
import Register from "./components/Users/Register";
import LoginForm from './components/LoginForm'
import UserEdit from './components/Users/UserEdit'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login"  component={LoginForm}/>
                    <ProtectRoute path="/manage"  component={Navi}/>
                    <Route path="/register" component={Register}/>
                    <Redirect exact path="/" to="/login"/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
