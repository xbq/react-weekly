import React, { Component } from 'react';
import ProtectRoute from "./components/ProtectRoute";
import {BrowserRouter,Route} from 'react-router-dom'
import Navi from './components/Navi/Navi'
import Register from "./components/Users/Register";
import LoginForm from './components/LoginForm'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/login"  component={LoginForm}/>
                    <ProtectRoute path="/manage"  component={Navi}/>
                    <Route path="/register" component={Register}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
