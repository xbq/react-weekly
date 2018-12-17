import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom'
import Navi from './components/Navi/Navi'
import Register from "./components/Users/Register";
import ProtectRoute from './components/ProtectRoute'
import LoginForm from './components/LoginForm'

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

ReactDOM.render((
    <HashRouter>
        <div>
            <Route exact path="/"  component={LoginForm}/>
            <ProtectRoute path="/manage"  fakeAuth={fakeAuth} component={Navi}/>
            <Route path="/register" component={Register}/>
        </div>
    </HashRouter>
), document.getElementById('root'));


